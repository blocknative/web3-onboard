import fortmaticIcon from '../wallet-icons/icon-fortmatic.svg'
import { networkName } from '../../../utilities'
import { validateType } from '../../../validation'
import { SdkWalletOptions, WalletModule, Helpers } from '../../../interfaces'

function fortmatic(options: SdkWalletOptions): WalletModule {
  validateType({ name: 'Fortmatic options', value: options, type: 'object' })

  const { apiKey, networkId, preferred } = options

  validateType({ name: 'apiKey', value: apiKey, type: 'string' })
  validateType({ name: 'networkId', value: networkId, type: 'number' })
  validateType({
    name: 'preferred',
    value: preferred,
    type: 'boolean',
    optional: true
  })

  let instance: any
  let provider: any

  return {
    name: 'Fortmatic',
    iconSrc: fortmaticIcon,
    wallet: async (helpers: Helpers) => {
      if (!instance) {
        const { default: Fortmatic } = await import('fortmatic')

        instance = new Fortmatic(
          apiKey,
          networkId === 1 ? undefined : networkName(networkId)
        )
        provider = instance.getProvider()
      }

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
