import AirGapedKeyring from '@keystonehq/eth-keyring'
import {
  Helpers,
  KeystoneOptions,
  WalletModule,
  HardwareWalletCustomNetwork
} from '../../../interfaces'
import keystoneIcon from '../wallet-icons/icon-keystone.png'
import keystoneIcon2x from '../wallet-icons/icon-keystone@2x.png'

function keystone(
  options: KeystoneOptions & { networkId: number }
): WalletModule {
  const {
    appName,
    rpcUrl,
    networkId,
    preferred,
    label,
    iconSrc,
    svg,
    customNetwork
  } = options

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
        resetWalletState,
        customNetwork
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
  customNetwork?: HardwareWalletCustomNetwork
  networkName: (id: number) => string
  resetWalletState: (options?: {
    disconnected: boolean
    walletName: string
  }) => void
}) {
  const { Transaction } = await import('@ethereumjs/tx')
  const { default: Common } = await import('@ethereumjs/common')
  const { default: createProvider } = await import('./providerEngine')

  const BASE_PATH = "m/44'/60'/0'/0"

  const { networkId, rpcUrl, BigNumber, networkName, customNetwork } = options

  const keyring = AirGapedKeyring.getEmptyKeyring()

  let dPath = ''

  let addressToIndex = new Map<string, number>()
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
    signTypedMessage: (messageData: any, callback: any) => {
      signTypedMessage(messageData)
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
    addressToIndex = new Map<string, number>()
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

  function addresses() {
    return Array.from(addressToIndex.keys())
  }

  function generateAccountsMap(accounts: string[]) {
    const _map = new Map<string, number>()
    accounts.forEach((account, index) => {
      _map.set(account, index)
    })
    return _map
  }

  function setPrimaryAccount(address: string) {
    // make a copy and put in an array
    const accounts = [...addressToIndex.entries()]
    const account = accounts.find(
      ([accountAddress]) => accountAddress === address
    )
    const accountIndex = accounts.findIndex(
      ([accountAddress]) => accountAddress === address
    )
    keyring.setCurrentAccount(account?.[1] || 0)
    // pull the item at the account index out of the array and place at the front
    accounts.unshift(accounts.splice(accountIndex, 1)[0])
    // reassign addressToPath to new ordered accounts
    addressToIndex = new Map(accounts)
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

    if (addressToIndex.size > 0 && !getMore) {
      return addresses()
    }

    try {
      const accounts = await keyring.addAccounts(5)
      addressToIndex = generateAccountsMap(accounts)
      const currentPrimary = getPrimaryAddress()
      setPrimaryAccount(currentPrimary)
    } catch (error) {
      throw error
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
    if (addressToIndex.size === 0) {
      await enable()
    }

    const common = new Common({
      chain: customNetwork || networkName(networkId)
    })

    const transaction = Transaction.fromTxData(
      {
        ...transactionData,
        gasLimit: transactionData.gas ?? transactionData.gasLimit
      },
      { common, freeze: false }
    )

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
    if (addressToIndex.size === 0) {
      await enable()
    }

    try {
      return keyring.signPersonalMessage(getPrimaryAddress(), message.data)
    } catch (err) {
      throw err
    }
  }

  async function signTypedMessage({ data }: { data: any }) {
    if (addressToIndex.size === 0) {
      await enable()
    }

    try {
      if (typeof data === 'string') {
        return keyring.signTypedData(getPrimaryAddress(), JSON.parse(data))
      }
      if (typeof data === 'object') {
        return keyring.signTypedData(getPrimaryAddress(), data)
      }
      throw new Error('invalid typed data')
    } catch (err) {
      throw err
    }
  }

  return provider
}

export default keystone
