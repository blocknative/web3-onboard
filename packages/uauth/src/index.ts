/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { StaticJsonRpcProvider as StaticJsonRpcProviderType } from '@ethersproject/providers'
import type { UserInfo } from '@uauth/js'
import type { UauthInitOptions } from './types.js'
import { validateUauthInitOptions } from './validation.js'
import {
  WalletInit,
  createEIP1193Provider,
  EIP1193Provider,
  Chain,
  ProviderAccounts
} from '@web3-onboard/common'

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
      bridge = 'https://derelay.rabby.io',
      qrcodeModalOptions,
      connectFirstChainId
    } = options || {}

    return {
      label: 'Unstoppable',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ chains, EventEmitter }) => {
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
          const { StaticJsonRpcProvider } = await import(
            '@ethersproject/providers'
          )

          const { ProviderRpcError, ProviderRpcErrorCode } = await import(
            '@web3-onboard/common'
          )

          const { default: WalletConnect } = await import(
            '@walletconnect/client'
          )

          // This is a cjs module and therefor depending on build tooling
          // sometimes it will be nested in the { default } object and
          // other times it will be the actual import
          let QRCodeModal = (await import('@walletconnect/qrcode-modal'))
            .default

          // @ts-ignore - TS thinks that there is no default property on the `QRCodeModal` but sometimes there is
          QRCodeModal = QRCodeModal.default || QRCodeModal

          const { Subject, fromEvent } = await import('rxjs')
          const { takeUntil, take } = await import('rxjs/operators')

          const connector = new WalletConnect({
            bridge
          })

          const emitter = new EventEmitter()

          class EthProvider {
            public request: EIP1193Provider['request']
            public connector: InstanceType<typeof WalletConnect>
            public chains: Chain[]
            public disconnect: EIP1193Provider['disconnect']
            // @ts-ignore
            public emit: typeof EventEmitter['emit']
            // @ts-ignore
            public on: typeof EventEmitter['on']
            // @ts-ignore
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

              // @ts-ignore listen for session updates
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

              // @ts-ignore listen for disconnect event
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
                      // create new session
                      this.connector
                        .createSession(
                          connectFirstChainId
                            ? { chainId: parseInt(chains[0].id, 16) }
                            : undefined
                        )
                        .then(() => {
                          QRCodeModal.open(
                            this.connector.uri,
                            () =>
                              reject(
                                new ProviderRpcError({
                                  code: 4001,
                                  message: 'User rejected the request.'
                                })
                              ),
                            qrcodeModalOptions
                          )
                        })
                    } else {
                      const { accounts, chainId } = this.connector.session
                      const hexChainId = isHexString(chainId)
                        ? chainId
                        : `0x${chainId.toString(16)}`
                      this.emit('chainChanged', hexChainId)
                      return resolve(accounts)
                    }

                    // @ts-ignore Subscribe to connection events
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
                          QRCodeModal.close()
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
                  return this.connector.updateSession({
                    chainId: chainIdObj.chainId,
                    accounts: this.connector.accounts
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
          provider = new EthProvider({ chains, connector })
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
