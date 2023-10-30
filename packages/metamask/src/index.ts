import type { MetaMaskSDKOptions } from '@metamask/sdk'
import type { WalletInit } from '@web3-onboard/common'

function metamask({
  options
}: {
  options: Partial<MetaMaskSDKOptions>
}): WalletInit {
  return () => {
    return {
      label: 'MetaMask',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ appMetadata }) => {
        const { name, icon } = appMetadata || {}
        const base64 = window.btoa(icon || '')
        const appLogoUrl = `data:image/svg+xml;base64,${base64}`
        const { createEIP1193Provider } = await import('@web3-onboard/common')
        const { default: metaMask, MetaMaskSDK } = await import('@metamask/sdk')

        const MetaMaskSDKConstructor = (
          MetaMaskSDK === undefined
            ? (metaMask as any)
            : MetaMaskSDK
        ) as typeof MetaMaskSDK

        const sdk = new MetaMaskSDKConstructor({
          ...options,
          dappMetadata: {
            name: options.dappMetadata?.name || name || '',
            base64Icon: appLogoUrl
          },
          _source: 'web3-onboard'
        })
        await sdk.init()

        const getProvider = () => {
          const provider = createEIP1193Provider(sdk.getProvider(), {})
          provider.disconnect = () => {
            sdk.terminate()
          }
          return provider
        }
        const provider = getProvider()

        const _request = provider.request
        provider.request = async ({ method, params }) => {
          if (sdk.isExtensionActive()) {
            return (window.extension as any).request({ method, params })
          }
          return _request({ method, params }) as Promise<any>
        }

        return {
          provider,
          instance: sdk
        }
      }
    }
  }
}

export default metamask
