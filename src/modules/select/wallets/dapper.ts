import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers } from '../../../interfaces'
import { validateType } from '../../../validation'

import dapperIcon from '../wallet-icons/icon-dapper.png'
import dapperIcon2x from '../wallet-icons/icon-dapper@2x.png'

function dapper(options: { preferred?: boolean } = {}): WalletModule {
  const { preferred } = options

  validateType({
    name: 'preferred',
    value: preferred,
    type: 'boolean',
    optional: true
  })

  return {
    name: 'Dapper',
    iconSrc: dapperIcon,
    iconSrcSet: dapperIcon2x,
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
    link: 'https://www.meetdapper.com/',
    installMessage: extensionInstallMessage,
    desktop: true,
    preferred
  }
}

export default dapper
