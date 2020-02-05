import {
  TrezorOptions,
  WalletModule,
  Helpers,
  CommonWalletOptions
} from '../../../interfaces'
import trezorIcon from '../wallet-icons/icon-trezor'

function trezor(options: TrezorOptions & CommonWalletOptions): WalletModule {
  const {
    rpcUrl,
    networkId,
    email,
    appUrl,
    preferred,
    label,
    iconSrc,
    svg
  } = options

  return {
    name: label || 'Trezor',
    svg: svg || trezorIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      const { BigNumber, networkName } = helpers

      const provider = await trezorProvider({
        rpcUrl,
        networkId,
        email,
        appUrl,
        BigNumber,
        networkName
      })

      return {
        provider,
        interface: {
          name: 'Trezor',
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

async function trezorProvider(options: {
  networkId: number
  email: string
  appUrl: string
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

  const TrezorConnectLibrary = await import('trezor-connect')
  const { default: TrezorConnect, DEVICE_EVENT, DEVICE } = TrezorConnectLibrary
  const EthereumTx = (await import('ethereumjs-tx')).Transaction

  const { networkId, email, appUrl, rpcUrl, BigNumber, networkName } = options
  const basePath = networkIdToDerivationPath(networkId)

  let addressToPath = new Map()
  let listeners = new Map()

  let enabled: boolean = false

  TrezorConnect.manifest({
    email,
    appUrl
  })

  TrezorConnect.on(DEVICE_EVENT, (event: any) => {
    if (event.type === DEVICE.DISCONNECT) {
      const listener = listeners.get('accountsChanged')
      listener && listener([undefined])
    }
  })

  const trezorSubProvider = new HookedWalletSubprovider({
    getAccounts: (callback: any) => {
      getAccounts()
        .then((res: Array<string>) => callback(null, res))
        .catch(err => callback(err, null))
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

  provider.addProvider(trezorSubProvider)
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

  async function getAllAccountsAndBalances(amountToGet: number = 10) {
    const accounts = await getAccounts(amountToGet, true)
    return Promise.all(
      accounts.map(
        address =>
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

  async function getAccounts(accountsToGet: number = 10, getMore?: boolean) {
    if (!enabled) {
      return [undefined]
    }

    const addressesAlreadyFetched = addressToPath.size
    const bundle = []

    if (addressesAlreadyFetched > 0 && !getMore) {
      return addresses()
    }

    for (
      let i = addressesAlreadyFetched;
      i < accountsToGet + addressesAlreadyFetched;
      i++
    ) {
      const path = `${basePath}/${i}'/0/0`
      bundle.push({ path, showOnTrezor: false })
    }

    let data

    try {
      data = await TrezorConnect.ethereumGetAddress({
        bundle
      })
    } catch (error) {
      enabled = false
      throw new Error(data.payload.error)
    }

    if (!data.success) {
      enabled = false
      throw new Error(data.payload.error)
    }

    if (Array.isArray(data.payload)) {
      data.payload.forEach(
        (addressData: { serializedPath: string; address: string }) => {
          const { address, serializedPath } = addressData
          addressToPath.set(address.toLowerCase(), serializedPath)
        }
      )
    } else {
      const { address, serializedPath } = data.payload
      addressToPath.set(address.toLowerCase(), serializedPath)
    }

    const allAddresses = addresses()

    const listener = listeners.get('accountsChanged')
    listener && listener(allAddresses)

    return allAddresses
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
          resolve(res && res.result && new BigNumber(res.result).toString(10))
        }
      )
    })
  }

  function trezorSignTransaction(path: string, transactionData: any) {
    const { nonce, gasPrice, gas, to, value, data } = transactionData

    return TrezorConnect.ethereumSignTransaction({
      path: path,
      transaction: {
        nonce,
        gasPrice,
        gasLimit: gas,
        to,
        value: value || '',
        data: data || '',
        chainId: networkId
      }
    })
  }

  async function signTransaction(transactionData: any) {
    const path = [...addressToPath.values()][0]

    try {
      const transaction = new EthereumTx(transactionData, {
        chain: networkName(networkId)
      })
      const trezorResult = await trezorSignTransaction(path, transactionData)

      if (!trezorResult.success) {
        console.log('error', trezorResult.payload.error)
        throw new Error(trezorResult.payload.error)
      }

      const signature = trezorResult.payload
      transaction.v = signature.v
      transaction.r = signature.r
      transaction.s = signature.s

      return `0x${transaction.serialize().toString('hex')}`
    } catch (error) {
      console.log({ error })
      throw new Error(error)
    }
  }

  return provider
}

function networkIdToDerivationPath(networkId: number) {
  switch (networkId) {
    case 1:
      return `m/44'/60'`
    default:
      return `m/44'/1'`
  }
}

export default trezor
