import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers } from '../../../interfaces'
import { validateType } from '../../../validation'

import operaTouchIcon from '../wallet-icons/icon-opera-touch.png'
import operaTouchIcon2x from '../wallet-icons/icon-opera-touch@2x.png'

function operaTouch(options: { preferred?: boolean } = {}): WalletModule {
  const { preferred } = options

  validateType({
    name: 'preferred',
    value: preferred,
    type: 'boolean',
    optional: true
  })

  return {
    name: 'Opera Touch',
    iconSrc: operaTouchIcon,
    iconSrcSet: operaTouchIcon2x,
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
    link: 'https://www.opera.com/mobile/touch',
    installMessage: extensionInstallMessage,
    mobile: true,
    preferred,
    osExclusions: ['Android']
  }
}

export default operaTouch
