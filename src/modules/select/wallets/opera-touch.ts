import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers } from '../../../interfaces'

import operaTouchIcon from '../wallet-icons/icon-opera-touch.png'
import operaTouchIcon2x from '../wallet-icons/icon-opera-touch@2x.png'

function operaTouch(
  options: {
    preferred?: boolean
    label?: string
    iconSrc?: string
    svg?: string
  } = {}
): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Opera Touch',
    iconSrc: iconSrc || operaTouchIcon,
    iconSrcSet: iconSrc || operaTouchIcon2x,
    svg,
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
    type: 'injected',
    link: 'https://www.opera.com/mobile/touch',
    installMessage: extensionInstallMessage,
    mobile: true,
    preferred,
    osExclusions: ['Android']
  }
}

export default operaTouch
