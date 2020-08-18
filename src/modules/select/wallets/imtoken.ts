import { mobileWalletInstallMessage } from '../content'
import {
  WalletModule,
  Helpers,
  InjectedWithBalanceOptions
} from '../../../interfaces'

import imTokenIcon from '../wallet-icons/icon-imtoken'

function imtoken(options: InjectedWithBalanceOptions): WalletModule {
  const { preferred, label, iconSrc, svg, rpcUrl } = options

  return {
    name: label || 'imToken',
    iconSrc,
    svg: svg || imTokenIcon,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, getBalance } = helpers
      const imTokenProvider = (window as any).ethereum
      const isImToken = getProviderName(imTokenProvider) === 'imToken'
      let createProvider

      if (isImToken && rpcUrl) {
        createProvider = (await import('./providerEngine')).default
      }

      const provider = createProvider ? createProvider({ rpcUrl }) : null

      let warned = false

      return {
        provider: imTokenProvider,
        interface: isImToken
          ? {
              address: {
                get: () => Promise.resolve(imTokenProvider.selectedAddress)
              },
              network: {
                get: () =>
                  Promise.resolve(Number(imTokenProvider.networkVersion))
              },
              balance: {
                get: () => {
                  if (!provider) {
                    if (!warned) {
                      console.warn(
                        'The imToken provider does not allow rpc calls preventing Onboard.js from getting the balance. You can pass in a "rpcUrl" to the imToken wallet initialization object to get the balance.'
                      )
                      warned = true
                    }

                    return Promise.resolve(null)
                  }

                  return getBalance(provider, imTokenProvider.selectedAddress)
                }
              },
              name: getProviderName(imTokenProvider),
              connect: () => imTokenProvider.enable()
            }
          : null
      }
    },
    type: 'injected',
    link: `imtokenv2://navigate?screen=DappView&url=${window.location.href}`,
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred
  }
}

export default imtoken
