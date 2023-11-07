import type { MetaMaskSDKOptions } from '@metamask/sdk'
import type { WalletInit } from '@web3-onboard/common'
export type { MetaMaskSDKOptions } from '@metamask/sdk'
import type { MetaMaskSDK } from '@metamask/sdk'
import type {createEIP1193Provider} from '@web3-onboard/common'

type ImportSDK = { createEIP1193Provider: typeof createEIP1193Provider, MetaMaskSDKConstructor: typeof MetaMaskSDK }

const loadImports = async () => {
  if(importPromise) {
    return await importPromise
  }

  const { createEIP1193Provider } = await import('@web3-onboard/common')
  const sdk = await import('@metamask/sdk')
    // @ts-ignore
  const MetaMaskSDKConstructor = sdk.MetaMaskSDK || sdk.default.MetaMaskSDK;

  if (!MetaMaskSDKConstructor) {
    throw new Error('Error importing and initializing MetaMask SDK');
  }

  return { createEIP1193Provider, MetaMaskSDKConstructor }
}

let importPromise : Promise<ImportSDK> | null = null

function metamask({
  options
}: {
  options: Partial<MetaMaskSDKOptions>
}): WalletInit {

  return () => {
    importPromise = loadImports().catch((error) => {
      throw error
    });

    return {
      label: 'MetaMask',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ appMetadata }) => {
        const { name, icon } = appMetadata || {}
        const base64 = window.btoa(icon || '')
        const appLogoUrl = `data:image/svg+xml;base64,${base64}`
        const imports = await importPromise

        // Patch issue with MetaMask SDK, remove after SDK is fixed
        localStorage.removeItem('providerType')

        if(!imports?.MetaMaskSDKConstructor || !imports?.createEIP1193Provider) {
          throw new Error('Error importing and initializing MetaMask SDK')
        }

        const { createEIP1193Provider, MetaMaskSDKConstructor } = imports
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
            sdk.terminate();
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
