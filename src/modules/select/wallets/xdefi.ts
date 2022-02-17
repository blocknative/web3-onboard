import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import xdefiIcon from '../wallet-icons/icon-xdefi.png'
import xdefiIcon2x from '../wallet-icons/icon-xdefi@2x.png'

function xdefi(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'XDEFI Wallet',
    iconSrc: iconSrc || xdefiIcon,
    iconSrcSet: iconSrc || xdefiIcon2x,
    svg,
    wallet: async (helpers: Helpers) => {
      const { createModernProviderInterface, createLegacyProviderInterface } =
        helpers

      const provider = (window as any).xfi && (window as any).xfi.ethereum

      return {
        provider,
        interface: provider
          ? typeof provider.enable === 'function'
            ? createModernProviderInterface(provider)
            : createLegacyProviderInterface(provider)
          : null
      }
    },
    type: 'injected',
    link: 'https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf',
    installMessage: extensionInstallMessage,
    desktop: true,
    mobile: true,
    preferred
  }
}

export default xdefi
