import AirGapedKeyring from '@keystonehq/eth-keyring'
import { Helpers, LatticeOptions, WalletModule } from '../../../interfaces'
import keystoneIcon from '../wallet-icons/icon-keystone.png'
import keystoneIcon2x from '../wallet-icons/icon-keystone@2x.png'

function keystone(
  options: LatticeOptions & { networkId: number }
): WalletModule {
  const { appName, rpcUrl, networkId, preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Keystone',
    svg: svg,
    iconSrc: keystoneIcon,
    iconSrcSet: iconSrc || keystoneIcon2x,
    wallet: async (helpers: Helpers) => {
      const { BigNumber, networkName, resetWalletState } = helpers

      const provider = await keystoneProvider({
        appName,
        rpcUrl,
        networkId,
        BigNumber,
        networkName,
        resetWalletState
      })

      return {
        provider,
        interface: {
          name: 'Keystone',
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
    osExclusions: [],
    preferred
  }
}

async function keystoneProvider(options: {
  appName: string
  networkId: number
  rpcUrl: string
  BigNumber: any
  networkName: (id: number) => string
  resetWalletState: (options?: {
    disconnected: boolean
    walletName: string
  }) => void
}) {
  const EthereumTx = await import('ethereumjs-tx')
  const { default: createProvider } = await import('./providerEngine')

  const BASE_PATH = "m/44'/60'/0'/0"

  const { networkId, rpcUrl, BigNumber, networkName } = options

  const keyring = AirGapedKeyring.getEmptyKeyring()

  let dPath = ''

  let addressList = Array.from<string>([])
  let enabled = false
  let customPath = false

  const provider = createProvider({
    getAccounts: (callback: any) => {
      getAccounts()
        .then((res: Array<string | undefined>) => callback(null, res))
        .catch((err: any) => callback(err, null))
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

  function disconnect() {
    dPath = ''
    enabled = false
    provider.stop()
  }

  async function setPath(path: string) {
    if (path !== BASE_PATH)
      throw new Error("Keystone only supports standard path: m/44'/0'/0'/0/x")
    customPath = false
    dPath = path
    return true
  }

  function isCustomPath() {
    return customPath
  }

  function enable() {
    if (enabled) {
      return getAccounts()
    }
    return keyring.readKeyring().then(() => {
      enabled = true
      return getAccounts()
    })
  }

  function setPrimaryAccount(address: string) {
    return keyring.setCurrentAccount(
      addressList.findIndex(addr => addr === address) || 0
    )
  }

  function getPrimaryAddress() {
    return keyring.getCurrentAddress()
  }

  async function getMoreAccounts() {
    const accounts = await getAccounts(true)
    return accounts && getBalances(accounts)
  }

  async function getAccounts(getMore?: boolean) {
    if (!enabled) {
      return []
    }

    if (keyring.getAccounts().length > 0 && !getMore) {
      return keyring.getAccounts()
    }

    try {
      addressList = await keyring.addAccounts(keyring.getAccounts().length + 5)
    } catch (error) {
      throw error
    }
    return addressList
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
    if (addressList.length === 0) {
      await enable()
    }

    const transaction = new EthereumTx.Transaction(transactionData, {
      chain: networkName(networkId)
    })

    try {
      const signedTx = await keyring.signTransaction(
        getPrimaryAddress(),
        transaction
      )
      return `0x${signedTx.serialize().toString('hex')}`
    } catch (err) {
      throw err
    }
  }

  async function signMessage(message: { data: string }): Promise<string> {
    if (addressList.length === 0) {
      await enable()
    }

    try {
      return keyring.signPersonalMessage(getPrimaryAddress(), message.data)
    } catch (err) {
      throw err
    }
  }

  return provider
}

export default keystone
