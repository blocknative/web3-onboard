import { extensionInstallMessage, mobileWalletInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import mathwalletIcon from '../wallet-icons/icon-mathwallet.png'
import mathwalletIcon2x from '../wallet-icons/icon-mathwallet@2x.png'

function mathwallet(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg, isMobile } = options

  return {
    name: label || 'MathWallet',
    iconSrc: iconSrc || mathwalletIcon,
    iconSrcSet: iconSrc || mathwalletIcon2x,
    svg,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, createModernProviderInterface } = helpers

      const provider =
        (window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)

      return {
        provider,
        interface:
          (provider && getProviderName(provider) === 'MathWallet') ? createModernProviderInterface(provider) : null
      }
    },
    type: 'injected',
    link: 'https://mathwallet.org',
    installMessage:  isMobile
      ? mobileWalletInstallMessage
      : extensionInstallMessage,
    desktop: true,
    mobile: true,
    preferred
  }
}

export default mathwallet
