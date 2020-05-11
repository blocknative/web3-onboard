import { mobileWalletInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import coinbaseIcon from '../wallet-icons/icon-coinbase'

function coinbase(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Coinbase',
    iconSrc: iconSrc || coinbaseIcon,
    svg,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, createLegacyProviderInterface } = helpers
      const provider =
        (window as any).web3 && (window as any).web3.currentProvider

      return {
        provider,
        interface:
          provider && getProviderName(provider) === 'Coinbase'
            ? createLegacyProviderInterface(provider)
            : null
      }
    },
    type: 'injected',
    link: 'https://go.cb-w.com/',
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred
  }
}

export default coinbase
