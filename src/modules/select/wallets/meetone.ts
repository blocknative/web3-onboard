import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import meetoneIcon from '../wallet-icons/icon-meetone.png'
import meetoneIcon2x from '../wallet-icons/icon-meetone.png'

function meetone(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'MEETONE',
    iconSrc: iconSrc || meetoneIcon,
    iconSrcSet: iconSrc || meetoneIcon2x,
    svg,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, createModernProviderInterface } = helpers

      const provider =
        (window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)

      return {
        provider,
        interface:
          (getProviderName(provider) === 'MEETONE' &&
            createModernProviderInterface(provider)) ||
          null
      }
    },
    type: 'injected',
    link: 'https://meet.one',
    installMessage: extensionInstallMessage,
    mobile: true,
    preferred
  }
}

export default meetone
