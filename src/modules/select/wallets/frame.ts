import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import frameIcon from '../wallet-icons/icon-frame.png'
import frameIcon2x from '../wallet-icons/icon-frame@2x.png'

function frame(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Frame',
    iconSrc: iconSrc || frameIcon,
    iconSrcSet: iconSrc || frameIcon2x,
    svg,
    wallet: async (helpers: Helpers) => {
      const { createModernProviderInterface } = helpers

      const { default: ethProvider } = await import('eth-provider')
      const provider = ethProvider('frame')

      return {
        provider,
        interface: createModernProviderInterface(provider)
      }
    },
    type: 'injected', // native
    link: `https://frame.sh`,
    installMessage: extensionInstallMessage,
    desktop: true,
    mobile: false,
    preferred
  }
}

export default frame
