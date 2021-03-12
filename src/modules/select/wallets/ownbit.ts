import { mobileWalletInstallMessage } from '../content'
import {
  WalletModule,
  Helpers,
  InjectedWithBalanceOptions
} from '../../../interfaces'

import ownbitIcon from '../wallet-icons/icon-ownbit'

function ownbit(options: InjectedWithBalanceOptions): WalletModule {
  const { preferred, label, svg, rpcUrl } = options

  return {
    name: label || 'Ownbit',
    svg: svg || ownbitIcon,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, getAddress, getNetwork, getBalance } = helpers
      const ownbitProvider =
        (window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)

      const isOwnbit =
        getProviderName(ownbitProvider) === 'Ownbit'
      let createProvider

      if (isOwnbit && rpcUrl) {
        createProvider = (await import('./providerEngine')).default
      }

      const provider = createProvider ? createProvider({ rpcUrl }) : null

      let warned = false

      return {
        provider: ownbitProvider,
        interface: isOwnbit
          ? {
              address: {
                get: () => getAddress(ownbitProvider)
              },
              network: {
                get: () => getNetwork(ownbitProvider)
              },
              balance: {
                get: async () => {
                  if (!provider) {
                    if (!warned) {
                      console.warn(
                        'The Ownbit Wallet provider does not allow rpc calls preventing Onboard.js from getting the balance. You can pass in a "rpcUrl" to the Ownbit Wallet initialization object to get the balance.'
                      )
                      warned = true
                    }

                    return null
                  }

                  const address = await getAddress(ownbitProvider)

                  return getBalance(provider, address)
                }
              },
              name: getProviderName(ownbitProvider)
            }
          : null
      }
    },
    type: 'injected',
    link: 'ownbit://navigate?screen=DappView&url=${window.location.href}',
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred
  }
}

export default ownbit
