import type { WalletInit } from '@web3-onboard/common'
import v1 from './v1.js'
import v2 from './v2.js'

export type LedgerOptionsWCv1 = {
  /**
   * @deprecated
   * Version 1 of WalletConnect has been deprecated by the WC team and the WC bridge is not available.
   * To use version 1 a custom bridge url will need to be provided.
   * Support will be completely remove from Web3-Onboard in the future
   */
  walletConnectVersion?: 1
  enableDebugLogs?: boolean
  chainId?: number
  bridge?: string
  infuraId?: string
  rpc?: { [chainId: number]: string }
}

export type LedgerOptionsWCv2 = {
  walletConnectVersion: 2
  enableDebugLogs?: boolean
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: string
  /**
   * List of Optional Chain(s) ID for wallets to support in number format (integer or hex)
   * Defaults to the chains provided within the web3-onboard init chain property
   */
  requiredChains?: string[] | number[]
  requiredMethods?: string[]
  /**
   * Additional methods to be added to the default list of ['eth_sendTransaction',  'eth_signTransaction',  'personal_sign',  'eth_sign',  'eth_signTypedData',  'eth_signTypedData_v4']
   * Passed methods to be included along with the defaults methods - see https://docs.walletconnect.com/2.0/web/walletConnectModal/options
   */
  optionalMethods?: string[]
  requiredEvents?: string[]
  optionalEvents?: string[]
}

export type LedgerOptions = LedgerOptionsWCv1 | LedgerOptionsWCv2

export const isHexString = (value: string | number) => {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false
  }

  return true
}

function ledger(options?: LedgerOptions): WalletInit {
// <<<<<<< HEAD
//   return () => {
//     return {
//       label: 'Ledger',
//       getIcon: async () => (await import('./icon.js')).default,
//       getInterface: async ({ chains, EventEmitter }: GetInterfaceHelpers) => {
//         const {
//           loadConnectKit,
//           SupportedProviders,
//           SupportedProviderImplementations
//         } = await import('@ledgerhq/connect-kit-loader')

//         const connectKit = await loadConnectKit()
//         connectKit.enableDebugLogs()
//         const checkSupportResult = connectKit.checkSupport({
//           providerType: SupportedProviders.Ethereum,
//           chainId: options?.chainId,
//           infuraId: options?.infuraId,
//           rpc: options?.rpc
//         })

//         // get the Ledger provider instance, it can be either Ledger Connect
//         // or WalletConnect
//         const instance = (await connectKit.getProvider()) as EthereumProvider

//         // return the Ledger Connect provider
//         if (
//           checkSupportResult.providerImplementation ===
//           SupportedProviderImplementations.LedgerConnect
//         ) {
//           return {
//             provider: instance as EIP1193Provider
//           }
//         }

//         // fallback to WalletConnect on unsupported platforms
//         const { StaticJsonRpcProvider } = await import(
//           '@ethersproject/providers'
//         )
//         const { ProviderRpcError, ProviderRpcErrorCode } = await import(
//           '@web3-onboard/common'
//         )
//         const { default: WalletConnect } = await import('@walletconnect/client')
//         const { Subject, fromEvent } = await import('rxjs')
//         const { takeUntil, take } = await import('rxjs/operators')
//         const connector = instance.connector as WalletConnect
//         const emitter = new EventEmitter()

//         class EthProvider {
//           public request: EIP1193Provider['request']
//           public connector: InstanceType<typeof WalletConnect>
//           public chains: Chain[]
//           public disconnect: EIP1193Provider['disconnect']
//           public emit: typeof EventEmitter['emit']
//           public on: typeof EventEmitter['on']
//           public removeListener: typeof EventEmitter['removeListener']

//           private disconnected$: InstanceType<typeof Subject>
//           private providers: Record<string, StaticJsonRpcProviderType>

//           constructor({
//             connector,
//             chains
//           }: {
//             connector: InstanceType<typeof WalletConnect>
//             chains: Chain[]
//           }) {
//             this.emit = emitter.emit.bind(emitter)
//             this.on = emitter.on.bind(emitter)
//             this.removeListener = emitter.removeListener.bind(emitter)
//             this.connector = connector
//             this.chains = chains
//             this.disconnected$ = new Subject()
//             this.providers = {}

//             // listen for session updates
//             fromEvent(this.connector, 'session_update', (error, payload) => {
//               if (error) {
//                 throw error
//               }

//               return payload
//             })
//               .pipe(takeUntil(this.disconnected$))
//               .subscribe({
//                 next: ({ params }) => {
//                   const [{ accounts, chainId }] = params
//                   this.emit('accountsChanged', accounts)
//                   const hexChainId = isHexString(chainId)
//                     ? chainId
//                     : `0x${chainId.toString(16)}`
//                   this.emit('chainChanged', hexChainId)
//                 },
//                 error: console.warn
//               })

//             // listen for disconnect event
//             fromEvent(this.connector, 'disconnect', (error, payload) => {
//               if (error) {
//                 throw error
//               }

//               return payload
//             })
//               .pipe(takeUntil(this.disconnected$))
//               .subscribe({
//                 next: () => {
//                   this.emit('accountsChanged', [])
//                   this.disconnected$.next(true)
//                   typeof localStorage !== 'undefined' &&
//                     localStorage.removeItem('walletconnect')
//                 },
//                 error: console.warn
//               })

//             this.disconnect = () => this.connector.killSession()

//             this.request = async ({ method, params }) => {
//               if (method === 'eth_chainId') {
//                 return isHexString(this.connector.chainId)
//                   ? this.connector.chainId
//                   : `0x${this.connector.chainId.toString(16)}`
//               }

//               if (method === 'eth_requestAccounts') {
//                 return new Promise<ProviderAccounts>((resolve, reject) => {
//                   // Check if connection is already established
//                   if (!this.connector.connected) {
//                     resolve((instance as any).request({ method }))
//                   } else {
//                     const { accounts, chainId } = this.connector.session

//                     const hexChainId = isHexString(chainId)
//                       ? chainId
//                       : `0x${chainId.toString(16)}`

//                     this.emit('chainChanged', hexChainId)
//                     return resolve(accounts as ProviderAccounts)
//                   }

//                   // Subscribe to connection events
//                   fromEvent(this.connector, 'connect', (error, payload) => {
//                     if (error) {
//                       throw error
//                     }

//                     return payload
//                   })
//                     .pipe(take(1))
//                     .subscribe({
//                       next: ({ params }) => {
//                         const [{ accounts, chainId }] = params
//                         this.emit('accountsChanged', accounts)

//                         const hexChainId = isHexString(chainId)
//                           ? chainId
//                           : `0x${chainId.toString(16)}`
//                         this.emit('chainChanged', hexChainId)
//                         resolve(accounts)
//                       },
//                       error: reject
//                     })
//                 })
//               }

//               if (method === 'eth_selectAccounts') {
//                 throw new ProviderRpcError({
//                   code: ProviderRpcErrorCode.UNSUPPORTED_METHOD,
//                   message: `The Provider does not support the requested method: ${method}`
//                 })
//               }

//               if (method == 'wallet_switchEthereumChain') {
//                 throw new ProviderRpcError({
//                   code: ProviderRpcErrorCode.UNSUPPORTED_METHOD,
//                   message: `The Provider does not support the requested method: ${method}`
//                 })
//               }

//               // @ts-ignore
//               if (method === 'eth_sendTransaction') {
//                 // @ts-ignore
//                 return this.connector.sendTransaction(params[0])
//               }

//               // @ts-ignore
//               if (method === 'eth_signTransaction') {
//                 // @ts-ignore
//                 return this.connector.signTransaction(params[0])
//               }

//               // @ts-ignore
//               if (method === 'personal_sign') {
//                 // @ts-ignore
//                 return this.connector.signPersonalMessage(params)
//               }

//               // @ts-ignore
//               if (method === 'eth_sign') {
//                 // @ts-ignore
//                 return this.connector.signMessage(params)
//               }

//               // @ts-ignore
//               if (method.includes('eth_signTypedData')) {
//                 // @ts-ignore
//                 return this.connector.signTypedData(params)
//               }

//               if (method === 'eth_accounts') {
//                 return this.connector.sendCustomRequest({
//                   id: 1337,
//                   jsonrpc: '2.0',
//                   method,
//                   params
//                 })
//               }

//               const chainId = await this.request({ method: 'eth_chainId' })

//               if (!this.providers[chainId]) {
//                 const currentChain = chains.find(({ id }) => id === chainId)

//                 if (!currentChain) {
//                   throw new ProviderRpcError({
//                     code: ProviderRpcErrorCode.CHAIN_NOT_ADDED,
//                     message: `The Provider does not have a rpcUrl to make a request for the requested method: ${method}`
//                   })
//                 }

//                 this.providers[chainId] = new StaticJsonRpcProvider(
//                   currentChain.rpcUrl
//                 )
//               }

//               return this.providers[chainId].send(
//                 method,
//                 // @ts-ignore
//                 params
//               )
//             }
//           }
//         }

//         return {
//           provider: new EthProvider({ chains, connector })
//         }
//       }
//     }
//   }

  const walletConnectVersion = options?.walletConnectVersion || 2
  return walletConnectVersion === 1
    ? v1(options as LedgerOptionsWCv1)
    : v2(options as LedgerOptionsWCv2)
}

export default ledger
