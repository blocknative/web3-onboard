import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import operaTouchIcon from '../wallet-icons/icon-opera-touch.png'
import operaTouchIcon2x from '../wallet-icons/icon-opera-touch@2x.png'

function operaTouch(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Opera Touch',
    iconSrc: iconSrc || operaTouchIcon,
    iconSrcSet: iconSrc || operaTouchIcon2x,
    svg,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, getAddress, getBalance, getNetwork } = helpers

      const provider =
        (window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)

      let enabled = false

      return {
        provider,
        interface:
          provider && getProviderName(provider) === undefined
            ? {
                name: 'Opera Touch',
                connect: () =>
                  provider.enable().then((res: any) => {
                    enabled = true
                    return res
                  }),
                address: {
                  get: () =>
                    enabled ? getAddress(provider) : Promise.resolve(null)
                },
                network: {
                  get: () =>
                    enabled ? getNetwork(provider) : Promise.resolve(null)
                },
                balance: {
                  get: () =>
                    enabled ? getBalance(provider) : Promise.resolve(null)
                }
              }
            : null
      }
    },
    type: 'injected',
    link: 'https://www.opera.com/mobile/touch',
    installMessage: extensionInstallMessage,
    mobile: true,
    preferred,
    osExclusions: ['Android']
  }
}

export default operaTouch
