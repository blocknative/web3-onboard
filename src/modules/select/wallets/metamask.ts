import { extensionInstallMessage } from '../content'

import metamaskIcon from '../wallet-icons/icon-metamask.png'
import metamaskIcon2x from '../wallet-icons/icon-metamask@2x.png'

import { WalletModule, Helpers } from '../../../interfaces'

function metamask(): WalletModule {
  return {
    name: 'MetaMask',
    iconSrc: metamaskIcon,
    iconSrcSet: metamaskIcon2x,
    wallet: (helpers: Helpers) => {
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
    installMessage: extensionInstallMessage
  }
}

export default metamask
