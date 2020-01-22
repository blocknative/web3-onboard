import {
  WalletConnectOptions,
  WalletModule,
  Helpers
} from '../../../interfaces'

import walletConnectIcon from '../wallet-icons/icon-wallet-connect'

function walletConnect(options: WalletConnectOptions): WalletModule {
  const { infuraKey, preferred, label, iconSrc, svg } = options

  return {
    name: label || 'WalletConnect',
    svg: svg || walletConnectIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      const { resetWalletState } = helpers

      const { default: WalletConnectProvider } = await import(
        '@walletconnect/web3-provider'
      )

      const provider = new WalletConnectProvider({
        infuraId: infuraKey
      })

      provider.autoRefreshOnNetworkChange = false

      provider.wc.on('disconnect', () => {
        resetWalletState({ disconnected: true })
      })

      return {
        provider,
        interface: {
          name: 'WalletConnect',
          connect: () =>
            new Promise((resolve, reject) => {
              provider
                .enable()
                .then(resolve)
                .catch(() =>
                  reject({
                    message:
                      'This dapp needs access to your account information.'
                  })
                )
            }),
          address: {
            onChange: func => {
              provider
                .send('eth_accounts')
                .then((accounts: string[]) => accounts[0] && func(accounts[0]))
              provider.on('accountsChanged', (accounts: string[]) =>
                func(accounts[0])
              )
            }
          },
          network: {
            onChange: func => {
              provider.send('eth_chainId').then(func)
              provider.on('chainChanged', func)
            }
          },
          balance: {
            get: () =>
              new Promise(resolve => {
                if (!provider.wc._accounts[0]) {
                  resolve(null)
                  return
                }

                provider.send('eth_getBalance', [
                  provider.wc._accounts[0],
                  'latest'
                ])
              })
          },
          disconnect: () => {
            provider.wc.killSession()
            provider.stop()
          }
        }
      }
    },
    type: 'sdk',
    desktop: true,
    preferred
  }
}

export default walletConnect
