import { mobileWalletInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import ownbitIcon from '../wallet-icons/icon-ownbit'

function ownbit(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Ownbit',
    iconSrc,
    svg: svg || ownbitIcon,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, createModernProviderInterface } = helpers

      const provider =
        (window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)

      return {
        provider,
        interface:
          (getProviderName(provider) === 'Ownbit' &&
            createModernProviderInterface(provider)) ||
          null
      }
    },
    type: 'injected',
    link: 'https://ownbit.io',
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred
  }
}

export default ownbit
