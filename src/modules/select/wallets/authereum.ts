import authereumIcon from '../wallet-icons/icon-authereum.png'
import { networkName, openLink } from '../../../utilities'
import { WalletModule, AuthereumOptions } from '../../../interfaces'

function authereum(
  options: AuthereumOptions & { networkId: number }
): WalletModule {
  const {
    networkId,
    preferred,
    label,
    iconSrc,
    svg,
    disableNotifications
  } = options

  return {
    name: label || 'Authereum',
    svg,
    iconSrc: iconSrc || authereumIcon,
    wallet: async () => {
      const { default: Authereum } = await import('authereum')
      const instance = new Authereum({
        networkName: networkName(networkId),
        disableNotifications: disableNotifications // default: false
      })

      const provider = instance.getProvider()

      return {
        provider,
        instance,
        interface: {
          name: 'Authereum',
          connect: () => provider.enable(),
          disconnect: () => {
            instance.destroy()
          },
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
          },
          dashboard: () =>
            openLink(
              `https://${
                networkId !== 1 ? `${networkName(networkId)}.` : ''
              }authereum.com/`
            )
        }
      }
    },
    type: 'sdk',
    desktop: true,
    mobile: true,
    preferred
  }
}

export default authereum
