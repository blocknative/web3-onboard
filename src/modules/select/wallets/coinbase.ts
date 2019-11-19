import { mobileWalletInstallMessage } from '../content'
import { WalletModule, Helpers } from '../../../interfaces'
import { validateType } from '../../../validation'

function coinbase(options: { preferred?: boolean } = {}): WalletModule {
  const { preferred } = options
  validateType({
    name: 'preferred',
    value: preferred,
    type: 'boolean',
    optional: true
  })

  return {
    name: 'Coinbase',
    iconSrc:
      'https://cdn-images-1.medium.com/max/1200/1*7ywNS48PnonfsvvMu1tTsA.png',
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
    link: 'https://go.cb-w.com/',
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred
  }
}

export default coinbase
