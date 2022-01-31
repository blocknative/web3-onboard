import type SafeAppsSDK from '@gnosis.pm/safe-apps-sdk'
import type { SafeInfo } from '@gnosis.pm/safe-apps-sdk'
import { GnosisOptions, Helpers, WalletModule } from '../../../interfaces'
import gnosisWalletIcon from '../wallet-icons/icon-gnosis'

const getSafe = (sdk: SafeAppsSDK): Promise<SafeInfo | undefined> =>
  Promise.race([
    sdk.safe.getInfo(),
    // Timeout need as this method hangs until it can find the safe info
    new Promise<undefined>(resolve => setTimeout(resolve, 200))
  ])

/**
 * Checks to see if we are are within a Safe App context. If we are it executes
 * the callback function which self-selects this wallet.
 * @param selectWallet - A callback function which can call the `walletSelect` method
 * with the Gnosis wallet name.
 */
export const checkGnosisSafeContext = async (selectWallet: () => void) =>
  !!(await getSafe(new (await import('@gnosis.pm/safe-apps-sdk')).default())) &&
  selectWallet()

function gnosis(options: GnosisOptions): WalletModule {
  const { preferred, label, iconSrc, svg, networkId } = options

  const network = networkId === 4 ? 'rinkeby.' : ''
  const link = `https://${network}gnosis-safe.io/app`
  const safeAppMessage = options.appName
    ? `Then go to APPS and select <b>${options.appName}</b>.`
    : options.appUrl
    ? `Then go to APPS and add a custom app with the URL:<br /><b>${options.appUrl}</b>`
    : ''

  return {
    name: label || 'Gnosis Safe',
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
            Click the button below to open the Gnosis Safe interface.<br />
            ${safeAppMessage}
        </p>
        `,
    desktop: true,
    mobile: false,
    preferred
  }
}

export default gnosis
