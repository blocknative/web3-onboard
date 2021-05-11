import type SafeAppsSDK from '@gnosis.pm/safe-apps-sdk'
import type { SafeInfo } from '@gnosis.pm/safe-apps-sdk'
import {
  CommonWalletOptions,
  Helpers,
  WalletModule,
  WalletType
} from '../../../interfaces'
import gnosisWalletIcon from '../wallet-icons/icon-gnosis'

interface InstallMessageWallets {
  currentWallet: string | undefined
  selectedWallet: string
}

class GnosisSafeWallet implements WalletModule {
  name = 'Gnosis Safe Wallet'
  type: WalletType = 'sdk'
  svg: string = gnosisWalletIcon
  mobile = false
  desktop = true
  link: string

  constructor(options: CommonWalletOptions) {
    // Override class instance methods with wallet options when provided i.e. name, svg, .ect
    Object.assign(this, {
      ...(options.label ? { name: options.label } : {}),
      ...options
    })
    const network = options.networkId === 4 ? 'rinkeby.' : ''
    this.link = `https://${network}gnosis-safe.io/app`
  }

  async wallet({ createModernProviderInterface }: Helpers) {
    const sdk = new (await import('@gnosis.pm/safe-apps-sdk')).default()
    const { SafeAppProvider } = await import('@gnosis.pm/safe-apps-provider')

    const safe: SafeInfo | undefined = await GnosisSafeWallet.getSafe(sdk)
    if (!safe) return { provider: undefined, interface: null }
    const provider = new SafeAppProvider(safe, sdk)
    return {
      provider,
      interface: {
        ...createModernProviderInterface(provider),
        connect: () => Promise.resolve([safe.safeAddress])
      }
    }
  }

  /**
   * Tries to retrieve safe info and returns undefined if this isn't called
   * within the Gnosis safe interface.
   */
  static getSafe(sdk: SafeAppsSDK): Promise<SafeInfo | undefined> {
    return Promise.race([
      sdk.getSafeInfo(),
      // Timeout need as this method hangs until it can find the safe info
      new Promise<undefined>(resolve => setTimeout(resolve, 200))
    ])
  }
}

export default (options: CommonWalletOptions): WalletModule =>
  new GnosisSafeWallet(options)
