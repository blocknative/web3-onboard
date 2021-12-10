import { WalletInit } from '@bn-onboard/types'

function gnosis(): WalletInit {
  return () => {
    return {
      label: 'Gnosis Safe',
      getIcon: async () => (await import('./icon')).default,
      getInterface: async ({ chains }) => {
        const { default: SafeAppsSDK } = await import(
          '@gnosis.pm/safe-apps-sdk'
        )
        const { SafeAppProvider } = await import(
          '@gnosis.pm/safe-apps-provider'
        )

        const [chain] = chains

        const opts = {
          whitelistedDomains: [/gnosis-safe.io/]
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
