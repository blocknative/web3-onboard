import WalletConnectProvider from '@walletconnect/web3-provider'

import walletConnectIcon from '../wallet-icons/icon-walletconnect.svg'
import { validateType } from '../../../validation'
import { WalletConnectOptions, WalletModule } from '../../../interfaces'

function walletConnect(options: WalletConnectOptions): WalletModule {
  validateType({
    name: 'WalletConnect Options',
    value: options,
    type: 'object'
  })

  const { infuraKey } = options

  validateType({ name: 'infuraKey', value: infuraKey, type: 'string' })

  return {
    name: 'WalletConnect',
    iconSrc: walletConnectIcon,
    wallet: () => {
      const provider = new WalletConnectProvider({
        infuraId: infuraKey
      })

      provider.autoRefreshOnNetworkChange = false

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
    mobile: true
  }
}

export default walletConnect
