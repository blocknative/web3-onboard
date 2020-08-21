import { mobileWalletInstallMessage } from '../content'
import {
  WalletModule,
  Helpers,
  InjectedWithBalanceOptions
} from '../../../interfaces'

import huobiwalletIcon from '../wallet-icons/icon-huobiwallet'

function huobiwallet(options: InjectedWithBalanceOptions): WalletModule {
  const { preferred, label, svg, rpcUrl } = options

  return {
    name: label || 'Huobi Wallet',
    svg: svg || huobiwalletIcon,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, getAddress, getNetwork, getBalance } = helpers
      const huobiwalletProvider =
        (window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)

      const isHuobiWallet = getProviderName(huobiwalletProvider) === 'huobiwallet'
      let createProvider

      if (isHuobiWallet && rpcUrl) {
        createProvider = (await import('./providerEngine')).default
      }

      const provider = createProvider ? createProvider({ rpcUrl }) : null

      let warned = false

      return {
        provider: huobiwalletProvider,
        interface: isHuobiWallet
          ? {
              address: {
                get: () => getAddress(huobiwalletProvider)
              },
              network: {
                get: () => getNetwork(huobiwalletProvider)
              },
              balance: {
                get: async () => {
                  if (!provider) {
                    if (!warned) {
                      console.warn(
                        'The Huobi Wallet provider does not allow rpc calls preventing Onboard.js from getting the balance. You can pass in a "rpcUrl" to the Huobi Wallet initialization object to get the balance.'
                      )
                      warned = true
                    }

                    return null
                  }

                  const address = await getAddress(huobiwalletProvider)

                  return getBalance(provider, address)
                }
              },
              name: getProviderName(huobiwalletProvider)
            }
          : null
      }
    },
    type: 'injected',
    link: 'https://www.huobiwallet.com',
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred
  }
}

export default huobiwallet
