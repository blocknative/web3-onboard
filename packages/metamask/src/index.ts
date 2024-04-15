import type { WalletInit } from '@web3-onboard/common'
import type { MetaMaskSDK, MetaMaskSDKOptions } from '@metamask/sdk'
import type { createEIP1193Provider } from '@web3-onboard/common'

type ImportSDK = {
  createEIP1193Provider: typeof createEIP1193Provider
  MetaMaskSDKConstructor: typeof MetaMaskSDK
}

const loadImports = async () => {
  if (importPromise) {
    return await importPromise
  }

  const { createEIP1193Provider } = await import('@web3-onboard/common')
  const importedSDK = await import('@metamask/sdk')
  const MetaMaskSDKConstructor =
    // @ts-ignore
    importedSDK.MetaMaskSDK || importedSDK.default.MetaMaskSDK

  if (!MetaMaskSDKConstructor) {
    throw new Error('Error importing and initializing MetaMask SDK')
  }

  return { createEIP1193Provider, MetaMaskSDKConstructor }
}

let importPromise: Promise<ImportSDK> | null = null
let sdk: MetaMaskSDK | null = null

function metamask({
  options
}: {
  options: Partial<MetaMaskSDKOptions>
}): WalletInit {
  return () => {
    importPromise = loadImports().catch(error => {
      throw error
    })

    return {
      label: 'MetaMask',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ appMetadata }) => {
        sdk = (window as any).mmsdk || sdk; // Prevent conflict with existing mmsdk instances

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

        if (
          !imports?.MetaMaskSDKConstructor ||
          !imports?.createEIP1193Provider
        ) {
          throw new Error('Error importing and initializing MetaMask SDK')
        }

        const { createEIP1193Provider, MetaMaskSDKConstructor } = imports

        sdk = new MetaMaskSDKConstructor({
          ...options,
          dappMetadata: {
            name: options.dappMetadata?.name || name || '',
            url: options.dappMetadata?.url || window.location.origin,
            base64Icon: appLogoUrl
          },
          _source: 'web3-onboard'
        })

        await sdk.init();
        const provider = sdk.getProvider();

        const _disconnect = sdk.disconnect
        if(provider) {
          (provider as any).disconnect = () => {
            sdk?.terminate();
          }
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
