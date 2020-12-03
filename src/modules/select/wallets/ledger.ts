import { LedgerOptions, WalletModule,HardwareWalletCustomNetwok, Helpers } from '../../../interfaces'

import ledgerIcon from '../wallet-icons/icon-ledger'

const LEDGER_LIVE_PATH = `m/44'/60'`
const ACCOUNTS_TO_GET = 5

function ledger(options: LedgerOptions & { networkId: number }): WalletModule {
  const {
    rpcUrl,
    LedgerTransport,
    networkId,
    preferred,
    label,
    iconSrc,
    svg,
    customNetwork
  } = options

  return {
    name: label || 'Ledger',
    svg: svg || ledgerIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      const { BigNumber, networkName, resetWalletState } = helpers

      const provider = await ledgerProvider({
        rpcUrl,
        networkId,
        LedgerTransport,
        BigNumber,
        networkName,
        resetWalletState,
        customNetwork
      })

      return {
        provider,
        interface: {
          name: 'Ledger',
          connect: provider.enable,
          disconnect: provider.disconnect,
          address: {
            get: async () => provider.getPrimaryAddress()
          },
          network: {
            get: async () => networkId
          },
          balance: {
            get: async () => {
              const address = provider.getPrimaryAddress()
              return address && provider.getBalance(address)
            }
          }
        }
      }
    },
    type: 'hardware',
    desktop: true,
    mobile: true,
    osExclusions: ['iOS'],
    preferred
  }
}

async function ledgerProvider(options: {
  networkId: number
  rpcUrl: string
  LedgerTransport: any
  BigNumber: any
  customNetwork?: HardwareWalletCustomNetwok
  networkName: (id: number) => string
  resetWalletState: (options?: {
    disconnected: boolean
    walletName: string
  }) => void
}) {
  const { default: createProvider } = await import('./providerEngine')
  const { generateAddresses, isValidPath } = await import('./hd-wallet')
  const { default: TransportU2F } = await import('@ledgerhq/hw-transport-u2f')
  const { default: Eth } = await import('@ledgerhq/hw-app-eth')

  const { Transaction } = await import('@ethereumjs/tx')
  const {default:Common} = await import ('@ethereumjs/common')
  const ethUtil = await import('ethereumjs-util')
  const {
    networkId,
    rpcUrl,
    LedgerTransport,
    BigNumber,
    networkName,
    resetWalletState,
    customNetwork
  } = options

  let dPath = ''
  let addressToPath = new Map()
  let enabled = false
  let customPath = false

  let account:
    | undefined
    | { publicKey: string; chainCode: string; path: string }

  const provider = createProvider({
    getAccounts: (callback: any) => {
      getAccounts()
        .then((res: Array<any>) => callback(null, res))
        .catch((err: string) => callback(err, null))
    },
    signTransaction: (transactionData: any, callback: any) => {
      signTransaction(transactionData)
        .then((res: string) => callback(null, res))
        .catch(err => callback(err, null))
    },
    processMessage: (messageData: any, callback: any) => {
      signMessage(messageData)
        .then((res: string) => callback(null, res))
        .catch(err => callback(err, null))
    },
    processPersonalMessage: (messageData: any, callback: any) => {
      signMessage(messageData)
        .then((res: string) => callback(null, res))
        .catch(err => callback(err, null))
    },
    signMessage: (messageData: any, callback: any) => {
      signMessage(messageData)
        .then((res: string) => callback(null, res))
        .catch(err => callback(err, null))
    },
    signPersonalMessage: (messageData: any, callback: any) => {
      signMessage(messageData)
        .then((res: string) => callback(null, res))
        .catch(err => callback(err, null))
    },
    rpcUrl
  })

  provider.setPath = setPath
  provider.dPath = dPath
  provider.enable = enable
  provider.setPrimaryAccount = setPrimaryAccount
  provider.getPrimaryAddress = getPrimaryAddress
  provider.getAccounts = getAccounts
  provider.getMoreAccounts = getMoreAccounts
  provider.getBalance = getBalance
  provider.getBalances = getBalances
  provider.send = provider.sendAsync
  provider.disconnect = disconnect
  provider.isCustomPath = isCustomPath

  let transport: any
  let eth: any

  function disconnect() {
    transport && transport.close()
    provider.stop()
    resetWalletState({ disconnected: true, walletName: 'Ledger' })
  }

  async function setPath(path: string, custom?: boolean) {
    if (!isValidPath(path)) {
      return false
    }

    if (path !== dPath) {
      // clear any exsting addresses if different path
      addressToPath = new Map()
    }

    if (custom) {
      const address = await getAddress(path)
      addressToPath.set(address, path)
      customPath = true

      return true
    }

    customPath = false
    dPath = path

    return true
  }

  function isCustomPath() {
    return customPath
  }

  async function createTransport() {
    try {
      transport = LedgerTransport
        ? await LedgerTransport.create()
        : await TransportU2F.create()

      eth = new Eth(transport)

      const observer = {
        next: (event: any) => {
          if (event.type === 'remove') {
            disconnect()
          }
        },
        error: () => {},
        complete: () => {}
      }

      LedgerTransport
        ? LedgerTransport.listen(observer)
        : TransportU2F.listen(observer)
    } catch (error) {
      throw new Error('Error connecting to Ledger wallet')
    }
  }

  function enable() {
    enabled = true
    return getAccounts()
  }

  function addresses() {
    return Array.from(addressToPath.keys())
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
  }

  async function getAddress(path: string) {
    if (!eth) {
      await createTransport()
    }

    try {
      const result = await eth.getAddress(path)
      return result.address
    } catch (error) {}
  }

  async function getPublicKey() {
    if (!dPath) {
      throw new Error('a derivation path is needed to get the public key')
    }

    if (!eth) {
      await createTransport()
    }

    try {
      const result = await eth.getAddress(dPath, false, true)
      const { publicKey, chainCode } = result

      account = {
        publicKey,
        chainCode,
        path: dPath
      }

      return account
    } catch (error) {
      throw new Error('There was a problem accessing your Ledger accounts.')
    }
  }

  function getPrimaryAddress() {
    return enabled ? addresses()[0] : undefined
  }

  async function getMoreAccounts() {
    const accounts = await getAccounts(true)
    return accounts && getBalances(accounts)
  }

  async function getAccounts(getMore?: boolean) {
    if (!enabled) {
      return []
    }

    if (addressToPath.size > 0 && !getMore) {
      return addresses()
    }

    if (!eth) {
      await createTransport()
    }

    if (dPath === '') {
      dPath = LEDGER_LIVE_PATH
    }

    if (dPath === LEDGER_LIVE_PATH) {
      const currentAccounts = addressToPath.size
      const paths = []
      for (
        let i = currentAccounts;
        i < ACCOUNTS_TO_GET + currentAccounts;
        i++
      ) {
        paths.push(`${LEDGER_LIVE_PATH}/${i}'/0/0`)
      }

      for (const path of paths) {
        const res = await eth.getAddress(path)
        addressToPath.set(res.address, path)
      }
    } else {
      if (!account) {
        try {
          account = await getPublicKey()
        } catch (error) {
          throw error
        }
      }

      const addressInfo = generateAddresses(account, addressToPath.size)

      addressInfo.forEach(({ dPath, address }) => {
        addressToPath.set(address, dPath)
      })
    }

    return addresses()
  }

  function getBalances(addresses: Array<string>) {
    return Promise.all(
      addresses.map(
        address =>
          new Promise(async resolve => {
            const balance = await getBalance(address)
            resolve({ address, balance })
          })
      )
    )
  }

  function getBalance(address: string) {
    return new Promise((resolve, reject) => {
      provider.sendAsync(
        {
          jsonrpc: '2.0',
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
    const {BN, toBuffer} = ethUtil
    const common =  new Common({ chain: (customNetwork) || networkName(networkId) })
    try {
      const transaction =  Transaction.fromTxData(
        {...transactionData,gasLimit: transactionData.gas??transactionData.gasLimit}, 
        {common,freeze:false}
      )
      transaction.v = new BN(toBuffer(networkId))
      transaction.r = transaction.s = new BN(toBuffer(0));
      
      const ledgerResult = await eth.signTransaction(
        path,
        transaction.serialize().toString('hex')
      )
​   
      let v = ledgerResult.v.toString(16)
​
      // EIP155 support. check/recalc signature v value.
      let rv = parseInt(v, 16)
      let cv = networkId * 2 + 35
​
      if (rv !== cv && (rv & cv) !== rv) {
        cv += 1 // add signature v bit.
      }
​
      v = cv.toString(16)
      transaction.v = new BN(toBuffer(`0x${v}`))        
      transaction.r = new BN(toBuffer(`0x${ledgerResult.r}`))
      transaction.s = new BN(toBuffer(`0x${ledgerResult.s}`))

      return `0x${transaction.serialize().toString('hex')}`
    } catch (error) {
      throw error
    }
  }

  async function signMessage(message: { data: string }): Promise<string> {
    if (addressToPath.size === 0) {
      await enable()
    }

    const path = [...addressToPath.values()][0]

    return eth
      .signPersonalMessage(path, ethUtil.stripHexPrefix(message.data))
      .then((result: any) => {
        let v = (result['v'] - 27).toString(16)
        if (v.length < 2) {
          v = '0' + v
        }
        return `0x${result['r']}${result['s']}${v}`
      })
  }

  return provider
}

export default ledger
