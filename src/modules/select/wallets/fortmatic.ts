import { networkName } from '../../../utilities'
import {
  SdkWalletOptions,
  WalletModule,
  Helpers,
  CommonWalletOptions
} from '../../../interfaces'

import fortmaticIcon from '../wallet-icons/icon-fortmatic'

function fortmatic(
  options: SdkWalletOptions & CommonWalletOptions
): WalletModule {
  const { apiKey, networkId, preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Fortmatic',
    svg: svg || fortmaticIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      const { default: Fortmatic } = await import('fortmatic')

      const instance = new Fortmatic(
        apiKey,
        networkId === 1 ? undefined : networkName(networkId)
      )
      const provider = instance.getProvider()

      const { BigNumber } = helpers

      return {
        provider,
        instance,
        interface: {
          name: 'Fortmatic',
          connect: instance.user.login,
          address: {
            get: () => Promise.resolve(provider.account)
          },
          network: {
            get: () => Promise.resolve(networkId)
          },
          balance: {
            get: () =>
              provider.account &&
              instance.user.getBalances().then((res: any) =>
                res[0]
                  ? BigNumber(res[0].crypto_amount)
                      .times(BigNumber('1000000000000000000'))
                      .toString(10)
                  : null
              )
          }
        }
      }
    },
    desktop: true,
    mobile: true,
    preferred
  }
}

export default fortmatic
