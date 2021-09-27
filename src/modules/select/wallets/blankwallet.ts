import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import blankwalletIcon from '../wallet-icons/icon-blankwallet'

function blankwallet(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Blank Wallet',
    iconSrc,
    svg: svg || blankwalletIcon,
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
          provider && getProviderName(provider) === 'BlankWallet'
            ? typeof provider.enable === 'function'
              ? createModernProviderInterface(provider)
              : createLegacyProviderInterface(provider)
            : null
      }
    },
    type: 'injected',
    link: `https://www.goblank.io/`,
    installMessage: extensionInstallMessage,
    desktop: true,
    mobile: false,
    preferred
  }
}

export default blankwallet
