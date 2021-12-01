import { extensionInstallMessage, mobileWalletInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import tallyIcon from '../wallet-icons/icon-tally.png'
import tallyIcon2x from '../wallet-icons/icon-tally@2x.png'

function tally(
  options: CommonWalletOptions & { isMobile: boolean }
): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Tally',
    iconSrc: iconSrc || tallyIcon,
    iconSrcSet: iconSrc || tallyIcon2x,
    svg,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, createModernProviderInterface } = helpers

      const provider = (window as any).ethereum || (window as any).tally

      return {
        provider,
        interface:
          provider && getProviderName(provider) === 'Tally'
            ? createModernProviderInterface(provider)
            : null
      }
    },
    type: 'injected',
    link: `https://tally.cash/`,
    installMessage: extensionInstallMessage,
    desktop: true,
    mobile: false,
    preferred
  }
}

export default tally
