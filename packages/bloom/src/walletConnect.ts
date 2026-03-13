import type { EthereumProviderOptions } from '@walletconnect/ethereum-provider/dist/types/EthereumProvider'
import type { JQueryStyleEventEmitter } from 'rxjs/internal/observable/fromEvent'
import type { WalletConnectOptions } from './types.js'
import type {
  Chain,
  ProviderAccounts,
  WalletInit,
  EIP1193Provider
} from '@web3-onboard/common'
import { createDownloadMessage } from '@web3-onboard/common'
import { buildWCChains, buildWCMethods, getMetaData } from './utils.js'

// methods that require user interaction
const methods = [
  'eth_sendTransaction',
  'eth_signTransaction',
  'personal_sign',
  'eth_sign',
  'eth_signTypedData',
  'eth_signTypedData_v4',
  'wallet_addEthereumChain',
  'wallet_switchEthereumChain'
]

declare type ArrayOneOrMore<T> = {
  0: T
} & Array<T>

function walletConnect(
  wallet: {
    name: string,
    protocol: string,
    downloadLink: string,
  },
  options: WalletConnectOptions
): WalletInit {
  if (!options.dappUrl) {
    console.warn(
      `It is strongly recommended to supply a dappUrl to the WalletConnect init object as it is required by some wallets (i.e. MetaMask) to allow connection.`
    )
  }
  const { qrModalOptions, handleUri } = options

  let instance: unknown

  return () => {
    return {
      label: wallet.name,
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ chains, EventEmitter, appMetadata }) => {

        // Check if the wallet can be opened by a deeplink like protocol://XYZ
        const isInstalled = checkIfProtocolIsSupported(wallet.protocol)
        if (!isInstalled) {
            throw new Error(createDownloadMessage(wallet.name, wallet.downloadLink))
        }

        const { ProviderRpcError, ProviderRpcErrorCode } = await import(
          '@web3-onboard/common'
        )

        const { default: EthereumProvider, REQUIRED_METHODS } = await import(
          '@walletconnect/ethereum-provider'
        )

        const { Subject, fromEvent } = await import('rxjs')
        const { takeUntil, take } = await import('rxjs/operators')

        const { requiredChains, optionalChains } = buildWCChains(
          options.requiredChains ?? [],
          options.optionalChains ?? [],
          chains
        )
        const { requiredMethods, optionalMethods } = buildWCMethods(
          options.additionalRequiredMethods ?? [],
          options.additionalOptionalMethods ?? [],
          REQUIRED_METHODS,
          methods
        )

        const connector = await EthereumProvider.init({
          projectId: options.projectId,
          chains: requiredChains,
          methods: requiredMethods,
          optionalChains: optionalChains as unknown as ArrayOneOrMore<number>,
          optionalMethods,
          showQrModal: !options.handleUri,
          qrModalOptions: qrModalOptions,
          rpcMap: chains
            .map(({ id, rpcUrl }) => ({ id, rpcUrl }))
            .reduce((rpcMap: Record<number, string>, { id, rpcUrl }) => {
              rpcMap[parseInt(id, 16)] = rpcUrl || ''
              return rpcMap
            }, {}),
          metadata: getMetaData(appMetadata)
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
                  const accounts = Array.isArray(payload) ? payload : [payload]
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
              if (this.connector.session) {
                this.connector.disconnect()
                instance = null
              }
            }

            if (options?.handleUri) {
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
              instance = session
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
                          this.emit('accountsChanged', this.connector.accounts)
                          const hexChainId = isHexString(chainId)
                            ? chainId
                            : `0x${chainId.toString(16)}`
                          this.emit('chainChanged', hexChainId)
                          resolve(this.connector.accounts as ProviderAccounts)
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
                      instance = this.connector.session
                      const hexChainId = `0x${chainId.toString(16)}`
                      this.emit('chainChanged', hexChainId)
                      return resolve(accounts as ProviderAccounts)
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
          provider: new EthProvider({ chains, connector }),
          instance
        }
      }
    }
  }
}

const isHexString = (value: string | number) => {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false
  }

  return true
}

// This is a workaround to determine if a protocol is supported by the users device
// This doesn't work for Linux devices, as for that not error are thrown when the protocol is not supported
function checkIfProtocolIsSupported(protocol: string) {
    let iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    if (!iframe.contentWindow) {
        return false;
    }
    try {
        iframe.contentWindow.location.href = protocol + '://';
        return true;
    } catch(e) {
        return false;
    } finally {
        document.body.removeChild(iframe);
    }
}

export default walletConnect
