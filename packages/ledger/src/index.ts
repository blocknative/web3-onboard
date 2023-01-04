import {
  Chain,
  WalletInit,
  GetInterfaceHelpers,
  EIP1193Provider,
  ProviderAccounts
} from '@web3-onboard/common'
import type { EthereumProvider } from '@ledgerhq/connect-kit-loader'
import type { StaticJsonRpcProvider as StaticJsonRpcProviderType } from '@ethersproject/providers'
import WalletConnect from '@walletconnect/client'

const isHexString = (value: string | number) => {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false
  }

  return true
}

interface LedgerOptions {
  chainId?: number
  bridge?: string
  infuraId?: string
  rpc?: { [chainId: number]: string }
}

function ledger(options?: LedgerOptions): WalletInit {
  return () => {
    return {
      label: 'Ledger',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ chains, EventEmitter }: GetInterfaceHelpers) => {
        const {
          loadConnectKit,
          SupportedProviders,
          SupportedProviderImplementations
        } = await import('@ledgerhq/connect-kit-loader')

        const connectKit = await loadConnectKit()
        connectKit.enableDebugLogs()
        const checkSupportResult = connectKit.checkSupport({
          providerType: SupportedProviders.Ethereum,
          chainId: options?.chainId,
          infuraId: options?.infuraId,
          rpc: options?.rpc
        })

        // get the Ledger provider instance, it can be either Ledger Connect
        // or WalletConnect
        const instance = (await connectKit.getProvider()) as EthereumProvider

        // return the Ledger Connect provider
        if (
          checkSupportResult.providerImplementation ===
          SupportedProviderImplementations.LedgerConnect
        ) {
          return {
            provider: instance as EIP1193Provider
          }
        }

        // fallback to WalletConnect on unsupported platforms
        const { StaticJsonRpcProvider } = await import(
          '@ethersproject/providers'
        )
        const { ProviderRpcError, ProviderRpcErrorCode } = await import(
          '@web3-onboard/common'
        )
        const { default: WalletConnect } = await import('@walletconnect/client')
        const { Subject, fromEvent } = await import('rxjs')
        const { takeUntil, take } = await import('rxjs/operators')
        const connector = instance.connector as WalletConnect
        const emitter = new EventEmitter()

        class EthProvider {
          public request: EIP1193Provider['request']
          public connector: InstanceType<typeof WalletConnect>
          public chains: Chain[]
          public disconnect: EIP1193Provider['disconnect']
          public emit: typeof EventEmitter['emit']
          public on: typeof EventEmitter['on']
          public removeListener: typeof EventEmitter['removeListener']

          private disconnected$: InstanceType<typeof Subject>
          private providers: Record<string, StaticJsonRpcProviderType>

          constructor({
            connector,
            chains
          }: {
            connector: InstanceType<typeof WalletConnect>
            chains: Chain[]
          }) {
            this.emit = emitter.emit.bind(emitter)
            this.on = emitter.on.bind(emitter)
            this.removeListener = emitter.removeListener.bind(emitter)
            this.connector = connector
            this.chains = chains
            this.disconnected$ = new Subject()
            this.providers = {}

            // listen for session updates
            fromEvent(this.connector, 'session_update', (error, payload) => {
              if (error) {
                throw error
              }

              return payload
            })
              .pipe(takeUntil(this.disconnected$))
              .subscribe({
                next: ({ params }) => {
                  const [{ accounts, chainId }] = params
                  this.emit('accountsChanged', accounts)
                  const hexChainId = isHexString(chainId)
                    ? chainId
                    : `0x${chainId.toString(16)}`
                  this.emit('chainChanged', hexChainId)
                },
                error: console.warn
              })

            // listen for disconnect event
            fromEvent(this.connector, 'disconnect', (error, payload) => {
              if (error) {
                throw error
              }

              return payload
            })
              .pipe(takeUntil(this.disconnected$))
              .subscribe({
                next: () => {
                  this.emit('accountsChanged', [])
                  this.disconnected$.next(true)
                  typeof localStorage !== 'undefined' &&
                    localStorage.removeItem('walletconnect')
                },
                error: console.warn
              })

            this.disconnect = () => this.connector.killSession()

            this.request = async ({ method, params }) => {
              if (method === 'eth_chainId') {
                return isHexString(this.connector.chainId)
                  ? this.connector.chainId
                  : `0x${this.connector.chainId.toString(16)}`
              }

              if (method === 'eth_requestAccounts') {
                return new Promise<ProviderAccounts>((resolve, reject) => {
                  // Check if connection is already established
                  if (!this.connector.connected) {
                    resolve((instance as any).request({ method }))
                  } else {
                    const { accounts, chainId } = this.connector.session

                    const hexChainId = isHexString(chainId)
                      ? chainId
                      : `0x${chainId.toString(16)}`

                    this.emit('chainChanged', hexChainId)
                    return resolve(accounts)
                  }

                  // Subscribe to connection events
                  fromEvent(this.connector, 'connect', (error, payload) => {
                    if (error) {
                      throw error
                    }

                    return payload
                  })
                    .pipe(take(1))
                    .subscribe({
                      next: ({ params }) => {
                        const [{ accounts, chainId }] = params
                        this.emit('accountsChanged', accounts)

                        const hexChainId = isHexString(chainId)
                          ? chainId
                          : `0x${chainId.toString(16)}`

                        this.emit('chainChanged', hexChainId)
                        resolve(accounts)
                      },
                      error: reject
                    })
                })
              }

              if (method === 'eth_selectAccounts') {
                throw new ProviderRpcError({
                  code: ProviderRpcErrorCode.UNSUPPORTED_METHOD,
                  message: `The Provider does not support the requested method: ${method}`
                })
              }

              if (method == 'wallet_switchEthereumChain') {
                if (!params) {
                  throw new ProviderRpcError({
                    code: ProviderRpcErrorCode.INVALID_PARAMS,
                    message: `The Provider requires a chainId to be passed in as an argument`
                  })
                }
                const chainIdObj = params[0] as { chainId?: number }
                if (
                  !chainIdObj.hasOwnProperty('chainId') ||
                  typeof chainIdObj['chainId'] === 'undefined'
                ) {
                  throw new ProviderRpcError({
                    code: ProviderRpcErrorCode.INVALID_PARAMS,
                    message: `The Provider requires a chainId to be passed in as an argument`
                  })
                }

                return this.connector.sendCustomRequest({
                  method: 'wallet_switchEthereumChain',
                  params: [
                    {
                      chainId: chainIdObj.chainId
                    }
                  ]
                })
              }

              // @ts-ignore
              if (method === 'eth_sendTransaction') {
                // @ts-ignore
                return this.connector.sendTransaction(params[0])
              }

              // @ts-ignore
              if (method === 'eth_signTransaction') {
                // @ts-ignore
                return this.connector.signTransaction(params[0])
              }

              // @ts-ignore
              if (method === 'personal_sign') {
                // @ts-ignore
                return this.connector.signPersonalMessage(params)
              }

              // @ts-ignore
              if (method === 'eth_sign') {
                // @ts-ignore
                return this.connector.signMessage(params)
              }

              // @ts-ignore
              if (method.includes('eth_signTypedData')) {
                // @ts-ignore
                return this.connector.signTypedData(params)
              }

              if (method === 'eth_accounts') {
                return this.connector.sendCustomRequest({
                  id: 1337,
                  jsonrpc: '2.0',
                  method,
                  params
                })
              }

              const chainId = await this.request({ method: 'eth_chainId' })

              if (!this.providers[chainId]) {
                const currentChain = chains.find(({ id }) => id === chainId)

                if (!currentChain) {
                  throw new ProviderRpcError({
                    code: ProviderRpcErrorCode.CHAIN_NOT_ADDED,
                    message: `The Provider does not have a rpcUrl to make a request for the requested method: ${method}`
                  })
                }

                this.providers[chainId] = new StaticJsonRpcProvider(
                  currentChain.rpcUrl
                )
              }

              return this.providers[chainId].send(
                method,
                // @ts-ignore
                params
              )
            }
          }
        }

        return {
          provider: new EthProvider({ chains, connector })
        }
      }
    }
  }
}

export default ledger
