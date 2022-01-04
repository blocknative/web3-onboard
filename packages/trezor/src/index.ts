import { accountSelect, createEIP1193Provider } from '@bn-onboard/common'
import {
  ScanAccountsOptions,
  Account,
  Asset
} from '@bn-onboard/common/src/types'
import type { BIP32Interface } from 'bip32'
import TrezorConnect from 'trezor-connect';

import type { Chain, CustomNetwork, WalletInit, GetInterfaceHelpers } from '@bn-onboard/types'


interface TrezorOptions {
  walletName: string
  preferred?: boolean
  label?: string
  iconSrc?: string
  svg?: string
  networkId?: number
  display?: { mobile?: boolean; desktop?: boolean }
  appUrl: string
  email: string
  rpcUrl: string
  customNetwork?: any //HardwareWalletCustomNetwork
}

interface TrezorProviderOptions {
  networkId?: number
  email: string
  appUrl: string
  rpcUrl: string
  BigNumber: any
  customNetwork?: CustomNetwork
  networkName: (id: number) => string
  resetWalletState: (options?: {
    disconnected: boolean
    walletName: string
  }) => void
}
// interface HardwareWalletCustomNetwork {
//   networkId: number
//   genesis: GenesisBlock
//   hardforks: Hardfork[]
//   bootstrapNodes: BootstrapNode[]
// }
















































const trezor = (options: TrezorOptions): WalletInit => {
  const {
    walletName,
    preferred,
    label,
    iconSrc,
    svg,
    networkId,
    display,
    appUrl,
    email,
    rpcUrl,
    customNetwork,
  } = options

  return {
    label: 'Trezor',
    getIcon: async () => (await import('./icon')).default,


    getInterface: async (helpers: GetInterfaceHelpers) => {
      const { BigNumber, EventEmitter, chains } = helpers

      const provider = await trezorProvider({
        rpcUrl,
        networkId,
        email,
        appUrl,
        BigNumber,
        networkName,
        customNetwork,
        resetWalletState
      })

      return {
        provider,
        interface: {
          name: 'Trezor',
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

const trezorProvider = async (options: TrezorProviderOptions) => {
  const TrezorConnectLibrary = await import('trezor-connect')
  const { Transaction } = await import('@ethereumjs/tx')
  const { default: Common } = await import('@ethereumjs/common')
  const ethUtil = await import('ethereumjs-util')
  // const { default: createProvider } = await import('./providerEngine')
  const { generateAddresses, isValidPath } = await import('./hd-wallet')

  const { default: TrezorConnect, DEVICE_EVENT, DEVICE } = TrezorConnectLibrary

  const TREZOR_DEFAULT_PATH = "m/44'/60'/0'/0"

  const {
    networkId,
    email,
    appUrl,
    rpcUrl,
    BigNumber,
    networkName,
    customNetwork,
    resetWalletState
  } = options

  let dPath = ''

  let addressToPath = new Map()
  let enabled = false
  let customPath = false

  let account:
    | undefined
    | { publicKey: string; chainCode: string; path: string }

  TrezorConnect.manifest({
    email,
    appUrl
  })

  const provider = createEIP1193Provider({}, {
    eth_requestAccounts: async baseRequest => {
      // Triggers the account select modal if no accounts have been selected
      const [{ address }] = await getAccounts()
      return [address]
    },
    eth_accounts: async baseRequest => {
      return getAccounts();
    },
    eth_chainId: async baseRequest => {
      return networkId ?? ''
    },
    eth_signTransaction: async (baseRequest, [transactionObject]) => {
//signTransaction
    },
    eth_sign: async (baseRequest, [address, message]) => {
//signMessage
    },
    eth_signTypedData: async (baseRequest, [address, typedData]) => {

    },
    wallet_switchEthereumChain: async (baseRequest, [{ chainId }]) => {

    },
    wallet_addEthereumChain: null
  })


  const provider = {
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

  TrezorConnect.on(DEVICE_EVENT, (event: any) => {
    if (event.type === DEVICE.DISCONNECT) {
      provider.stop()
      resetWalletState({ disconnected: true, walletName: 'Trezor' })
    }
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
    addressToPath = new Map()
    enabled = false
    provider.stop()
  }

  const setPath = async (path: string, custom?: boolean) => {
    if (!isValidPath(path)) {
      return false
    }

    if (path !== dPath) {
      // clear any exsting addresses if different path
      addressToPath = new Map()
    }

    if (custom) {
      try {
        const address = await getAddress(path)
        addressToPath.set(address, path)
        dPath = path
        customPath = true

        return true
      } catch (error) {
        throw new Error(
          `There was a problem deriving an address from path ${path}`
        )
      }
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

  const getAddress = async (path: string) => {
    const errorMsg = `Unable to derive address from path ${path}`

    try {
      const result = await TrezorConnect.ethereumGetAddress({
        path,
        showOnTrezor: false
      })

      if (!result.success) {
        throw new Error(errorMsg)
      }

      return result.payload.address
    } catch (error) {
      throw new Error(errorMsg)
    }
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

  const getPublicKey = async () => {
    if (!dPath) {
      throw new Error('a derivation path is needed to get the public key')
    }

    try {
      const result = await TrezorConnect.getPublicKey({
        path: dPath,
        coin: 'eth'
      })

      if (!result.success) {
        throw new Error(result.payload.error)
      }

      account = {
        publicKey: result.payload.publicKey,
        chainCode: result.payload.chainCode,
        path: result.payload.serializedPath
      }

      return account
    } catch (error) {
      throw new Error('There was an error accessing your Trezor accounts.')
    }
  }

  function getPrimaryAddress() {
    return enabled ? addresses()[0] : undefined
  }

  const getMoreAccounts = async () => {
    const accounts = await getAccounts(true)
    return getBalances(accounts)
  }

  const getAccounts = async (getMore?: boolean) => {
    if (!enabled) {
      return [undefined]
    }

    if (addressToPath.size > 0 && !getMore) {
      return addresses()
    }

    if (dPath === '') {
      dPath = TREZOR_DEFAULT_PATH
    }

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

  const signTransaction = async (transactionData: any) => {
    if (addressToPath.size === 0) {
      await enable()
    }
    const path = [...addressToPath.values()][0]
    const { BN, toBuffer } = ethUtil
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
    transaction.v = new BN(toBuffer(networkId))
    transaction.r = transaction.s = new BN(toBuffer(0))
    const trezorResult = await trezorSignTransaction(path, transactionData)
    if (!trezorResult.success) {
      throw new Error(trezorResult.payload.error)
    }
    let v = trezorResult.payload.v.toString(16)
    // EIP155 support. check/recalc signature v value.
    const rv = parseInt(v, 16)
    let cv = networkId * 2 + 35
    if (rv !== cv && (rv & cv) !== rv) {
      cv += 1 // add signature v bit.
    }
    v = cv.toString(16)
    transaction.v = new BN(toBuffer(`0x${v}`))
    transaction.r = new BN(toBuffer(`${trezorResult.payload.r}`))
    transaction.s = new BN(toBuffer(`${trezorResult.payload.s}`))
    return `0x${transaction.serialize().toString('hex')}`
  }

  const signMessage = async (message: { data: string }): Promise<string> => {
    if (addressToPath.size === 0) {
      await enable()
    }

    const [address, path] = [...addressToPath.entries()][0]

    return new Promise((resolve, reject) => {
      TrezorConnect.ethereumSignMessage({
        path,
        message: ethUtil.stripHexPrefix(message.data),
        hex: true
      }).then((response: any) => {
        if (response.success) {
          if (response.payload.address !== ethUtil.toChecksumAddress(address)) {
            reject(new Error('signature doesnt match the right address'))
          }
          const signature = `0x${response.payload.signature}`
          resolve(signature)
        } else {
          reject(
            new Error(
              (response.payload && response.payload.error) ||
                'There was an error signing a message'
            )
          )
        }
      })
    })
  }

  return provider
}

export default trezor