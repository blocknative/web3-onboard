import walletConnectIcon from '../wallet-icons/icon-walletconnect.svg'
import { validateType } from '../../../validation'
import { WalletConnectOptions, WalletModule } from '../../../interfaces'

function walletConnect(options: WalletConnectOptions): WalletModule {
  validateType({
    name: 'WalletConnect Options',
    value: options,
    type: 'object'
  })

  const { infuraKey, preferred } = options

  validateType({ name: 'infuraKey', value: infuraKey, type: 'string' })
  validateType({
    name: 'preferred',
    value: preferred,
    type: 'boolean',
    optional: true
  })

  let provider: any

  return {
    name: 'WalletConnect',
    iconSrc: walletConnectIcon,
    wallet: async () => {
      if (!provider) {
        const { default: WalletConnectProvider } = await import(
          '@walletconnect/web3-provider'
        )
        const provider = new WalletConnectProvider({
          infuraId: infuraKey
        })

        provider.autoRefreshOnNetworkChange = false
      }

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
          disconnect: () => provider.close(),
          address: {
            onChange: func => {
              provider
                .send('eth_accounts')
                .then((accounts: string[]) => func(accounts[0]))
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
          }
        }
      }
    },
    desktop: true,
    preferred
  }
}

export default walletConnect
