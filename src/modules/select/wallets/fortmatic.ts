import { networkName } from '../../../utilities'
import { validateType } from '../../../validation'
import { SdkWalletOptions, WalletModule, Helpers } from '../../../interfaces'

const fortmaticIcon = `
  <svg 
    height="40" 
    viewBox="0 0 40 40" 
    width="40" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m2744.99995 1155h9.99997 10.00008v9.98139h-10.00008-9.99997-9.99998v9.9814.64001 9.28323.05815 9.9234h-9.99997v-9.9234-.05815-9.28323-.64001-9.9814-9.98139h9.99997zm9.99961 29.88552h-9.94167v-9.92324h19.93595v10.27235c0 2.55359-1.01622 5.00299-2.82437 6.80909-1.80867 1.8061-4.26182 2.82181-6.82018 2.82335h-.34973z" 
      fill="#617bff" 
      fill-rule="evenodd" 
      transform="translate(-2725 -1155)"/>
  </svg>
`

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

  return {
    name: 'Fortmatic',
    svg: fortmaticIcon,
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
