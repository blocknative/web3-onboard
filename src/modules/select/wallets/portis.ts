import { networkName } from '../../../utilities'
import {
  SdkWalletOptions,
  WalletModule,
  Helpers,
  CommonWalletOptions
} from '../../../interfaces'

import portisIcon from '../wallet-icons/icon-portis'

function portis(options: SdkWalletOptions & CommonWalletOptions): WalletModule {
  const { apiKey, networkId, preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Portis',
    iconSrc,
    svg: svg || portisIcon,
    wallet: async (helpers: Helpers) => {
      const { default: Portis } = await import('@portis/web3')
      const instance = new Portis(apiKey, networkName(networkId))
      const provider = instance.provider
      const { BigNumber } = helpers

      return {
        provider,
        instance,
        interface: {
          name: 'Portis',
          connect: provider.enable,
          disconnect: () => {
            instance.logout()
            provider.stop()
          },
          address: {
            onChange: func => {
              instance.onLogin((address: string) => {
                func(address)
                provider.address = address
              })
            }
          },
          network: {
            get: () => Promise.resolve(Number(instance.config.network.chainId))
          },
          balance: {
            get: () =>
              new Promise(resolve => {
                // add setTimeout to put at the end of event loop to make sure address is available
                setTimeout(() => {
                  if (!provider.address) {
                    resolve(null)
                    return
                  }

                  provider.sendAsync(
                    {
                      jsonrpc: '2.0',
                      method: 'eth_getBalance',
                      params: [provider.address, 'latest'],
                      id: 1
                    },
                    (e: any, res: any) => {
                      resolve(BigNumber(res.result).toString(10))
                    }
                  )
                }, 1)
              })
          }
        }
      }
    },
    type: 'sdk',
    desktop: true,
    mobile: true,
    url: 'https://wallet.portis.io/',
    preferred
  }
}

export default portis
