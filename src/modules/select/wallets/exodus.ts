import { extensionInstallMessage, mobileWalletInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import exodusIcon from '../wallet-icons/icon-exodus.png'
import exodusIcon2x from '../wallet-icons/icon-exodus@2x.png'

function exodus(
  options: CommonWalletOptions & { isMobile: boolean }
): WalletModule {
  const { preferred, label, iconSrc, svg, isMobile } = options

  return {
    name: label || 'Exodus',
    iconSrc: iconSrc || exodusIcon,
    iconSrcSet: iconSrc || exodusIcon2x,
    svg,
    wallet: async (helpers: Helpers) => {
      const {
        getProviderName,
        createModernProviderInterface,
        createLegacyProviderInterface
      } = helpers

      const provider =
        (window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)

      return {
        provider,
        interface:
          provider && getProviderName(provider) === 'Exodus'
            ? typeof provider.enable === 'function'
              ? createModernProviderInterface(provider)
              : createLegacyProviderInterface(provider)
            : null
      }
    },
    type: 'injected',
    link: 'https://www.exodus.com/browser-extension/',
    installMessage: isMobile
      ? mobileWalletInstallMessage
      : extensionInstallMessage,
    desktop: true,
    mobile: false,
    preferred
  }
}

export default exodus
