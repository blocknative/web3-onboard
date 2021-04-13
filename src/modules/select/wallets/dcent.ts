import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import dcentIcon from '../wallet-icons/icon-dcent'

function dcent(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options
  const url = (window as any).location.origin || (window as any).location.host
  const encodedUrl = encodeURIComponent(url)
  return {
    name: label || "D'CENT",
    svg: svg || dcentIcon,
    iconSrc,
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
          provider && getProviderName(provider) === "D'CENT"
            ? typeof provider.enable === 'function'
              ? createModernProviderInterface(provider)
              : createLegacyProviderInterface(provider)
            : null
      }
    },
    type: 'injected',
    link: 'https://link.dcentwallet.com/DAppBrowser/?url=' + encodedUrl,
    installMessage: extensionInstallMessage,
    mobile: true,
    preferred
  }
}

export default dcent
