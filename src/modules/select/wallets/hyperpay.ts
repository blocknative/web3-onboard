import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import hyerpayIcon from '../wallet-icons/icon-hyperpay.png'
import hyerpayIcon2x from '../wallet-icons/icon-hyperpay@2x.png'

function hyperpay(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'HyperPay',
    iconSrc: iconSrc || hyerpayIcon,
    iconSrcSet: iconSrc || hyerpayIcon2x,
    svg,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, createModernProviderInterface } = helpers

      const provider =
        (window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)

      return {
        provider,
        interface:
          provider && getProviderName(provider) === 'HyperPay'
            ? createModernProviderInterface(provider)
            : null
      }
    },
    type: 'injected',
    link: 'https://www.hyperpay.me/',
    installMessage: extensionInstallMessage,
    desktop: true,
    mobile: true,
    preferred,
  }
}

export default hyperpay
