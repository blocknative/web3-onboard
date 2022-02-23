import type { WalletInit, EIP1193Provider } from '@web3-onboard/common'

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

        const provider: EIP1193Provider = new SafeAppProvider(
          safe,
          // @ts-ignore
          appsSdk
        )

        provider.removeListener = () => {}

        return {
          provider,
          instance: appsSdk
        }
      }
    }
  }
}

export default gnosis
