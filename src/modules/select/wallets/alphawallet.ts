import { mobileWalletInstallMessage } from '../content'
import {
  WalletModule,
  Helpers,
  InjectedWithBalanceOptions
} from '../../../interfaces'

import alphawalletIcon from '../wallet-icons/icon-alphawallet'

function alphawallet(options: InjectedWithBalanceOptions): WalletModule {
  const { preferred, label, iconSrc, svg, rpcUrl } = options

  return {
    name: label || 'AlphaWallet',
    svg: svg || alphawalletIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, getAddress, getNetwork, getBalance } = helpers
      const alphawalletProvider =
        (window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)

      const isAlphaWallet = getProviderName(alphawalletProvider) === 'AlphaWallet'
      let createProvider

      if isAlphaWallet && rpcUrl) {
        createProvider = (await import('./providerEngine')).default
      }

      const provider = createProvider ? createProvider({ rpcUrl }) : null

      let warned = false

      return {
        provider: alphawalletProvider,
        interface: isAlphaWallet
          ? {
              address: {
                get: () => getAddress(alphawalletProvider)
              },
              network: {
                get: () => getNetwork(alphawalletProvider)
              },
              balance: {
                get: async () => {
                  if (!provider) {
                    if (!warned) {
                      console.warn(
                        'The AlphaWallet provider does not allow rpc calls preventing Onboard.js from getting the balance. You can pass in a "rpcUrl" to the AlphaWallet initialization object to get the balance.'
                      )
                      warned = true
                    }

                    return null
                  }

                  const address = await getAddress(alphawalletProvider)

                  return getBalance(provider, address)
                }
              },
              name: getProviderName(alphawalletProvider)
            }
          : null
      }
    },
    type: 'injected',
    link: `https://alphawallet.com`,
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred
  }
}

export default alphawallet
