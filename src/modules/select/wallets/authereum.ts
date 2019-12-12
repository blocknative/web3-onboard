import authereumIcon from '../wallet-icons/authereum.png'
import { networkName } from '../../../utilities'
import { WalletModule } from '../../../interfaces'

function authereum(options: {
  networkId: number
  preferred?: boolean
  label?: string
  iconSrc?: string
  svg?: string
}): WalletModule {
  const { networkId, preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Authereum',
    svg,
    iconSrc: iconSrc || authereumIcon,
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
