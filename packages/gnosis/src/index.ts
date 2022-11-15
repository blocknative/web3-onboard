import { WalletInit } from '@web3-onboard/common'

type GnosisOptions = {
  whitelistedDomains: RegExp[]
}

function gnosis(options?: GnosisOptions): WalletInit {
  const { whitelistedDomains = [
    /^https:\/\/gnosis-safe\.io$/,
    /^https:\/\/app\.safe\.global$/,
    /^https:\/\/safe\.global$/
  ] } = options || {}

  return () => {
    const loadedInIframe = window.self !== window.top

    return loadedInIframe
      ? {
          label: 'Safe',
          getIcon: async () => (await import('./icon.js')).default,
          getInterface: async () => {
            const { default: SafeAppsSDK } = await import(
              '@gnosis.pm/safe-apps-sdk'
            )

            const { SafeAppProvider } = await import(
              '@gnosis.pm/safe-apps-provider'
            )

            const { createEIP1193Provider } = await import(
              '@web3-onboard/common'
            )

            const SafeAppProviderConstructor =
              // @ts-ignore
              SafeAppsSDK.default || SafeAppsSDK

            const opts = {
              whitelistedDomains
            }

            const appsSdk = new SafeAppProviderConstructor(opts)

            const safe = await Promise.race([
              appsSdk.safe.getInfo(),
              new Promise(resolve => setTimeout(resolve, 200))
            ])

            if (!safe) {
              throw new Error(
                `App must be loaded in a Safe App context, head to <a href="https://gnosis-safe.io/app">the Safe</a> and open this website as an app.`
              )
            }

            const provider = new SafeAppProvider(
              safe,
              // @ts-ignore
              appsSdk
            )

            const patchedProvider = createEIP1193Provider(provider, {
              eth_requestAccounts: () => Promise.resolve([safe.safeAddress])
            })

            return {
              provider: patchedProvider,
              instance: appsSdk
            }
          }
        }
      : []
  }
}

export default gnosis
