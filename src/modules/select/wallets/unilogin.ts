import { WalletModule, CommonWalletOptions } from '../../../interfaces'
import uniloginIcon from '../wallet-icons/icon-unilogin'

function unilogin(options: CommonWalletOptions): WalletModule {
  const { networkId, preferred, label, iconSrc, svg } = options

  return {
    name: label || 'UniLogin',
    svg: svg || uniloginIcon,
    iconSrc,
    wallet: async helpers => {
      const { createLegacyProviderInterface, networkName } = helpers
      const { default: ULIFrameProvider } = await import('@unilogin/provider')
      const network: any = networkName(networkId)
      const provider = ULIFrameProvider.create(network)

      return {
        provider,
        interface: {
          ...createLegacyProviderInterface(provider),
          connect: () => provider.enable(),
          loading: provider.waitUntilReady(),
          disconnect: () =>
            new Promise(resolve =>
              provider.send({ method: 'ul_disconnect' }, resolve)
            ),
          settings: () => provider.openDashboard()
        }
      }
    },
    type: 'sdk',
    desktop: true,
    mobile: true,
    preferred
  }
}

export default unilogin
