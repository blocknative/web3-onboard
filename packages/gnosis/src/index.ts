import { WalletInit } from '@bn-onboard/common'

type GnosisOptions = {
  whitelistedDomains: RegExp[]
}

function gnosis(options?: GnosisOptions): WalletInit {
  const { whitelistedDomains = [/gnosis-safe.io/] } = options || {}

  return () => {
    return {
      label: 'Gnosis Safe',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => {
        const { default: SafeAppsSDK } = await import(
          '@gnosis.pm/safe-apps-sdk'
        )

        const { SafeAppProvider } = await import(
          '@gnosis.pm/safe-apps-provider'
        )

        const opts = {
          whitelistedDomains
        }

        const appsSdk = new SafeAppsSDK(opts)

        const safe = await appsSdk.safe.getInfo()
        const provider = new SafeAppProvider(safe, appsSdk)

        return {
          provider,
          instance: appsSdk
        }
      }
    }
  }
}

export default gnosis
