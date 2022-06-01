import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import operaIcon from '../wallet-icons/icon-opera.png'
import operaIcon2x from '../wallet-icons/icon-opera@2x.png'
import { getProviderName } from '../../../utilities'

function opera(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Opera',
    iconSrc: iconSrc || operaIcon,
    iconSrcSet: iconSrc || operaIcon2x,
    svg,
    wallet: async (helpers: Helpers) => {
      const { createModernProviderInterface, browser } = helpers
      const provider = (window as any).ethereum

      return {
        provider,
        interface:
          provider && getProviderName(provider) === 'Opera'
            ? createModernProviderInterface(provider)
            : null
      }
    },
    type: 'injected',
    link: 'https://www.opera.com/',
    installMessage: extensionInstallMessage,
    desktop: true,
    mobile: true,
    preferred,
    osExclusions: ['iOS']
  }
}

export default opera
