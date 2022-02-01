import {
  createEIP1193Provider,
  ProviderRpcErrorCode,
  ProviderRpcError
} from '@bn-onboard/common'
import { EIP1193Provider, WalletInit } from '@bn-onboard/common'
import { firstValueFrom, fromEvent, map, take } from 'rxjs'

function mew(): WalletInit {
  return () => {
    return {
      label: 'MEW Wallet',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ chains, EventEmitter }) => {
        const [chain] = chains
        const { default: MEWWallet } = await import(
          '@myetherwallet/mewconnect-web-client'
        )

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
          eth_selectAccounts: null
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
