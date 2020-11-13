import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import web3WalletIcon from '../wallet-icons/icon-web3Wallet.png'
import web3WalletIcon2x from '../wallet-icons/icon-web3Wallet@2x.png'

function web3Wallet(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Web3 Wallet',
    iconSrc: iconSrc || web3WalletIcon,
    iconSrcSet: iconSrc || web3WalletIcon2x,
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
          provider
            ? typeof provider.enable === 'function'
              ? createModernProviderInterface(provider)
              : createLegacyProviderInterface(provider)
            : null
      }
    },
    type: 'injected',
    link: '',
    installMessage: undefined,
    desktop: true,
    mobile: true,
    preferred
  }
}

export default web3Wallet
