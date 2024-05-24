import type {
  EIP1193Provider,
  WalletInit,
  WalletInterface
} from '@web3-onboard/common'

function coinbaseWallet({
  supportedWalletType = 'all',
  darkMode = false,
  enableMobileWalletLink = false,
  reloadOnDisconnect = true
}: {
  /** @deprecated Deprecated after version 2.2.7 of @web3-onboard/coinbase Use dark theme */
  darkMode?: boolean
  /** @deprecated Deprecated after version 2.2.7 of @web3-onboard/coinbase whether to connect mobile web app via WalletLink, defaults to false */
  enableMobileWalletLink?: boolean
  /** @deprecated Deprecated after version 2.2.7 of @web3-onboard/coinbase whether or not to reload dapp automatically after disconnect, defaults to true */
  reloadOnDisconnect?: boolean
  /** Type of Coinbase wallets to support - options : 'all' | 'smartWalletOnly' | 'eoaOnly' - Default to `all` */
  supportedWalletType?: 'all' | 'smartWalletOnly' | 'eoaOnly'
} = {}): WalletInit {
  return () => {
    return {
      label: 'Coinbase Wallet',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({
        chains,
        appMetadata
      }): Promise<WalletInterface> => {
        if (enableMobileWalletLink || reloadOnDisconnect) {
          console.warn(
            'enableMobileWalletLink and reloadOnDisconnect are deprecated after version 2.2.7 of @web3-onboard/coinbase'
          )
        }
        const { name, icon } = appMetadata || {}

        // according to https://github.com/wagmi-dev/wagmi/issues/383
        // @coinbase/wallet-sdk export double default fields
        // so we need to detect it to get the real constructor
        const { default: CoinbaseWalletSDK } = await import(
          '@coinbase/wallet-sdk'
        )
        const CoinbaseWalletSDKConstructor = (
          (CoinbaseWalletSDK as any).default
            ? (CoinbaseWalletSDK as any).default
            : CoinbaseWalletSDK
        ) as typeof CoinbaseWalletSDK

        const base64 = window.btoa(icon || '')
        const appLogoUrl = `data:image/svg+xml;base64,${base64}`

        const appChainIds = chains.map(({ id }) => parseInt(id, 16))

        const instance = new CoinbaseWalletSDKConstructor({
          appName: name || '',
          appLogoUrl,
          appChainIds
        })

        const coinbaseWalletProvider = instance.makeWeb3Provider({
          options: supportedWalletType
        })

// patch the chainChanged event
const on = coinbaseWalletProvider.on.bind(coinbaseWalletProvider)
console.log('coinbaseWalletProvider', coinbaseWalletProvider)
on('chainChanged', (chainId: string) => {
  console.log('chainChanged in cb provider', chainId)
})
on('connect', (chainId: any) => {
  console.log('connect in cb provider', chainId)
})
on('accountsChanged', (chainId: any) => {
  console.log('accountsChanged in cb provider', chainId)
})
        coinbaseWalletProvider.on = (event, listener) => {
          console.log(event, listener)
          // @ts-ignore
          on(event, val => {
            console.log('val', val)
            if (event === 'chainChanged') {
              const hexVal = `0x${val.toString(16)}`
              console.log(val)
              // @ts-ignore
              listener(hexVal)
              return
            }

            listener(val)
          })

          return coinbaseWalletProvider
        }

        return {
          provider: coinbaseWalletProvider as EIP1193Provider,
          instance
        }
      }
    }
  }
}

export default coinbaseWallet
