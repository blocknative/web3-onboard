import { mobileWalletInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import imTokenIcon from '../wallet-icons/icon-imtoken'

function imtoken(
  options: CommonWalletOptions & { rpcUrl: string }
): WalletModule {
  const { preferred, label, iconSrc, svg, rpcUrl } = options

  return {
    name: label || 'imToken',
    iconSrc,
    svg: svg || imTokenIcon,
    wallet: async (helpers: Helpers) => {
      const { getProviderName } = helpers
      const imTokenProvider = (window as any).ethereum
      const isImToken = getProviderName(imTokenProvider) === 'imToken'
      let createProvider

      if (isImToken) {
        createProvider = (await import('./providerEngine')).default
      }

      const provider = rpcUrl
        ? createProvider && createProvider({ rpcUrl })
        : null

      let warned = false

      return {
        provider: imTokenProvider,
        interface:
          imTokenProvider && isImToken
            ? {
                address: {
                  get: () => Promise.resolve(imTokenProvider.selectedAddress),
                },
                network: {
                  get: () =>
                    Promise.resolve(Number(imTokenProvider.networkVersion)),
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

                    const params = {
                      jsonrpc: '2.0',
                      method: 'eth_getBalance',
                      params: [imTokenProvider.selectedAddress, 'latest'],
                      id: 42,
                    }

                    return provider.sendAsync(params)
                  },
                },
                name: getProviderName(imTokenProvider),
                connect: () => imTokenProvider.enable(),
              }
            : null,
      }
    },
    type: 'injected',
    link: `imtokenv2://navigate?screen=DappView&url=${window.location.href}`,
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred,
  }
}

export default imtoken
