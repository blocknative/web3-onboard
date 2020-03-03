import {
  WalletLinkOptions,
  WalletModule,
  CommonWalletOptions,
  Helpers
} from '../../../interfaces'

import coinbaseIcon from '../wallet-icons/icon-coinbase'

function walletLink(
  options: WalletLinkOptions & CommonWalletOptions
): WalletModule {
  const {
    rpcUrl,
    appName,
    appLogoUrl,
    networkId,
    preferred,
    label,
    iconSrc,
    svg
  } = options

  return {
    name: label || 'WalletLink',
    svg: svg || coinbaseIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      const { getBalance, getAddress, resetWalletState } = helpers

      const { default: WalletLink } = await import('walletlink')

      const instance = new WalletLink({
        appName,
        appLogoUrl
      })

      const provider = instance.makeWeb3Provider(rpcUrl, networkId)

      // provider.on('disconnect', () => {
      //   console.log('DISCONNECTED')
      //   resetWalletState({ disconnected: true, walletName: 'WalletLink' })
      // })

      return {
        provider,
        interface: {
          name: 'WalletConnect',
          connect: () =>
            new Promise((resolve, reject) => {
              provider
                .enable()
                .then((res: any) => resolve(res))
                .catch(() =>
                  reject({
                    message:
                      'This dapp needs access to your account information.'
                  })
                )
            }),
          disconnect: () => {
            provider.disconnect()
          },
          address: {
            onChange: func => {
              getAddress(provider).then(func)
              provider.on('accountsChanged', (accounts: string[]) =>
                func(accounts[0])
              )
            }
          },
          network: {
            onChange: func => {
              func(networkId)
              provider.on('chainChanged', func)
            }
          },
          balance: {
            get: () => getBalance(provider)
          }
        }
      }
    },
    type: 'sdk',
    desktop: true,
    preferred
  }
}

export default walletLink
