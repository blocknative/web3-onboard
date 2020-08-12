import { mobileWalletInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import mykeyIcon from '../wallet-icons/icon-mykey.png'
import mykeyIcon2x from '../wallet-icons/icon-mykey@2x.png'

function mykey(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'MYKEY',
    iconSrc: iconSrc || mykeyIcon,
    iconSrcSet: iconSrc || mykeyIcon2x,
    svg,
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
          provider && getProviderName(provider) === 'MYKEY'
            ? typeof provider.enable === 'function'
              ? createModernProviderInterface(provider)
              : createLegacyProviderInterface(provider)
            : null
      }
    },
    type: 'injected',
    link: 'https://mykey.org/download',
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred
  }
}

export default mykey
