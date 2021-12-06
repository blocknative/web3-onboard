import { CommonWalletOptions, Helpers, WalletModule } from '../../../interfaces'
import { extensionInstallMessage, mobileWalletInstallMessage } from '../content'
import { roninWalletLogo } from '../wallet-icons/icon-ronin'

function roninWallet(
  options: CommonWalletOptions & { isMobile: boolean }
): WalletModule {
  const { preferred, label, iconSrc, svg, isMobile } = options

  return {
    name: label || 'Ronin',
    iconSrc: iconSrc || roninWalletLogo,
    iconSrcSet: iconSrc || roninWalletLogo,
    svg: svg || roninWalletLogo,
    wallet: async (helpers: Helpers) => {
      const { createModernProviderInterface } = helpers
      let provider = (window as any).ronin?.provider
      let providerInterface = null

      if (provider) {
        providerInterface = createModernProviderInterface(provider)

        if (providerInterface.network.get) {
          providerInterface.network.get = () => {
            return Promise.resolve(2020)
          }
        }
      }

      return {
        provider,
        interface: providerInterface,
      }
    },
    type: 'injected',
    link: 'https://skymavis.com/wallet',
    installMessage: isMobile
      ? mobileWalletInstallMessage
      : extensionInstallMessage,
    desktop: true,
    mobile: false,
    preferred
  }
}

export default roninWallet
