import { mobileWalletInstallMessage } from '../content'
import {
  WalletModule,
  Helpers,
  InjectedWithBalanceOptions
} from '../../../interfaces'

import walletIoIcon from '../wallet-icons/icon-wallet-io'

function walletIoWallet(options: InjectedWithBalanceOptions): WalletModule {
  const { preferred, label, svg, rpcUrl } = options

  return {
    name: label || 'wallet.io',
    svg: svg || walletIoIcon,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, getAddress, getNetwork, getBalance, getENS } =
        helpers
      const walletIoProvider =
        (window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)

      const isWalleIoWallet = getProviderName(walletIoProvider) === 'wallet.io'
      let createProvider

      if (isWalleIoWallet && rpcUrl) {
        createProvider = (await import('./providerEngine')).default
      }

      const provider = createProvider ? createProvider({ rpcUrl }) : null

      let warned = false

      return {
        provider: walletIoProvider,
        interface: isWalleIoWallet
          ? {
              address: {
                get: () => getAddress(walletIoProvider)
              },
              ens: {
                get: () =>
                  getAddress(walletIoProvider).then(address =>
                    getENS(walletIoProvider, address)
                  )
              },
              network: {
                get: () => getNetwork(walletIoProvider)
              },
              balance: {
                get: async () => {
                  if (!provider) {
                    if (!warned) {
                      console.warn(
                        'The wallet.io Wallet provider does not allow rpc calls preventing Onboard.js from getting the balance. You can pass in a "rpcUrl" to the wallet.io Wallet initialization object to get the balance.'
                      )
                      warned = true
                    }

                    return null
                  }

                  const address = await getAddress(walletIoProvider)

                  return getBalance(provider, address)
                }
              },
              name: getProviderName(walletIoProvider)
            }
          : null
      }
    },
    type: 'injected',
    link: 'http://wallet.io/',
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred
  }
}

export default walletIoWallet
