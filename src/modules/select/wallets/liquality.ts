import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import liqualityIcon from '../wallet-icons/icon-liquality.png'
import liqualityIcon2x from '../wallet-icons/icon-liquality@2x.png'

function liquality(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Liquality',
    iconSrc: iconSrc || liqualityIcon,
    iconSrcSet: iconSrc || liqualityIcon2x,
    svg,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, createModernProviderInterface } = helpers

      const provider =
        (window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)

      return {
        provider,
        interface:
          (getProviderName(provider) === 'Liquality' &&
            createModernProviderInterface(provider)) ||
          null
      }
    },
    type: 'injected',
    link: 'https://liquality.io',
    installMessage: extensionInstallMessage,
    desktop: true,
    mobile: false,
    preferred
  }
}

export default liquality
