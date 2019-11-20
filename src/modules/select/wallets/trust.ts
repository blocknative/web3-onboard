import { mobileWalletInstallMessage } from '../content'
import trustIcon from '../wallet-icons/icon-trust.svg'
import { WalletModule, Helpers } from '../../../interfaces'
import { validateType } from '../../../validation'

function trust(options: { preferred?: boolean } = {}): WalletModule {
  const { preferred } = options

  validateType({
    name: 'preferred',
    value: preferred,
    type: 'boolean',
    optional: true
  })

  return {
    name: 'Trust',
    iconSrc: trustIcon,
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
    link: `https://links.trustwalletapp.com/a/key_live_lfvIpVeI9TFWxPCqwU8rZnogFqhnzs4D?&event=openURL&url=${window.location.href}`,
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred
  }
}

export default trust
