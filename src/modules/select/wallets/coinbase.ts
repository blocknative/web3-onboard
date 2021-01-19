import { mobileWalletInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import coinbaseIcon from '../wallet-icons/icon-coinbase.png'

function coinbase(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Coinbase',
    iconSrc: iconSrc || coinbaseIcon,
    iconSrcSet: iconSrc || coinbaseIcon,
    // iconSrc,
    // svg: svg || coinbaseIcon,
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
    link: 'https://go.cb-w.com/p6UkDPpxu0',
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred
  }
}

export default coinbase
