import { extensionInstallMessage, mobileWalletInstallMessage } from '../content'
import {
  DcentOptions,
  WalletModule,
  HardwareWalletCustomNetwork,
  Helpers
} from '../../../interfaces'
import dcentIcon from '../wallet-icons/icon-dcent'


function dcent(options: DcentOptions & { networkId: number, isMobile: boolean }): WalletModule {
  
  const { 
    rpcUrl, 
    networkId, 
    preferred, 
    label, 
    iconSrc, 
    svg, 
    isMobile, 
    customNetwork 
  } = options
  return {
    name: label || "D'CENT",
    svg: svg || dcentIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      const {
        BigNumber,
        networkName,
        getProviderName,
        createModernProviderInterface,
        createLegacyProviderInterface,
        resetWalletState
      } = helpers

      const provider = isMobile ? 
         ((window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)) 
        : await DcentProvider({
          rpcUrl,
          networkId,
          BigNumber,
          networkName,
          customNetwork,
          resetWalletState
        })

      if (isMobile) {
        return {
          provider,
          interface:
            provider && getProviderName(provider) === "D'CENT"
              ? typeof provider.enable === 'function'
                ? createModernProviderInterface(provider)
                : createLegacyProviderInterface(provider)
              : null
        }
      } else {
        return {
          provider,
          interface: {
            name: `D'CENT`,
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
      }
    },
    type: 'hardware',
    desktop: true,
    mobile: true,
    preferred
  }
}

interface DcentProviderOptions {
  networkId: number
  rpcUrl: string
  BigNumber: any
  customNetwork?: HardwareWalletCustomNetwork
  networkName: (id: number) => string
  resetWalletState: (options?: {
    disconnected: boolean
    walletName: string
  }) => void
}

async function DcentProvider(options: DcentProviderOptions) {
  const { default: EthDcentKeyring } = await import('eth-dcent-keyring')
  const { Transaction } = await import('@ethereumjs/tx')
  const { default: Common } = await import('@ethereumjs/common')
  const { BN, toBuffer } = await import('ethereumjs-util')
  const { default: createProvider } = await import('./providerEngine')

  const BASE_PATH = "m/44'/60'/0'/0/0"

  const { rpcUrl, 
    networkId, 
    BigNumber, 
    networkName, 
    customNetwork,
    resetWalletState
  } = options
  const params = {
  }
  const dcentKeyring = new EthDcentKeyring(params)

  let dPath = ''

  let addressList = Array.from([])
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
    addressList = Array.from([])
    enabled = false
    provider.stop()
  }

  async function setPath(path: string) {
    if (path !== BASE_PATH)
      throw new Error("Dcent only supports standard path: m/44'/0'/0'/0/x")
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
    return addressList
  }

  function setPrimaryAccount() {
    return
  }

  function getPrimaryAddress() {
    return enabled ? addresses()[0] : undefined
  }

  async function getMoreAccounts() {
    const m = `Lattice only supports one exported account per wallet. Checking for new wallet.`
    console.warn(m)
    const accounts = await getAccounts(true)
    return accounts && getBalances(accounts)
  }

  async function getAccounts(getMore?: boolean) {
    if (!enabled) {
      return []
    }

    if (addressList.length > 0 && !getMore) {
      return addressList
    }

    try {
      addressList = await dcentKeyring.addAccounts()
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
      const result = await dcentKeyring.signTransaction(
        addressList[0],
        transaction
      )
      // Reconstruct the signed transaction

      let v = new BN(result.v).toString(16)
      // EIP155 support. check/recalc signature v value.
      const rv = parseInt(v, 16)
      let cv = networkId * 2 + 35
      if (rv !== cv && (rv & cv) !== rv) {
        cv += 1 // add signature v bit.
      }
      v = cv.toString(16)

      transaction.v = new BN(toBuffer(`0x${v}`))
      transaction.r = new BN(result.r)
      transaction.s = new BN(result.s)

      return `0x${transaction.serialize().toString('hex')}`
    } catch (err) {
      throw err
    }
  }

  async function signMessage(message: { data: string }): Promise<string> {
    if (addressList.length === 0) {
      await enable()
    }

    try {
      const sig = await dcentKeyring.signPersonalMessage(
        addressList[0],
        message.data
      )
      return sig
    } catch (err) {
      throw err
    }
  }

  return provider
}

export default dcent
