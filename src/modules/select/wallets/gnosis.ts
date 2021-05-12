import type SafeAppsSDK from '@gnosis.pm/safe-apps-sdk'
import type { SafeInfo } from '@gnosis.pm/safe-apps-sdk'
import { CommonWalletOptions, Helpers, WalletModule } from '../../../interfaces'
import gnosisWalletIcon from '../wallet-icons/icon-gnosis'

const getSafe = (sdk: SafeAppsSDK): Promise<SafeInfo | undefined> => {
  return Promise.race([
    sdk.getSafeInfo(),
    // Timeout need as this method hangs until it can find the safe info
    new Promise<undefined>(resolve => setTimeout(resolve, 200))
  ])
}

function gnosis(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg, networkId } = options

  const network = networkId === 4 ? 'rinkeby.' : ''
  const link = `https://${network}gnosis-safe.io/app`

  return {
    name: label || 'Gnosis Safe Wallet',
    iconSrc,
    svg: svg || gnosisWalletIcon,
    wallet: async ({ createModernProviderInterface }: Helpers) => {
      const sdk = new (await import('@gnosis.pm/safe-apps-sdk')).default()
      const { SafeAppProvider } = await import('@gnosis.pm/safe-apps-provider')

      const safe: SafeInfo | undefined = await getSafe(sdk)
      // Checks if we are within the safe app context
      if (!safe) return { provider: undefined, interface: null }

      const provider = new SafeAppProvider(safe, sdk)
      return {
        provider,
        interface: {
          ...createModernProviderInterface(provider),
          connect: () => Promise.resolve([safe.safeAddress])
        }
      }
    },
    type: 'sdk',
    link,
    installMessage: () => `
        <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">
            Click the button below to open the Gnosis Safe interface.
        </p>
        `,
    desktop: true,
    mobile: false,
    preferred
  }
}

export default gnosis
