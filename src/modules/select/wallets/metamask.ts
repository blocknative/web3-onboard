import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers } from '../../../interfaces'
import { validateType } from '../../../validation'

import metamaskIcon from '../wallet-icons/icon-metamask.png'
import metamaskIcon2x from '../wallet-icons/icon-metamask@2x.png'

function metamask(options: { preferred?: boolean } = {}): WalletModule {
  const { preferred } = options

  validateType({
    name: 'preferred',
    value: preferred,
    type: 'boolean',
    optional: true
  })

  return {
    name: 'MetaMask',
    iconSrc: metamaskIcon,
    iconSrcSet: metamaskIcon2x,
    wallet: async (helpers: Helpers) => {
      const {
        getProviderName,
        createModernProviderInterface,
        createLegacyProviderInterface
      } = helpers

      const provider =
        (window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)

      return {
        provider,
        interface:
          provider && getProviderName(provider) === 'MetaMask'
            ? typeof provider.enable === 'function'
              ? createModernProviderInterface(provider)
              : createLegacyProviderInterface(provider)
            : null
      }
    },
    link: 'https://metamask.io/',
    installMessage: extensionInstallMessage,
    desktop: true,
    preferred
  }
}

export default metamask
