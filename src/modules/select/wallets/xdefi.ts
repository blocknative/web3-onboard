import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import xdefiIcon from '../wallet-icons/icon-xdefi.png'
import xdefiIcon2x from '../wallet-icons/icon-xdefi@2x.png'

function xdefi(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || '',
    iconSrc: iconSrc || xdefiIcon,
    iconSrcSet: iconSrc || xdefiIcon2x,
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
          provider && getProviderName(provider) === 'XDeFi'
            ? typeof provider.enable === 'function'
              ? createModernProviderInterface(provider)
              : createLegacyProviderInterface(provider)
            : null
      }
    },
    type: 'injected',
    link: 'https://www.xdefi.io/',
    installMessage: extensionInstallMessage,
    desktop: true,
    mobile: true,
    preferred
  }
}

export default xdefi
