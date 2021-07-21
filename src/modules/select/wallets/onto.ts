import { mobileWalletInstallMessage } from '../content'
import {
  WalletModule,
  Helpers,
  InjectedWithBalanceOptions
} from '../../../interfaces'

import ontoIcon from '../wallet-icons/icon-onto'

function onto(options: InjectedWithBalanceOptions): WalletModule {
  const { preferred, label, iconSrc, svg, rpcUrl } = options

  return {
    name: label || 'ONTO',
    svg: svg || ontoIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, getAddress, getNetwork, getBalance } = helpers
      const ontoProvider =
        (window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)

      const isOnto = getProviderName(ontoProvider) === 'ONTO'
      let createProvider

      if (isOnto && rpcUrl) {
        createProvider = (await import('./providerEngine')).default
      }

      const provider = createProvider ? createProvider({ rpcUrl }) : null

      let warned = false

      return {
        provider: ontoProvider,
        interface: isOnto
          ? {
              address: {
                get: () => getAddress(ontoProvider)
              },
              network: {
                get: () => getNetwork(ontoProvider)
              },
              balance: {
                get: async () => {
                  if (!provider) {
                    if (!warned) {
                      console.warn(
                        'The Onto provider does not allow rpc calls preventing Onboard.js from getting the balance. You can pass in a "rpcUrl" to the Onto wallet initialization object to get the balance.'
                      )
                      warned = true
                    }

                    return null
                  }

                  const address = await getAddress(ontoProvider)

                  return getBalance(provider, address)
                }
              },
              name: getProviderName(ontoProvider)
            }
          : null
      }
    },
    type: 'injected',
    link: 'https://www.onto.app',
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred
  }
}

export default onto
