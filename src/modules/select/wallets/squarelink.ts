import { networkName, networkToId, openLink } from '../../../utilities'
import { SdkWalletOptions, WalletModule, Helpers } from '../../../interfaces'

import sqlkIcon from '../wallet-icons/icon-squarelink'

function squarelink(
  options: SdkWalletOptions & { networkId: number }
): WalletModule {
  const { apiKey, networkId, preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Squarelink',
    svg: svg || sqlkIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      const { default: Squarelink } = await import('squarelink')

      const instance = new Squarelink(apiKey, networkName(networkId), {
        useSync: true
      })

      const provider = instance.getProviderSync()
      const { BigNumber } = helpers

      return {
        provider,
        instance,
        interface: {
          name: 'Squarelink',
          connect: provider.enable,
          disconnect: () => provider.stop(),
          address: {
            get: () => Promise.resolve(instance.accounts[0])
          },
          network: {
            get: () => Promise.resolve(networkToId(instance.network))
          },
          balance: {
            get: () =>
              new Promise(resolve => {
                if (!instance.accounts.length) {
                  resolve(null)
                  return
                }

                provider.sendAsync(
                  {
                    jsonrpc: '2.0',
                    method: 'eth_getBalance',
                    params: [instance.accounts[0], 'latest'],
                    id: 1
                  },
                  (e: any, res: any) => {
                    resolve(BigNumber(res.result).toString(10))
                  }
                )
              })
          },
          dashboard: () => openLink('https://app.squarelink.com/')
        }
      }
    },
    type: 'sdk',
    desktop: true,
    mobile: true,
    preferred
  }
}

export default squarelink
