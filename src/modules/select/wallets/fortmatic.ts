import { networkName } from '../../../utilities'
import { SdkWalletOptions, WalletModule, Helpers } from '../../../interfaces'

import fortmaticIcon from '../wallet-icons/icon-fortmatic'

function fortmatic(
  options: SdkWalletOptions & { networkId: number, rpcUrl: string }
): WalletModule {
  const { apiKey, rpcUrl, networkId, preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Fortmatic',
    svg: svg || fortmaticIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      const { default: Fortmatic } = await import('fortmatic')

      const instance = new Fortmatic(
        apiKey,
        rpcUrl
          ? { chainId: networkId, rpcUrl }
          : networkId === 1
          ? undefined
          : networkName(networkId)
      )

      const provider = instance.getProvider()
      const { BigNumber, getAddress } = helpers

      let enabled: boolean

      return {
        provider,
        instance,
        interface: {
          name: 'Fortmatic',
          connect: () =>
            instance.user.login().then((res: any) => {
              enabled = true
              return res
            }),
          disconnect: () => instance.user.logout(),
          address: {
            get: () => (enabled ? getAddress(provider) : Promise.resolve())
          },
          network: {
            get: () => Promise.resolve(networkId)
          },
          balance: {
            get: async () => {
              return (
                enabled &&
                instance.user
                  .getBalances()
                  .then((res: any) =>
                    res[0]
                      ? BigNumber(res[0].crypto_amount)
                          .times(BigNumber('1000000000000000000'))
                          .toString(10)
                      : null
                  )
              )
            }
          },
          dashboard: () => instance.user.settings()
        }
      }
    },
    type: 'sdk',
    desktop: true,
    mobile: true,
    preferred
  }
}

export default fortmatic
