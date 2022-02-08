import { mobileWalletInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import didWalletIcon from '../wallet-icons/icon-didwallet.png'
import didWalletIcon2x from '../wallet-icons/icon-didwallet@2x.png'

function didwallet(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'DID Wallet',
    iconSrc: iconSrc || didWalletIcon,
    iconSrcSet: iconSrc || didWalletIcon2x,
    svg,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, createLegacyProviderInterface } = helpers
      const provider =
        (window as any).web3 && (window as any).web3.currentProvider

      return {
        provider,
        interface:
          provider && getProviderName(provider) === 'DIDWallet'
            ? createLegacyProviderInterface(provider)
            : null
      }
    },
    type: 'injected',
    link: `abt://abtwallet.io/i?action=requestOpenUrl&url=${encodeURIComponent(
      window.location.href
    )}`,
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred
  }
}

export default didwallet
