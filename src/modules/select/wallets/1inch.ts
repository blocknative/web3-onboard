import { mobileWalletInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import oneInchIcon from '../wallet-icons/1inch.png'
import oneInchIcon2x from '../wallet-icons/1inch@2x.png'

function oneInchWallet(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || '1inch',
    iconSrc: iconSrc || oneInchIcon,
    iconSrcSet: iconSrc || oneInchIcon2x,
    svg,
    wallet: async (helpers: Helpers) => {
      const { createModernProviderInterface, getProviderName } = helpers
      const windowAsAny = window as any
      const provider =
        windowAsAny.ethereum ||
        (windowAsAny.web3 && windowAsAny.web3.currentProvider)

      return {
        provider,
        interface:
          provider && getProviderName(provider) === '1inch'
            ? createModernProviderInterface(provider)
            : null
      }
    },
    type: 'injected',
    link: `https://wallet.1inch.io?url=${window.location.host}`,
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred,
    osExclusions: ['Android']
  }
}

export default oneInchWallet
