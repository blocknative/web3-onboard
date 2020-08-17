import { mobileWalletInstallMessage } from '../content'
import {
  WalletModule,
  Helpers,
  InjectedWithBalanceOptions
} from '../../../interfaces'

import trustIcon from '../wallet-icons/icon-trust'

function trust(options: InjectedWithBalanceOptions): WalletModule {
  const { preferred, label, iconSrc, svg, rpcUrl } = options

  return {
    name: label || 'Trust',
    svg: svg || trustIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, getAddress, getNetwork, getBalance } = helpers
      const trustProvider =
        (window as any).web3 && (window as any).web3.currentProvider

      const isTrust = getProviderName(trustProvider) === 'Trust'
      let createProvider

      if (isTrust && rpcUrl) {
        createProvider = (await import('./providerEngine')).default
      }

      const provider = createProvider ? createProvider({ rpcUrl }) : null

      let warned = false

      return {
        provider: trustProvider,
        interface: isTrust
          ? {
              address: {
                get: () => getAddress(trustProvider)
              },
              network: {
                get: () => getNetwork(trustProvider)
              },
              balance: {
                get: async () => {
                  if (!provider) {
                    if (!warned) {
                      console.warn(
                        'The Trust provider does not allow rpc calls preventing Onboard.js from getting the balance. You can pass in a "rpcUrl" to the Trust wallet initialization object to get the balance.'
                      )
                      warned = true
                    }

                    return null
                  }

                  const address = await getAddress(trustProvider)

                  return getBalance(provider, address)
                }
              },
              name: getProviderName(trustProvider)
            }
          : null
      }
    },
    type: 'injected',
    link: `https://link.trustwallet.com/open_url?coin_id=60&url=${window.location.href}`,
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred
  }
}

export default trust
