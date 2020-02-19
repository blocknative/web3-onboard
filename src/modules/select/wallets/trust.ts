import { mobileWalletInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import trustIcon from '../wallet-icons/icon-trust'

function trust(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Trust',
    svg: svg || trustIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, createLegacyProviderInterface } = helpers
      const provider =
        (window as any).web3 && (window as any).web3.currentProvider

      return {
        provider,
        interface:
          provider && getProviderName(provider) === 'Trust'
            ? createLegacyProviderInterface(provider)
            : null
      }
    },
    type: 'injected',
    link: `https://links.trustwalletapp.com/a/key_live_lfvIpVeI9TFWxPCqwU8rZnogFqhnzs4D?&event=openURL&url=${window.location.href}`,
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred
  }
}

export default trust
