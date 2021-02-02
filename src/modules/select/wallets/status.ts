import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import statusIcon from '../wallet-icons/icon-status'

function status(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Status',
    iconSrc: iconSrc,
    iconSrcSet: iconSrc,
    svg: svg || statusIcon,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, getAddress, getBalance, getNetwork } = helpers

      const provider = (window as any).ethereum
      let accountsApproved = false

      return {
        provider,
        interface:
          provider && getProviderName(provider) === 'Status'
            ? {
                connect: () =>
                  provider
                    .request({
                      method: 'eth_requestAccounts'
                    })
                    .then(() => (accountsApproved = true)),
                address: {
                  get: () =>
                    accountsApproved
                      ? getAddress(provider)
                      : Promise.resolve(null)
                },
                balance: {
                  get: () =>
                    accountsApproved
                      ? getBalance(provider)
                      : Promise.resolve(null)
                },
                network: {
                  get: () => getNetwork(provider)
                },
                name: 'Status'
              }
            : null
      }
    },
    type: 'injected',
    link: 'https://status.im/',
    installMessage: extensionInstallMessage,
    mobile: true,
    preferred
  }
}

export default status
