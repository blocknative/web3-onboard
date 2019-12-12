import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers } from '../../../interfaces'
import { validateType } from '../../../validation'

import operaIcon from '../wallet-icons/icon-opera.png'
import operaIcon2x from '../wallet-icons/icon-opera@2x.png'

function opera(options: { preferred?: boolean } = {}): WalletModule {
  const { preferred } = options

  validateType({
    name: 'preferred',
    value: preferred,
    type: 'boolean',
    optional: true
  })

  return {
    name: 'Opera',
    iconSrc: operaIcon,
    iconSrcSet: operaIcon2x,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, createModernProviderInterface } = helpers

      const provider =
        (window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)

      return {
        provider,
        interface:
          provider && getProviderName(provider) === undefined
            ? createModernProviderInterface(provider)
            : null
      }
    },
    link: 'https://www.opera.com/',
    installMessage: extensionInstallMessage,
    desktop: true,
    mobile: true,
    preferred,
    osExclusions: ['iOS']
  }
}

export default opera
