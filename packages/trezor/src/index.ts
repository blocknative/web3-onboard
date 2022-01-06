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

import type { providers } from 'ethers'
import { Address } from 'trezor-connect/lib/typescript/trezor/protobuf';

const TREZOR_DEFAULT_PATH = "m/44'/60'/0'/0"

const assets = [
  {
    label: 'ETH'
  }
]

const DEFAULT_BASE_PATHS = [
  {
    label: 'Ethereum',
    value: TREZOR_DEFAULT_PATH
  }
]

const getAccount = async (
  address: string,
  asset: Asset,
  provider: providers.JsonRpcProvider,
  dPath: string
): Promise<Account> => {
  return {
    derivationPath: dPath,
    address,
    balance: {
      asset: asset.label,
      value: await provider.getBalance(address)
    }
  }
}

const getAddresses = async (
  addressList: any,
  asset: Asset,
  provider: providers.JsonRpcProvider,
  dPath: string
): Promise<Account[]> => {
  const accounts = []

  addressList.forEach((path: string, address: string) => {
    accounts.push(getAccount(address, asset, provider, path))
  })

  return accounts
}



function trezor({customNetwork}: {customNetwork?: CustomNetwork} = {}): WalletInit {
  const getIcon = async () => (await import('./icon')).default

  return () => {
    let accounts: Account[] | undefined
    return {
      label: 'Trezor',
      getIcon,
      getInterface: async ({ EventEmitter, BigNumber, chains, appMetadata }) => {
        
        const TrezorConnectLibrary = await import('trezor-connect')
        const { Transaction } = await import('@ethereumjs/tx')
        const { default: Common, Hardfork } = await import('@ethereumjs/common')
        const ethUtil = await import('ethereumjs-util')
        const { accountSelect, createEIP1193Provider, ProviderRpcError } = await import('@bn-onboard/common')
        const { default: TrezorConnect, DEVICE_EVENT, DEVICE } = TrezorConnectLibrary
        const { generateAddresses, isValidPath } = await import('./hd-wallet-helpers')
        const { providers } = await import('ethers')
        
        
        // Initialize!!
        
        if (!(appMetadata?.email && appMetadata?.appUrl)) {
          throw new Error('Email and AppUrl required for Trezor Wallet')
        }
        
        const {email, appUrl} = appMetadata;
        
        TrezorConnect.manifest({
          email: email,
          appUrl: appUrl
        })
        
        let currentChain: Chain = chains[0]
        
        // Variables
        const eventEmitter = new EventEmitter()
        
        let addressToPath: any = new Map();
        let dPath: string = ''
        let assetG: Asset;
        
        let enabled: boolean = false
        let customPath: boolean = false
        
        let account:
        | undefined
        | { publicKey: string; chainCode: string; path: string }
        
        
        // TODO: Do we need this?
        // TrezorConnect.on(DEVICE_EVENT, (event: any) => {
          //   if (event.type === DEVICE.DISCONNECT) {
            //     provider.stop()
        //     resetWalletState({ disconnected: true, walletName: 'Trezor' })
        //   }
        // })

        // function disconnect() {
        //   dPath = ''
        //   addressToPath = new Map()
        //   enabled = false
        //   provider.stop()
        // }

        async function setPath(path: string, custom?: boolean ) {
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


        async function getAddress(path: string) {
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

        // function setPrimaryAccount(address: string) {
        //   // make a copy and put in an array
        //   const accounts = [...addressToPath.entries()]
        //   const accountIndex = accounts.findIndex(
        //     ([accountAddress]) => accountAddress === address
        //   )
        //   // pull the item at the account index out of the array and place at the front
        //   accounts.unshift(accounts.splice(accountIndex, 1)[0])
        //   // reassign addressToPath to new ordered accounts
        //   addressToPath = new Map(accounts)
        // }

        // function getPrimaryAddress() {
        //   return enabled ? addressesToList()[0] : undefined
        // }


        async function getAccounts(getMore?: boolean): Promise<Account[]> {
          if (!enabled) {
            return []
          }
          
          if (addressToPath.size > 0 && !getMore) {
            const provider = new providers.JsonRpcProvider(currentChain.rpcUrl)
            return getAddresses(addressToPath, assetG, provider, dPath)
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
      
          const provider = new providers.JsonRpcProvider(currentChain.rpcUrl)
          return getAddresses(addressToPath, assetG, provider, dPath)
        }
      

        // async function getMoreAccounts() {
        //   const accounts = await getAccounts(true)
        //   return getBalances(accounts)
        // }

        async function getPublicKey() {
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

        const scanAccounts = async ({derivationPath, chainId, asset}: ScanAccountsOptions): Promise<Account[]> => {
          dPath = derivationPath;
          assetG = asset;
          currentChain = chains.find(({ id }) => id === chainId) ?? currentChain
          return getAccounts()
        }

        const getAccount = async () =>
        accounts ??
        (accounts = await accountSelect({
          basePaths: DEFAULT_BASE_PATHS,
          assets,
          chains,
          scanAccounts,
          walletIcon: await getIcon()
        }))

      
        function trezorSignTransaction(path: string, transactionData: any) {
          const { nonce, gasPrice, gas, to, value, data } = transactionData
      
          return TrezorConnect.ethereumSignTransaction({
            path: path,
            transaction: {
              to,
              value: value || '',
              data: data || '',
              chainId: parseInt(currentChain?.id),
              nonce,
              gasPrice,
              gasLimit: gas,
            }
          })
        }
            
        function trezorSignTransaction1559(path: string, transactionData: any) {
          const { nonce, gas, to, value, data, maxFeePerGas, maxPriorityFeePerGas } = transactionData
      
          return TrezorConnect.ethereumSignTransaction({
            path: path,
            transaction: {
              to,
              value: value || '',
              data: data || '',
              chainId: parseInt(currentChain?.id),
              nonce,
              gasLimit: gas,
              maxFeePerGas,
              maxPriorityFeePerGas,
            }
          })
        }
      
        async function signTransaction(transactionData: any) {
          if (addressToPath.size === 0 || !accounts) {
            getAccounts();
          }
          const path = [...addressToPath.values()][0]
          const { BN, toBuffer } = ethUtil
          const common = new Common({
            chain: customNetwork || currentChain?.id || 1
          })
          const transaction = Transaction.fromTxData(
            {
              ...transactionData,
              gasLimit: transactionData.gas ?? transactionData.gasLimit
            },
            { common, freeze: false }
          )
          transaction.v = new BN(toBuffer(currentChain?.id))
          transaction.r = transaction.s = new BN(toBuffer(0))
          const trezorResult = await trezorSignTransaction(path, transactionData)
          if (!trezorResult.success) {
            throw new Error(trezorResult.payload.error)
          }
          let v = trezorResult.payload.v.toString(16)
          // EIP155 support. check/recalc signature v value.
          const rv = parseInt(v, 16)
          let cv = parseInt(currentChain?.id) * 2 + 35
          if (rv !== cv && (rv & cv) !== rv) {
            cv += 1 // add signature v bit.
          }
          v = cv.toString(16)
          transaction.v = new BN(toBuffer(`0x${v}`))
          transaction.r = new BN(toBuffer(`${trezorResult.payload.r}`))
          transaction.s = new BN(toBuffer(`${trezorResult.payload.s}`))
          return `0x${transaction.serialize().toString('hex')}`
        }
      
        
        async function signMessage(message: { data: string }): Promise<string> {
          if (addressToPath.size === 0 || !accounts) {
            getAccounts();
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

        const trezorProvider = {}

        const provider = createEIP1193Provider(trezorProvider, {
          eth_requestAccounts: async baseRequest => {
            await enable()
            const accounts = await getAccount()
            if (accounts?.length === 0) {
              throw new ProviderRpcError({
                code: 4001,
                message: 'User rejected the request.'
              })
            }
            return [accounts[0]?.address]
          },
          eth_accounts: async baseRequest => {
            return accounts?.[0]?.address ? [accounts[0].address] : []
          },
          eth_chainId: async baseRequest => {
            return currentChain?.id ?? ''
          },
          eth_signTransaction: async (baseRequest, [transactionObject]) => {
             return signTransaction(transactionObject)
          },
          eth_sign: async (baseRequest, [address, message]) => {
            let messageData = { data: message }
            return signMessage(messageData)
          },
          wallet_switchEthereumChain: async (baseRequest, [{ chainId }]) => {
            currentChain =
            chains.find(({ id }) => id === chainId) ?? currentChain
            if (!currentChain)
            throw new Error('chain must be set before switching')
            
            eventEmitter.emit('chainChanged', currentChain.id)
            return null
          },
          eth_signTypedData: null,
          wallet_addEthereumChain: null
        })

        provider.on = eventEmitter.on.bind(eventEmitter)


        return {
          provider
        }
      }
    }
  }
}

export default trezor















// import {
//   TrezorOptions,
//   WalletModule,
//   HardwareWalletCustomNetwork,
//   Helpers
// } from '../../../interfaces'

// function trezor2(options: TrezorOptions & { networkId: number }): WalletModule {
//   const {
//     rpcUrl,
//     networkId,
//     email,
//     appUrl,
//     preferred,
//     label,
//     iconSrc,
//     svg,
//     customNetwork
//   } = options

//   return {
//     // name: label || 'Trezor',
//     // svg: svg || trezorIcon,
//     // iconSrc,
//     wallet: async (helpers: Helpers) => {
//       const { BigNumber, networkName, resetWalletState } = helpers

//       const provider = await trezorProvider({
//         rpcUrl,
//         networkId,
//         email,
//         appUrl,
//         BigNumber,
//         networkName,
//         customNetwork,
//         resetWalletState
//       })

//       return {
//         provider,
//         interface: {
//           name: 'Trezor',
//           connect: provider.enable,
//           disconnect: provider.disconnect,
//           address: {
//             get: async () => provider.getPrimaryAddress()
//           },
//           network: {
//             get: async () => networkId
//           },
//           balance: {
//             get: async () => {
//               const address = provider.getPrimaryAddress()
//               return address && provider.getBalance(address)
//             }
//           }
//         }
//       }
//     },
//     type: 'hardware',
//     desktop: true,
//     mobile: true,
//     osExclusions: ['iOS'],
//     preferred
//   }
// }

// async function trezorProvider(options: {
//   networkId: number
//   email: string
//   appUrl: string
//   rpcUrl: string
//   BigNumber: any
//   customNetwork?: HardwareWalletCustomNetwork
//   networkName: (id: number) => string
//   resetWalletState: (options?: {
//     disconnected: boolean
//     walletName: string
//   }) => void
// }) {
//   const TrezorConnectLibrary = await import('trezor-connect')
//   const { Transaction } = await import('@ethereumjs/tx')
//   const { default: Common } = await import('@ethereumjs/common')
//   const ethUtil = await import('ethereumjs-util')
//   const { default: createProvider } = await import('./providerEngine')
//   const { generateAddresses, isValidPath } = await import('./hd-wallet-helpers')

//   // const { default: TrezorConnect, DEVICE_EVENT, DEVICE } = TrezorConnectLibrary

//   const TREZOR_DEFAULT_PATH = "m/44'/60'/0'/0"

//   const {
//     networkId,
//     email,
//     appUrl,
//     rpcUrl,
//     BigNumber,
//     networkName,
//     customNetwork,
//     resetWalletState
//   } = options

//   let dPath = ''

//   let addressToPath = new Map()
//   let enabled = false
//   let customPath = false

//   let account:
//     | undefined
//     | { publicKey: string; chainCode: string; path: string }

//   // TrezorConnect.manifest({
//   //   email,
//   //   appUrl
//   // })

//   const provider = createProvider({
//     getAccounts: (callback: any) => {
//       getAccounts()
//         .then((res: Array<string | undefined>) => callback(null, res))
//         .catch((err: any) => callback(err, null))
//     },
//     signTransaction: (transactionData: any, callback: any) => {
//       signTransaction(transactionData)
//         .then((res: string) => callback(null, res))
//         .catch(err => callback(err, null))
//     },
//     processMessage: (messageData: any, callback: any) => {
//       signMessage(messageData)
//         .then((res: string) => callback(null, res))
//         .catch(err => callback(err, null))
//     },
//     // processPersonalMessage: (messageData: any, callback: any) => {
//     //   signMessage(messageData)
//     //     .then((res: string) => callback(null, res))
//     //     .catch(err => callback(err, null))
//     // },
//     signMessage: (messageData: any, callback: any) => {
//       signMessage(messageData)
//         .then((res: string) => callback(null, res))
//         .catch(err => callback(err, null))
//     },
//     // signPersonalMessage: (messageData: any, callback: any) => {
//     //   signMessage(messageData)
//     //     .then((res: string) => callback(null, res))
//     //     .catch(err => callback(err, null))
//     // },
//     rpcUrl
//   })

//   // TrezorConnect.on(DEVICE_EVENT, (event: any) => {
//   //   if (event.type === DEVICE.DISCONNECT) {
//   //     provider.stop()
//   //     resetWalletState({ disconnected: true, walletName: 'Trezor' })
//   //   }
//   // })

//   provider.setPath = setPath
//   provider.dPath = dPath
//   provider.enable = enable
//   provider.setPrimaryAccount = setPrimaryAccount
//   provider.getPrimaryAddress = getPrimaryAddress
//   provider.getAccounts = getAccounts
//   provider.getMoreAccounts = getMoreAccounts
//   provider.getBalance = getBalance
//   provider.getBalances = getBalances
//   provider.send = provider.sendAsync
//   provider.disconnect = disconnect
//   provider.isCustomPath = isCustomPath

//   function disconnect() {
//     dPath = ''
//     addressToPath = new Map()
//     enabled = false
//     provider.stop()
//   }

//   async function setPath(path: string, custom?: boolean) {
//     if (!isValidPath(path)) {
//       return false
//     }

//     if (path !== dPath) {
//       // clear any exsting addresses if different path
//       addressToPath = new Map()
//     }

//     if (custom) {
//       try {
//         const address = await getAddress(path)
//         addressToPath.set(address, path)
//         dPath = path
//         customPath = true

//         return true
//       } catch (error) {
//         throw new Error(
//           `There was a problem deriving an address from path ${path}`
//         )
//       }
//     }

//     customPath = false
//     dPath = path

//     return true
//   }

//   function isCustomPath() {
//     return customPath
//   }

//   function enable() {
//     enabled = true
//     return getAccounts()
//   }

//   async function getAddress(path: string) {
//     const errorMsg = `Unable to derive address from path ${path}`

//     try {
//       const result = await TrezorConnect.ethereumGetAddress({
//         path,
//         showOnTrezor: false
//       })

//       if (!result.success) {
//         throw new Error(errorMsg)
//       }

//       return result.payload.address
//     } catch (error) {
//       throw new Error(errorMsg)
//     }
//   }

//   function addresses() {
//     return Array.from(addressToPath.keys())
//   }


//   // async function getPublicKey() {
//   //   if (!dPath) {
//   //     throw new Error('a derivation path is needed to get the public key')
//   //   }

//   //   try {
//   //     const result = await TrezorConnect.getPublicKey({
//   //       path: dPath,
//   //       coin: 'eth'
//   //     })

//   //     if (!result.success) {
//   //       throw new Error(result.payload.error)
//   //     }

//   //     account = {
//   //       publicKey: result.payload.publicKey,
//   //       chainCode: result.payload.chainCode,
//   //       path: result.payload.serializedPath
//   //     }

//   //     return account
//   //   } catch (error) {
//   //     throw new Error('There was an error accessing your Trezor accounts.')
//   //   }
//   // }

//   function getPrimaryAddress() {
//     return enabled ? addresses()[0] : undefined
//   }

//   async function getMoreAccounts() {
//     const accounts = await getAccounts(true)
//     return getBalances(accounts)
//   }

//   async function getAccounts(getMore?: boolean) {
//     if (!enabled) {
//       return [undefined]
//     }

//     if (addressToPath.size > 0 && !getMore) {
//       return addresses()
//     }

//     if (dPath === '') {
//       dPath = TREZOR_DEFAULT_PATH
//     }

//     if (!account) {
//       try {
//         account = await getPublicKey()
//       } catch (error) {
//         throw error
//       }
//     }

//     const addressInfo = generateAddresses(account, addressToPath.size)

//     addressInfo.forEach(({ dPath, address }) => {
//       addressToPath.set(address, dPath)
//     })

//     return addresses()
//   }

//   function getBalances(addresses: Array<string>) {
//     return Promise.all(
//       addresses.map(
//         address =>
//           new Promise(async resolve => {
//             const balance = await getBalance(address)
//             resolve({ address, balance })
//           })
//       )
//     )
//   }

//   function getBalance(address: string) {
//     return new Promise((resolve, reject) => {
//       provider.sendAsync(
//         {
//           jsonrpc: '2.0',
//           method: 'eth_getBalance',
//           params: [address, 'latest'],
//           id: 42
//         },
//         (e: any, res: any) => {
//           e && reject(e)
//           const result = res && res.result

//           if (result != null) {
//             resolve(new BigNumber(result).toString(10))
//           } else {
//             resolve(null)
//           }
//         }
//       )
//     })
//   }

//   function trezorSignTransaction(path: string, transactionData: any) {
//     const { nonce, gasPrice, gas, to, value, data } = transactionData

//     return TrezorConnect.ethereumSignTransaction({
//       path: path,
//       transaction: {
//         nonce,
//         gasPrice,
//         gasLimit: gas,
//         to,
//         value: value || '',
//         data: data || '',
//         chainId: networkId
//       }
//     })
//   }

//   async function signTransaction(transactionData: any) {
//     if (addressToPath.size === 0) {
//       await enable()
//     }
//     const path = [...addressToPath.values()][0]
//     const { BN, toBuffer } = ethUtil
//     const common = new Common({
//       chain: customNetwork || networkName(networkId)
//     })
//     const transaction = Transaction.fromTxData(
//       {
//         ...transactionData,
//         gasLimit: transactionData.gas ?? transactionData.gasLimit
//       },
//       { common, freeze: false }
//     )
//     transaction.v = new BN(toBuffer(networkId))
//     transaction.r = transaction.s = new BN(toBuffer(0))
//     const trezorResult = await trezorSignTransaction(path, transactionData)
//     if (!trezorResult.success) {
//       throw new Error(trezorResult.payload.error)
//     }
//     let v = trezorResult.payload.v.toString(16)
//     // EIP155 support. check/recalc signature v value.
//     const rv = parseInt(v, 16)
//     let cv = networkId * 2 + 35
//     if (rv !== cv && (rv & cv) !== rv) {
//       cv += 1 // add signature v bit.
//     }
//     v = cv.toString(16)
//     transaction.v = new BN(toBuffer(`0x${v}`))
//     transaction.r = new BN(toBuffer(`${trezorResult.payload.r}`))
//     transaction.s = new BN(toBuffer(`${trezorResult.payload.s}`))
//     return `0x${transaction.serialize().toString('hex')}`
//   }

//   async function signMessage(message: { data: string }): Promise<string> {
//     if (addressToPath.size === 0) {
//       await enable()
//     }

//     const [address, path] = [...addressToPath.entries()][0]

//     return new Promise((resolve, reject) => {
//       TrezorConnect.ethereumSignMessage({
//         path,
//         message: ethUtil.stripHexPrefix(message.data),
//         hex: true
//       }).then((response: any) => {
//         if (response.success) {
//           if (response.payload.address !== ethUtil.toChecksumAddress(address)) {
//             reject(new Error('signature doesnt match the right address'))
//           }
//           const signature = `0x${response.payload.signature}`
//           resolve(signature)
//         } else {
//           reject(
//             new Error(
//               (response.payload && response.payload.error) ||
//                 'There was an error signing a message'
//             )
//           )
//         }
//       })
//     })
//   }

//   return provider
// }

