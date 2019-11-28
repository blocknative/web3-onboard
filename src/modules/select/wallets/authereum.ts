import authereumIcon from '../wallet-icons/authereum.png'
import { networkName } from '../../../utilities'
import { WalletModule } from '../../../interfaces'
import { validateType } from '../../../validation'

function authereum(options: {
  networkId: number
  preferred?: boolean
}): WalletModule {
  validateType({ name: 'Authereum Options', value: options, type: 'object' })

  const { networkId, preferred } = options

  validateType({ name: 'networkId', value: networkId, type: 'number' })
  validateType({
    name: 'preferred',
    value: preferred,
    type: 'boolean',
    optional: true
  })

  return {
    name: 'Authereum',
    iconSrc: authereumIcon,
    wallet: async () => {
      const { default: Authereum } = await import('authereum')
      const instance = new Authereum({
        networkName: networkName(networkId),
        disableNotifications: true
      })

      const provider = instance.getProvider()

      return {
        provider,
        instance,
        interface: {
          name: 'Authereum',
          connect: () => provider.enable(),
          disconnect: () => instance.logout(),
          loading: new Promise((resolve: () => void) => {
            instance.on('openPopup', resolve)
          }),
          address: {
            get: () => instance.getAccountAddress()
          },
          network: {
            get: () => Promise.resolve(networkId)
          },
          balance: {
            get: async () => {
              const loggedIn = await instance.isAuthenticated()
              return loggedIn && instance.getBalance()
            }
          }
        }
      }
    },
    desktop: true,
    mobile: true,
    preferred
  }
}

export default authereum
