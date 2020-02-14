import {
  LedgerOptions,
  WalletModule,
  Helpers,
  CommonWalletOptions
} from '../../../interfaces'
import ledgerIcon from '../wallet-icons/icon-ledger'

function ledger(options: LedgerOptions & CommonWalletOptions): WalletModule {
  const { rpcUrl, networkId, preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Ledger',
    svg: svg || ledgerIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      const { BigNumber, networkName } = helpers

      const provider = await ledgerProvider({
        rpcUrl,
        networkId,
        BigNumber,
        networkName
      })

      return {
        provider,
        interface: {
          name: 'Ledger',
          connect: provider.enable,
          disconnect: () => provider.stop(),
          address: {
            onChange: async func => {
              const address = await provider.getPrimaryAddress()
              func(address)
              provider.on('accountsChanged', (accounts: Array<string>) =>
                func(accounts[0])
              )
            }
          },
          network: {
            onChange: func => {
              func(networkId)
            }
          },
          balance: {
            get: async () => {
              const address = await provider.getPrimaryAddress()
              return provider.getBalance(address)
            }
          }
        }
      }
    },
    type: 'hardware',
    desktop: true,
    preferred
  }
}

async function ledgerProvider(options: {
  networkId: number
  rpcUrl: string
  BigNumber: any
  networkName: (id: number) => string
}) {
  const Web3ProviderEngine = (await import('web3-provider-engine')).default
  const RpcSource = (await import('web3-provider-engine/subproviders/rpc'))
    .default

  const HookedWalletSubprovider = (
    await import('web3-provider-engine/subproviders/hooked-wallet')
  ).default

  const TransportU2F = (await import('@ledgerhq/hw-transport-u2f')).default
  const Eth = (await import('@ledgerhq/hw-app-eth')).default

  const EthereumTx = (await import('ethereumjs-tx')).Transaction

  const { networkId, rpcUrl, BigNumber, networkName } = options
  const basePath = networkIdToDerivationPath(networkId)

  let addressToPath = new Map()
  let listeners = new Map()

  let enabled: boolean = false

  const ledgerSubProvider = new HookedWalletSubprovider({
    getAccounts: (callback: any) => {
      getAccounts()
        .then((res: Array<any> | undefined) => callback(null, res))
        .catch((err: string) => callback(err, null))
    },
    signTransaction: (transactionData: any, callback: any) => {
      signTransaction(transactionData)
        .then((res: string) => callback(null, res))
        .catch(err => callback(err, null))
    }
  })

  const rpcSubProvider = new RpcSource({
    rpcUrl: rpcUrl.includes('http') ? rpcUrl : `https://${rpcUrl}`
  })
  const provider = new Web3ProviderEngine()

  provider.on('error', (err: any) => {})

  provider.getPrimaryAddress = getPrimaryAddress
  provider.getAllAccountsAndBalances = getAllAccountsAndBalances
  provider.enable = enable
  provider.on = on
  provider.setPrimaryAccount = setPrimaryAccount
  provider.getBalance = getBalance

  provider.addProvider(ledgerSubProvider)
  provider.addProvider(rpcSubProvider)
  provider.start()

  function enable() {
    enabled = true
    return getAccounts(1)
  }

  function on(
    event: 'accountsChanged',
    callback: (accounts: Array<string>) => void
  ) {
    listeners.set(event, callback)
  }

  function addresses() {
    return Array.from(addressToPath.keys())
  }

  function getPrimaryAddress() {
    return addresses()[0]
  }

  async function getAllAccountsAndBalances(amountToGet: number = 5) {
    const accounts = await getAccounts(amountToGet, true)
    return Promise.all(
      accounts.map(
        (address: string) =>
          new Promise(async resolve => {
            const balance = await getBalance(address)
            resolve({ address, balance })
          })
      )
    )
  }

  function setPrimaryAccount(address: string) {
    // make a copy and put in an array
    const accounts = [...addressToPath.entries()]
    const accountIndex = accounts.findIndex(
      ([accountAddress]) => accountAddress === address
    )
    // pull the item at the account index out of the array and place at the front
    accounts.unshift(accounts.splice(accountIndex, 1)[0])
    // reassign addressToPath to new ordered accounts
    addressToPath = new Map(accounts)

    // let listeners know of change
    const listener = listeners.get('accountsChanged')
    listener && listener(addresses())
  }

  function getAccounts(
    numberToGet: number = 1,
    getMore?: boolean
  ): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      if (!enabled) {
        resolve([null])
      }

      const addressesAlreadyFetched = addressToPath.size

      if (addressesAlreadyFetched > 0 && !getMore) {
        return addresses()
      }

      const paths = []

      if (numberToGet > 1) {
        for (
          let i = addressesAlreadyFetched;
          i < numberToGet + addressesAlreadyFetched;
          i++
        ) {
          const ledgerLive = `${basePath}/${i}'/0/0`
          const legacy = `${basePath}/0'/${i}'`

          paths.push(ledgerLive, legacy)
        }
      } else {
        paths.push(`${basePath}/0'/0`, `${basePath}/0'/0/0`)
      }

      let transport
      let eth

      try {
        transport = await TransportU2F.create()
        eth = new Eth(transport)
      } catch (error) {
        reject({ message: 'Error connecting to Ledger wallet' })
      }

      for (const path of paths) {
        try {
          const { address } = await eth.getAddress(path)
          addressToPath.set(address.toLowerCase(), path)
        } catch (err) {
          return reject({
            message: 'There was a problem trying to connect to your Ledger.'
          })
        }
      }

      const allAddresses = addresses()

      const listener = listeners.get('accountsChanged')
      listener && listener(allAddresses)

      transport.close()

      resolve(allAddresses)
    })
  }

  function getBalance(address: string) {
    return new Promise((resolve, reject) => {
      provider.sendAsync(
        {
          method: 'eth_getBalance',
          params: [address, 'latest'],
          id: 42
        },
        (e: any, res: any) => {
          e && reject(e)
          const result = res && res.result

          if (result != null) {
            resolve(new BigNumber(result).toString(10))
          } else {
            resolve(null)
          }
        }
      )
    })
  }

  async function signTransaction(transactionData: any) {
    const path = [...addressToPath.values()][0]
    let transport
    let eth

    try {
      transport = await TransportU2F.create()
      eth = new Eth(transport)
    } catch (error) {
      throw new Error('Error connecting to Ledger wallet')
    }

    try {
      const transaction = new EthereumTx(transactionData, {
        chain: networkName(networkId)
      })

      transaction.raw[6] = Buffer.from([networkId]) // v
      transaction.raw[7] = Buffer.from([]) // r
      transaction.raw[8] = Buffer.from([]) // s

      const ledgerResult = await eth.signTransaction(
        path,
        transaction.serialize().toString('hex')
      )

      transaction.v = Buffer.from(ledgerResult.v, 'hex')
      transaction.r = Buffer.from(ledgerResult.r, 'hex')
      transaction.s = Buffer.from(ledgerResult.s, 'hex')

      return `0x${transaction.serialize().toString('hex')}`
    } catch (error) {
      throw new Error('Error signing transaction')
    } finally {
      transport.close()
    }
  }

  return provider
}

function networkIdToDerivationPath(networkId: number) {
  switch (networkId) {
    default:
      return `m/44'/60'`
  }
}

export default ledger
