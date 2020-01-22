import { mobileWalletInstallMessage } from '../content'
import { WalletModule, Helpers } from '../../../interfaces'

function coinbase(
  options: {
    preferred?: boolean
    label?: string
    iconSrc?: string
    svg?: string
  } = {}
): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Coinbase',
    iconSrc:
      iconSrc ||
      'https://cdn-images-1.medium.com/max/1200/1*7ywNS48PnonfsvvMu1tTsA.png',
    svg,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, createLegacyProviderInterface } = helpers
      const provider =
        (window as any).web3 && (window as any).web3.currentProvider

      return {
        provider,
        interface:
          provider && getProviderName(provider) === 'Coinbase'
            ? createLegacyProviderInterface(provider)
            : null
      }
    },
    type: 'injected',
    link: 'https://go.cb-w.com/',
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred
  }
}

export default coinbase
