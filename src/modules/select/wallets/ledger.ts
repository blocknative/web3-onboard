import { LedgerOptions, WalletModule, Helpers } from '../../../interfaces'

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
    svg
  } = options

  return {
    name: label || 'Ledger',
    svg: svg || ledgerIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      const { BigNumber, networkName } = helpers

      const provider = await ledgerProvider({
        rpcUrl,
        networkId,
        LedgerTransport,
        BigNumber,
        networkName
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
  networkName: (id: number) => string
}) {
  const { default: createProvider } = await import('./providerEngine')
  const { generateAddresses, isValidPath } = await import('./hd-wallet')
  const { default: TransportU2F } = await import('@ledgerhq/hw-transport-u2f')
  const { default: Eth } = await import('@ledgerhq/hw-app-eth')

  const EthereumTx = await import('ethereumjs-tx')
  const ethUtil = await import('ethereumjs-util')
  const buffer = await import('buffer')

  const { networkId, rpcUrl, LedgerTransport, BigNumber, networkName } = options

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

  try {
    transport = LedgerTransport
      ? await LedgerTransport.create()
      : await TransportU2F.create()

    eth = new Eth(transport)
  } catch (error) {
    throw new Error('Error connecting to Ledger wallet')
  }

  function disconnect() {
    transport.close()
    dPath = ''
    addressToPath = new Map()
    enabled = false
    provider.stop()
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
    try {
      const result = await eth.getAddress(path)
      return result.address
    } catch (error) {}
  }

  async function getPublicKey() {
    if (!dPath) {
      throw new Error('a derivation path is needed to get the public key')
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

    try {
      const transaction = new EthereumTx.Transaction(transactionData, {
        chain: networkName(networkId)
      })

      transaction.raw[6] = buffer.Buffer.from([networkId]) // v
      transaction.raw[7] = buffer.Buffer.from([]) // r
      transaction.raw[8] = buffer.Buffer.from([]) // s

      const ledgerResult = await eth.signTransaction(
        path,
        transaction.serialize().toString('hex')
      )

      transaction.v = buffer.Buffer.from(ledgerResult.v, 'hex')
      transaction.r = buffer.Buffer.from(ledgerResult.r, 'hex')
      transaction.s = buffer.Buffer.from(ledgerResult.s, 'hex')

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
