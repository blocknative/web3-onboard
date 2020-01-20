import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers } from '../../../interfaces'

import statusIcon from '../wallet-icons/icon-status'

function status(
  options: {
    preferred?: boolean
    label?: string
    iconSrc?: string
    svg?: string
  } = {}
): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Status',
    iconSrc: iconSrc,
    iconSrcSet: iconSrc,
    svg: svg || statusIcon,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, createModernProviderInterface } = helpers

      const provider = (window as any).ethereum

      return {
        provider,
        interface:
          provider && getProviderName(provider) === 'Status'
            ? createModernProviderInterface(provider)
            : null
      }
    },
    link: 'https://status.im/',
    installMessage: extensionInstallMessage,
    mobile: true,
    preferred
  }
}

export default status
