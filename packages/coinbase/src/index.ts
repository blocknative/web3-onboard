import { WalletInit } from '@web3-onboard/common'

function coinbaseWallet(options?: { darkMode?: boolean }): WalletInit {
  const { darkMode = false } = options || {}

  return ({ device }) => {
    return device.type === 'mobile'
      ? {
          label: 'Coinbase',
          getIcon: async () => (await import('./icon.js')).default,
          getInterface: async ({ chains, appMetadata }) => {
            const [chain] = chains
            const { name, icon } = appMetadata || {}

            const { CoinbaseWalletSDK } = await import('@coinbase/wallet-sdk')

            const base64 = window.btoa(icon || '')
            const appLogoUrl = `data:image/svg+xml;base64,${base64}`

            const instance = new CoinbaseWalletSDK({
              appName: name || '',
              appLogoUrl,
              darkMode
            })

            const coinbaseWalletProvider = instance.makeWeb3Provider(
              chain.rpcUrl,
              parseInt(chain.id)
            )

            // patch the chainChanged event
            const on = coinbaseWalletProvider.on.bind(coinbaseWalletProvider)
            coinbaseWalletProvider.on = (event, listener) => {
              on(event, val => {
                if (event === 'chainChanged') {
                  listener(`0x${(val as number).toString(16)}`)
                  return
                }

                listener(val)
              })

              return coinbaseWalletProvider
            }

            return {
              provider: coinbaseWalletProvider,
              instance
            }
          }
        }
      : null
  }
}

export default coinbaseWallet
