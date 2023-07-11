/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { UserInfo } from '@uauth/js'
import type { UauthInitOptions } from './types.js'
import type { CoreTypes } from '@walletconnect/types'
import type { EthereumProvider } from '@walletconnect/ethereum-provider'
import type { EthereumProviderOptions } from '@walletconnect/ethereum-provider/dist/types/EthereumProvider'
import type { JQueryStyleEventEmitter } from 'rxjs/internal/observable/fromEvent'
import type {
  Chain,
  ProviderAccounts,
  WalletInit,
  EIP1193Provider
} from '@web3-onboard/common'
import { validateUauthInitOptions } from './validation.js'
import { createEIP1193Provider } from '@web3-onboard/common'

const isHexString = (value: string | number) => {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false
  }

  return true
}

function uauth(options: UauthInitOptions): WalletInit {
  return () => {
    if (options) {
      const error = validateUauthInitOptions(options)

      if (error) {
        throw error
      }
    }

    const {
      clientID,
      redirectUri,
      scope = 'openid wallet',
      shouldLoginWithRedirect,
      walletConnectProjectId,
      requiredChains,
      optionalChains,
      additionalOptionalMethods,
      handleUri
    } = options || {}

    return {
      label: 'Unstoppable',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ chains, EventEmitter, appMetadata }) => {
        const UAuth = await import('@uauth/js')
        const uauthInstance = new UAuth.default({
          clientID: clientID,
          redirectUri: redirectUri,
          scope: scope
        })

        let user: UserInfo
        try {
          user = await uauthInstance.user()
        } catch (error) {
          if (!uauthInstance.fallbackLoginOptions.scope.includes('wallet')) {
            throw new Error(
              'Must request the "wallet" scope for connector to work.'
            )
          }

          if (!uauthInstance.fallbackLoginOptions.scope.includes('openid')) {
            throw new Error(
              'Must request the "openid" scope for connector to work.'
            )
          }

          if (shouldLoginWithRedirect) {
            await uauthInstance.login()
            // NOTE: We don't want to throw because the page will take some time to
            // load the redirect page.
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            await new Promise<void>(() => {})
            // We need to throw here otherwise typescript won't know that user isn't null.
            throw new Error('Should never get here.')
          } else {
            await uauthInstance.loginWithPopup()
            user = await uauthInstance.user()
          }
        }

        if (!user.wallet_type_hint) {
          throw new Error('no wallet type hint')
        }

        // @ts-ignore
        let provider: EIP1193Provider | EthProvider

        if (['web3', 'injected'].includes(user.wallet_type_hint)) {
          provider =
            (window as any).ethereum ||
            ((window as any).web3 && (window as any).web3.currentProvider)
          provider = createEIP1193Provider(provider)
        } else if (user.wallet_type_hint === 'walletconnect') {
          // methods that require user interaction
          const methods = [
            'eth_sendTransaction',
            'eth_signTransaction',
            'personal_sign',
            'eth_sign',
            'eth_signTypedData',
            'eth_signTypedData_v4'
          ]
          const { ProviderRpcError, ProviderRpcErrorCode } = await import(
            '@web3-onboard/common'
          )

          const { default: EthereumProvider } = await import(
            '@walletconnect/ethereum-provider'
          )

          const { Subject, fromEvent } = await import('rxjs')
          const { takeUntil, take } = await import('rxjs/operators')

          const getMetaData = (): CoreTypes.Metadata | undefined => {
            if (!appMetadata) return undefined
            const wcMetaData: CoreTypes.Metadata = {
              name: appMetadata.name,
              description: appMetadata.description || '',
              url: appMetadata.explore || appMetadata.gettingStartedGuide || '',
              icons: []
            }

            if (appMetadata.icon !== undefined && appMetadata.icon.length) {
              wcMetaData.icons = [appMetadata.icon]
            }
            if (appMetadata.logo !== undefined && appMetadata.logo.length) {
              wcMetaData.icons = wcMetaData.icons.length
                ? [...wcMetaData.icons, appMetadata.logo]
                : [appMetadata.logo]
            }

            return wcMetaData
          }

          // default to mainnet
          const requiredChainsParsed: number[] =
            Array.isArray(requiredChains) &&
            requiredChains.length &&
            requiredChains.every(num => !isNaN(num))
              ? // @ts-ignore
                // Required as WC package does not support hex numbers
                requiredChains.map(chainID => parseInt(chainID))
              : [1]

          // Defaults to the chains provided within the web3-onboard init chain property
          const optionalChainsParsed: number[] =
            Array.isArray(optionalChains) &&
            optionalChains.length &&
            optionalChains.every(num => !isNaN(num))
              ? // @ts-ignore
                // Required as WC package does not support hex numbers
                optionalChains.map(chainID => parseInt(chainID))
              : chains.map(({ id }) => parseInt(id, 16))

          console.log(
            optionalChainsParsed,
            chains.map(({ id }) => parseInt(id, 16))
          )

          const optionalMethods =
            additionalOptionalMethods &&
            Array.isArray(additionalOptionalMethods)
              ? [...additionalOptionalMethods, ...methods]
              : methods

          const connector = await EthereumProvider.init({
            projectId: walletConnectProjectId,
            chains: requiredChainsParsed, // default to mainnet
            optionalChains: optionalChainsParsed,
            optionalMethods,
            showQrModal: true,
            rpcMap: chains
              .map(({ id, rpcUrl }) => ({ id, rpcUrl }))
              .reduce((rpcMap: Record<number, string>, { id, rpcUrl }) => {
                rpcMap[parseInt(id, 16)] = rpcUrl || ''
                return rpcMap
              }, {}),
            metadata: getMetaData()
          } as EthereumProviderOptions)

          const emitter = new EventEmitter()
          class EthProvider {
            public request: EIP1193Provider['request']
            public connector: InstanceType<typeof EthereumProvider>
            public chains: Chain[]
            public disconnect: EIP1193Provider['disconnect']
            // @ts-ignore
            public emit: typeof EventEmitter['emit']
            // @ts-ignore
            public on: typeof EventEmitter['on']
            // @ts-ignore
            public removeListener: typeof EventEmitter['removeListener']

            private disconnected$: InstanceType<typeof Subject>

            constructor({
              connector,
              chains
            }: {
              connector: InstanceType<typeof EthereumProvider>
              chains: Chain[]
            }) {
              this.emit = emitter.emit.bind(emitter)
              this.on = emitter.on.bind(emitter)
              this.removeListener = emitter.removeListener.bind(emitter)

              this.connector = connector
              this.chains = chains
              this.disconnected$ = new Subject()

              // listen for accountsChanged
              fromEvent(this.connector, 'accountsChanged', payload => payload)
                .pipe(takeUntil(this.disconnected$))
                .subscribe({
                  next: payload => {
                    const accounts = Array.isArray(payload)
                      ? payload
                      : [payload]
                    this.emit('accountsChanged', accounts)
                  },
                  error: console.warn
                })

              // listen for chainChanged
              fromEvent(
                this.connector as JQueryStyleEventEmitter<any, number>,
                'chainChanged',
                (payload: number) => payload
              )
                .pipe(takeUntil(this.disconnected$))
                .subscribe({
                  next: chainId => {
                    const hexChainId = isHexString(chainId)
                      ? chainId
                      : `0x${chainId.toString(16)}`
                    this.emit('chainChanged', hexChainId)
                  },
                  error: console.warn
                })

              // listen for disconnect event
              fromEvent(
                this.connector as JQueryStyleEventEmitter<any, string>,
                'session_delete',
                (payload: string) => payload
              )
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

              this.disconnect = () => {
                if (this.connector.session) this.connector.disconnect()
              }

              if (options && handleUri) {
                // listen for uri event
                fromEvent(
                  this.connector as JQueryStyleEventEmitter<any, string>,
                  'display_uri',
                  (payload: string) => payload
                )
                  .pipe(takeUntil(this.disconnected$))
                  .subscribe(async uri => {
                    try {
                      handleUri && (await handleUri(uri))
                    } catch (error) {
                      throw `An error occurred when handling the URI. Error: ${error}`
                    }
                  })
              }

              const checkForSession = () => {
                const session = this.connector.session
                if (session) {
                  this.emit('accountsChanged', this.connector.accounts)
                  this.emit('chainChanged', this.connector.chainId)
                }
              }
              checkForSession()

              this.request = async ({ method, params }) => {
                if (method === 'eth_chainId') {
                  return isHexString(this.connector.chainId)
                    ? this.connector.chainId
                    : `0x${this.connector.chainId.toString(16)}`
                }

                if (method === 'eth_requestAccounts') {
                  return new Promise<ProviderAccounts>(
                    async (resolve, reject) => {
                      // Subscribe to connection events
                      fromEvent(
                        this.connector as JQueryStyleEventEmitter<
                          any,
                          { chainId: number }
                        >,
                        'connect',
                        (payload: { chainId: number | string }) => payload
                      )
                        .pipe(take(1))
                        .subscribe({
                          next: ({ chainId }) => {
                            this.emit(
                              'accountsChanged',
                              this.connector.accounts
                            )
                            const hexChainId = isHexString(chainId)
                              ? chainId
                              : `0x${chainId.toString(16)}`
                            this.emit('chainChanged', hexChainId)
                            resolve(this.connector.accounts)
                          },
                          error: reject
                        })

                      // Check if connection is already established
                      if (!this.connector.session) {
                        // create new session
                        await this.connector.connect().catch(err => {
                          console.error('err creating new session: ', err)
                          reject(
                            new ProviderRpcError({
                              code: 4001,
                              message: 'User rejected the request.'
                            })
                          )
                        })
                      } else {
                        // update ethereum provider to load accounts & chainId
                        const accounts = this.connector.accounts
                        const chainId = this.connector.chainId
                        const hexChainId = `0x${chainId.toString(16)}`
                        this.emit('chainChanged', hexChainId)
                        return resolve(accounts)
                      }
                    }
                  )
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
                  return this.connector.request({
                    method: 'wallet_switchEthereumChain',
                    params: [
                      {
                        chainId: chainIdObj.chainId
                      }
                    ]
                  })
                }

                return this.connector.request<Promise<any>>({
                  method,
                  params
                })
              }
            }
          }

          return {
            provider: new EthProvider({ chains, connector })
          }
        }
        return {
          provider,
          instance: {
            user
          }
        }
      }
    }
  }
}

export default uauth
