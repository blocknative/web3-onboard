import {
  WalletConnectOptions,
  WalletModule,
  Helpers
} from '../../../interfaces'

import walletConnectIcon from '../wallet-icons/icon-wallet-connect'

import { get } from 'svelte/store'

import {
  app,
} from '../../../stores'

function walletConnect(
  options: WalletConnectOptions & { networkId: number }
): WalletModule {
  const {
    infuraKey,
    rpc,
    bridge,
    preferred,
    label,
    iconSrc,
    svg,
    networkId
  } = options

  const pollingInterval = get(app).blockPollingInterval

  if (!infuraKey) {
    if (!rpc || !rpc[networkId]) {
      throw new Error(
        `A "infuraKey" or a "rpc" object with a parameter of ${networkId} must be included in the WalletConnect initialization object`
      )
    }
  }

  return {
    name: label || 'WalletConnect',
    svg: svg || walletConnectIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      const createProvider = (await import('./providerEngine')).default
      const { default: WalletConnectProvider } = await import(
        '@walletconnect/web3-provider'
      )

      const { resetWalletState, networkName, getBalance } = helpers

      const rpcUrl =
        rpc && rpc[networkId]
          ? rpc[networkId]
          : `https://${networkName(networkId)}.infura.io/v3/${infuraKey}`

      const balanceProvider = createProvider({ rpcUrl })

      const provider = new WalletConnectProvider({
        infuraId: infuraKey,
        rpc,
        bridge,
        pollingInterval
      })

      provider.autoRefreshOnNetworkChange = false

      provider.wc.on('disconnect', () => {
        resetWalletState({ disconnected: true, walletName: 'WalletConnect' })
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
            get: async () => {
              if (!provider.wc._accounts[0]) {
                return null
              }

              return getBalance(balanceProvider, provider.wc._accounts[0])
            }
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
    mobile: true,
    preferred
  }
}

export default walletConnect
