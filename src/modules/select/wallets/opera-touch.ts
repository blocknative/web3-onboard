import { extensionInstallMessage } from '../content'

import operaTouchIcon from '../wallet-icons/icon-opera-touch.png'
import operaTouchIcon2x from '../wallet-icons/icon-opera-touch@2x.png'

import { WalletModule, Helpers } from '../../../interfaces'

function operaTouch(): WalletModule {
  return {
    name: 'Opera Touch',
    iconSrc: operaTouchIcon,
    iconSrcSet: operaTouchIcon2x,
    wallet: (helpers: Helpers) => {
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
    installMessage: extensionInstallMessage
  }
}

export default operaTouch
