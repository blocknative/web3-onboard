import { mobileWalletInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import imTokenIcon from '../wallet-icons/icon-imtoken'

function imtoken(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'imToken',
    iconSrc,
    svg: svg || imTokenIcon,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, createLegacyProviderInterface } = helpers

      const provider =
        (window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)

      return {
        provider,
        interface:
          provider && getProviderName(provider) === 'imToken'
            ? {
                ...createLegacyProviderInterface(provider),
                connect: () => provider.enable()
              }
            : null
      }
    },
    type: 'injected',
    link: `imtokenv2://navigate?screen=DappView&url=${window.location.href}`,
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred
  }
}

export default imtoken
