import type { MetaMaskSDKOptions } from '@metamask/sdk'
import type { WalletInit } from '@web3-onboard/common'
export type { MetaMaskSDKOptions } from '@metamask/sdk'

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
        if (sdk) {
          // Prevent re-initializing instance as it causes issues with MetaMask sdk mobile provider.
          return {
            provider: sdk.getProvider() as any,
            instance: sdk
          }
        }

        const { name, icon } = appMetadata || {}
        const base64 = window.btoa(icon || '')
        const appLogoUrl = `data:image/svg+xml;base64,${base64}`
        const imports = await importPromise

        // Patch issue with MetaMask SDK, remove after SDK is fixed
        localStorage.removeItem('providerType')

        let MetaMaskSDKConstructor
        if (!MetaMaskSDK) {
          // @ts-ignore
          MetaMaskSDKConstructor = metaMask.MetaMaskSDK
        } else {
          MetaMaskSDKConstructor = MetaMaskSDK
        }

        if (!MetaMaskSDKConstructor) {
          throw new Error('Error importing and initializing MetaMask SDK')
        }

        const sdk = new MetaMaskSDKConstructor({
          ...options,
          dappMetadata: {
            name: options.dappMetadata?.name || name || '',
            base64Icon: appLogoUrl
          },
          _source: 'web3-onboard'
        })
        await sdk.init()

        const provider = getProvider(sdk)

        const _request = provider.request
        provider.request = async ({ method, params }) => {
          if (sdk?.isExtensionActive()) {
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
