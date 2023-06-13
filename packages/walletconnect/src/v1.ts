import type { StaticJsonRpcProvider as StaticJsonRpcProviderType } from '@ethersproject/providers'
import type {
  Chain,
  ProviderAccounts,
  WalletInit,
  EIP1193Provider,
  ChainId,
  AccountAddress
} from '@web3-onboard/common'
import { isHexString, WalletConnectOptions } from './index.js'

function walletConnect(
  options: WalletConnectOptions = { version: 1 }
): WalletInit {
  const {
    bridge = 'https://derelay.rabby.io',
    qrcodeModalOptions,
    connectFirstChainId,
    handleUri
  } = options || {}

  return () => {
    return {
      label: 'WalletConnect',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ chains, EventEmitter }) => {
        const { StaticJsonRpcProvider } = await import(
          '@ethersproject/providers'
        )

        const { ProviderRpcError, ProviderRpcErrorCode } = await import(
          '@web3-onboard/common'
        )

        const { default: WalletConnect } = await import('@walletconnect/client')

        // This is a cjs module and therefor depending on build tooling
        // sometimes it will be nested in the { default } object and
        // other times it will be the actual import
        // @ts-ignore - It thinks it is missing properties since it expect it to be nested under default
        let QRCodeModal: typeof import('@walletconnect/qrcode-modal').default =
          await import('@walletconnect/qrcode-modal')

        // @ts-ignore - TS thinks that there is no default property on the `QRCodeModal` but sometimes there is
        QRCodeModal = QRCodeModal.default || QRCodeModal

        const { Subject, fromEvent } = await import('rxjs')
        const { takeUntil, take } = await import('rxjs/operators')

        const connector = new WalletConnect({
          bridge
        })

        if (handleUri) {
          try {
            await handleUri(connector.uri || '')
          } catch (error) {
            throw `An error occurred when handling the URI. Error: ${error}`
          }
        }

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
            let activeChain: ChainId

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
                  const lowerCaseAccounts = accounts.map(
                    (accountAddress: AccountAddress) =>
                      accountAddress.toLowerCase()
                  )
                  this.emit('accountsChanged', lowerCaseAccounts)
                  const hexChainId = isHexString(chainId)
                    ? chainId
                    : `0x${chainId.toString(16)}`
                  if (!activeChain || activeChain !== hexChainId) {
                    this.emit('chainChanged', hexChainId)
                    activeChain = hexChainId
                  }
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
                        const lowerCaseAccounts = accounts.map(
                          (accountAddress: AccountAddress) =>
                            accountAddress.toLowerCase()
                        )
                        this.emit('accountsChanged', lowerCaseAccounts)
                        const hexChainId = isHexString(chainId)
                          ? chainId
                          : `0x${chainId.toString(16)}`
                        if (!activeChain) activeChain = hexChainId
                        this.emit('chainChanged', hexChainId)
                        QRCodeModal.close()
                        resolve(lowerCaseAccounts)
                      },
                      error: reject
                    })

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
                    if (!activeChain) activeChain = hexChainId as ChainId
                    const lowerCaseAccounts = accounts.map(
                      (accountAddress: AccountAddress) =>
                        accountAddress.toLowerCase()
                    )
                    return resolve(lowerCaseAccounts)
                  }
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

export default walletConnect
