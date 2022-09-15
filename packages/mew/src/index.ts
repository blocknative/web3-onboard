import type { WalletInit, EIP1193Provider } from '@web3-onboard/common'

function mew(): WalletInit {
  return () => {
    return {
      label: 'MEW Wallet',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ chains, EventEmitter }) => {
        const {
          createEIP1193Provider,
          ProviderRpcError,
          ProviderRpcErrorCode
        } = await import('@web3-onboard/common')

        const { firstValueFrom, fromEvent } = await import('rxjs')
        const { map, take } = await import('rxjs/operators')

        const { default: MEWWallet } = await import(
          '@myetherwallet/mewconnect-web-client'
        )

        const [chain] = chains
        const mewConnect = new MEWWallet.Provider({
          windowClosedError: true,
          chainId: parseInt(chain.id),
          rpcUrl: chain.rpcUrl
        })

        const disconnected$ = fromEvent(mewConnect, 'disconnect')

        const mewProvider: EIP1193Provider = mewConnect.makeWeb3Provider()
        const provider = createEIP1193Provider(mewProvider, {
          eth_requestAccounts: ({ baseRequest }) => {
            const closed$ = fromEvent(mewConnect, 'popupWindowClosed').pipe(
              map(() => {
                throw new ProviderRpcError({
                  code: ProviderRpcErrorCode.ACCOUNT_ACCESS_REJECTED,
                  message: 'Popup window closed'
                })
              }),
              take(1)
            )

            return Promise.race([
              baseRequest({ method: 'eth_requestAccounts' }),
              firstValueFrom(closed$)
            ])
          },
          eth_selectAccounts: null,
          wallet_addEthereumChain: null,
          wallet_switchEthereumChain: null
        })

        const events = new EventEmitter()

        disconnected$.pipe(take(1)).subscribe(() => {
          events.emit('accountsChanged', [])
        })

        provider.disconnect = () => mewConnect.disconnect()
        provider.on = events.on.bind(events)

        return {
          provider
        }
      }
    }
  }
}

export default mew
