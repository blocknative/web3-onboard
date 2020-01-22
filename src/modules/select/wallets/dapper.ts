import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers } from '../../../interfaces'

import dapperIcon from '../wallet-icons/icon-dapper.png'
import dapperIcon2x from '../wallet-icons/icon-dapper@2x.png'

function dapper(
  options: {
    preferred?: boolean
    label?: string
    iconSrc?: string
    svg?: string
  } = {}
): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Dapper',
    iconSrc: iconSrc || dapperIcon,
    iconSrcSet: iconSrc || dapperIcon2x,
    svg,
    wallet: async (helpers: Helpers) => {
      const { createModernProviderInterface, getProviderName } = helpers
      const provider = (window as any).ethereum

      return {
        provider,
        interface:
          provider && getProviderName(provider) === 'Dapper'
            ? createModernProviderInterface(provider)
            : null
      }
    },
    type: 'injected',
    link: 'https://www.meetdapper.com/',
    installMessage: extensionInstallMessage,
    desktop: true,
    preferred
  }
}

export default dapper
