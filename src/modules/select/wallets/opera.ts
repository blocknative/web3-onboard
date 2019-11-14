import { extensionInstallMessage } from '../content'

import operaIcon from '../wallet-icons/icon-opera.png'
import operaIcon2x from '../wallet-icons/icon-opera@2x.png'

import { WalletModule, Helpers } from '../../../interfaces'

function opera(): WalletModule {
  return {
    name: 'Opera',
    iconSrc: operaIcon,
    iconSrcSet: operaIcon2x,
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
    link: 'https://www.opera.com/',
    installMessage: extensionInstallMessage,
    desktop: true
  }
}

export default opera
