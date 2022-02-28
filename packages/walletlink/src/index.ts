import { WalletInit } from '@web3-onboard/common'

function walletLink(options?: { darkMode?: boolean }): WalletInit {
  const { darkMode = false } = options || {}

  return () => {
    return {
      label: 'Coinbase',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ chains, appMetadata }) => {
        const [chain] = chains
        const { name, icon } = appMetadata || {}

        const { WalletLink } = await import('walletlink')

        const base64 = window.btoa(icon || '')
        const appLogoUrl = `data:image/svg+xml;base64,${base64}`

        const instance = new WalletLink({
          appName: name || '',
          appLogoUrl,
          darkMode
        })

        const walletLinkProvider = instance.makeWeb3Provider(
          chain.rpcUrl,
          parseInt(chain.id)
        )

        // patch the chainChanged event
        const on = walletLinkProvider.on.bind(walletLinkProvider)
        walletLinkProvider.on = (event, listener) => {
          on(event, val => {
            if (event === 'chainChanged') {
              listener(`0x${(val as number).toString(16)}`)
              return
            }

            listener(val)
          })

          return walletLinkProvider
        }

        return {
          provider: walletLinkProvider,
          instance
        }
      }
    }
  }
}

export default walletLink
