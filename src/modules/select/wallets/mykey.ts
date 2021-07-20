import { mobileWalletInstallMessage } from '../content'
import {
  WalletModule,
  Helpers,
  InjectedWithBalanceOptions
} from '../../../interfaces'

import mykeyIcon from '../wallet-icons/icon-mykey.png'
import mykeyIcon2x from '../wallet-icons/icon-mykey@2x.png'

function mykey(options: InjectedWithBalanceOptions): WalletModule {
  const { preferred, label, iconSrc, svg, rpcUrl } = options

  return {
    name: label || 'MYKEY',
    iconSrc: iconSrc || mykeyIcon,
    iconSrcSet: iconSrc || mykeyIcon2x,
    svg,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, getAddress, getENS, getNetwork, getBalance } =
        helpers
      const myKeyProvider =
        (window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)

      const isMyKey = getProviderName(myKeyProvider) === 'MYKEY'
      let createProvider

      if (isMyKey && rpcUrl) {
        createProvider = (await import('./providerEngine')).default
      }

      const provider = createProvider ? createProvider({ rpcUrl }) : null

      let warned = false

      return {
        provider: myKeyProvider,
        interface: isMyKey
          ? {
              address: {
                get: () => getAddress(myKeyProvider)
              },
              ens: {
                get: () =>
                  getAddress(myKeyProvider).then(address =>
                    getENS(provider, address)
                  )
              },
              network: {
                get: () => getNetwork(myKeyProvider)
              },
              balance: {
                get: async () => {
                  if (!provider) {
                    if (!warned) {
                      console.warn(
                        'The MYKEY provider does not allow rpc calls preventing Onboard.js from getting the balance. You can pass in a "rpcUrl" to the MYKEY wallet initialization object to get the balance.'
                      )
                      warned = true
                    }

                    return null
                  }

                  const address = await getAddress(myKeyProvider)

                  return getBalance(provider, address)
                }
              },
              name: getProviderName(myKeyProvider)
            }
          : null
      }
    },
    type: 'injected',
    link: 'https://mykey.org/download',
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred
  }
}

export default mykey
