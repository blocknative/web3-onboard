import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import tokenaryIcon from '../wallet-icons/icon-tokenary.png'
import tokenaryIcon2x from '../wallet-icons/icon-tokenary@2x.png'

function tokenary(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Tokenary',
    iconSrc: iconSrc || tokenaryIcon,
    iconSrcSet: iconSrc || tokenaryIcon2x,
    svg,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, createModernProviderInterface } = helpers
      const windowAsAny = window as any
      const provider = windowAsAny.ethereum || windowAsAny.web3.currentProvider

      return {
        provider,
        interface:
          provider && getProviderName(provider) === 'Tokenary'
            ? createModernProviderInterface(provider)
            : null
      }
    },
    type: 'injected',
    link: `https://tokenary.io/get`,
    installMessage: extensionInstallMessage,
    desktop: true,
    mobile: true,
    preferred,
    osExclusions: ['Android']
  }
}

export default tokenary
