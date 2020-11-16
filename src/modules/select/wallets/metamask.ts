import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import metamaskIcon from '../wallet-icons/icon-metamask.png'
import metamaskIcon2x from '../wallet-icons/icon-metamask@2x.png'

function metamask(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'MetaMask',
    iconSrc: iconSrc || metamaskIcon,
    iconSrcSet: iconSrc || metamaskIcon2x,
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
          provider && getProviderName(provider) === 'MetaMask'
            ? typeof provider.enable === 'function'
              ? createModernProviderInterface(provider)
              : createLegacyProviderInterface(provider)
            : null
      }
    },
    type: 'injected',
    link: `https://metamask.app.link/dapp/${window.location.host}`,
    installMessage: extensionInstallMessage,
    desktop: true,
    mobile: true,
    preferred
  }
}

export default metamask
