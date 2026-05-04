import type { WalletInit } from '@web3-onboard/common'
import type {
  createEVMClient as CreateEVMClientFn,
  getInfuraRpcUrls as GetInfuraRpcUrlsFn,
  MetamaskConnectEVM
} from '@metamask/connect-evm'

/**
 * Legacy MetaMask SDK options that this module continues to accept for
 * backwards compatibility. Each field is mapped to its
 * `@metamask/connect-evm` equivalent inside `getInterface` so callers can
 * upgrade transparently without changing their integration code.
 */
export type MetaMaskSDKOptions = {
  dappMetadata?: {
    name?: string
    url?: string
    iconUrl?: string
    base64Icon?: string
  }
  /** Maps to `ui.preferExtension` in `@metamask/connect-evm`. */
  extensionOnly?: boolean
  /** Maps to `ui.headless` in `@metamask/connect-evm`. */
  headless?: boolean
  /** Used to populate `api.supportedNetworks` via `getInfuraRpcUrls`. */
  infuraAPIKey?: string
  /** Merged into `api.supportedNetworks`. */
  readonlyRPCMap?: Record<string, string>
  /** Maps to `mobile.preferredOpenLink`. */
  openDeeplink?: (deeplink: string) => void
  /** Maps to `mobile.useDeeplink`. */
  useDeeplink?: boolean
  // Allow legacy/forward-compat fields (e.g. `i18nOptions`, `_source`,
  // `enableAnalytics`) without a type error. They are silently ignored.
  [key: string]: unknown
}

type EvmClientOptions = Parameters<typeof CreateEVMClientFn>[0]

type ConnectEvmImports = {
  createEVMClient: typeof CreateEVMClientFn
  getInfuraRpcUrls: typeof GetInfuraRpcUrlsFn
}

let importPromise: Promise<ConnectEvmImports> | null = null
let client: MetamaskConnectEVM | null = null

const loadImports = async (): Promise<ConnectEvmImports> => {
  const mmConnect = await import('@metamask/connect-evm')

  const createEVMClient =
    // @ts-ignore — handle both ESM and CJS default-export shapes
    mmConnect.createEVMClient || mmConnect.default?.createEVMClient

  const getInfuraRpcUrls =
    // @ts-ignore
    mmConnect.getInfuraRpcUrls || mmConnect.default?.getInfuraRpcUrls

  if (!createEVMClient) {
    throw new Error('Error importing and initializing @metamask/connect-evm')
  }

  return { createEVMClient, getInfuraRpcUrls }
}

function metamask({
  options
}: {
  options: Partial<MetaMaskSDKOptions>
}): WalletInit {
  return () => {
    importPromise = importPromise ?? loadImports().catch(error => {
      throw error
    })

    return {
      label: 'MetaMask',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ appMetadata }) => {
        // Reuse the existing client/provider if we have already initialized
        // it. Re-initializing would needlessly reset state and historically
        // caused issues with the MetaMask mobile provider.
        if (client) {
          const existingProvider = client.getProvider()
          attachDisconnectShim(existingProvider)
          return {
            provider: existingProvider as any,
            instance: client
          }
        }

        const imports = await importPromise

        if (!imports?.createEVMClient) {
          throw new Error(
            'Error importing and initializing @metamask/connect-evm'
          )
        }

        const { createEVMClient, getInfuraRpcUrls } = imports

        const { name, icon } = appMetadata || {}
        const base64 = window.btoa(icon || '')
        const appLogoUrl = `data:image/svg+xml;base64,${base64}`

        const evmOptions = mapLegacyOptions({
          options,
          getInfuraRpcUrls,
          fallbackName: name,
          fallbackBase64Icon: appLogoUrl
        })

        client = await createEVMClient(evmOptions)

        const provider = client.getProvider()
        attachDisconnectShim(provider)

        return {
          provider: provider as any,
          instance: client
        }
      }
    }
  }
}

function attachDisconnectShim(provider: unknown): void {
  // Web3-Onboard expects a `disconnect` method on the provider so it can
  // tear down the wallet session when the user disconnects from the dapp.
  // The MetaMask Connect EVM client exposes this via `client.disconnect()`.
  ;(provider as { disconnect?: () => void }).disconnect = () => {
    void client?.disconnect()
  }
}

function mapLegacyOptions({
  options,
  getInfuraRpcUrls,
  fallbackName,
  fallbackBase64Icon
}: {
  options: Partial<MetaMaskSDKOptions>
  getInfuraRpcUrls: typeof GetInfuraRpcUrlsFn
  fallbackName?: string
  fallbackBase64Icon: string
}): EvmClientOptions {
  const supportedNetworks: Record<string, string> = {
    ...(typeof options.infuraAPIKey === 'string' && options.infuraAPIKey
      ? getInfuraRpcUrls({ infuraApiKey: options.infuraAPIKey })
      : {}),
    ...(options.readonlyRPCMap ?? {})
  }

  const evmOptions: EvmClientOptions = {
    dapp: {
      name: options.dappMetadata?.name || fallbackName || '',
      url: options.dappMetadata?.url || window.location.origin,
      // Mirror the legacy module's behavior: the rendered web3-onboard logo
      // (`appLogoUrl`) is always used as the dapp icon, just like the old
      // `MetaMaskSDK` integration that always set `base64Icon: appLogoUrl`.
      base64Icon: fallbackBase64Icon
    },
    // `api.supportedNetworks` is required by `createEVMClient`. Pass the
    // merged Infura + custom RPC map (or an empty object when neither is
    // provided — the client still works, with read-only requests routed
    // through MetaMask's default transport).
    api: { supportedNetworks: supportedNetworks as Record<`0x${string}`, string> }
  }

  if (
    typeof options.headless === 'boolean' ||
    typeof options.extensionOnly === 'boolean'
  ) {
    evmOptions.ui = {
      ...(typeof options.headless === 'boolean'
        ? { headless: options.headless }
        : {}),
      // `extensionOnly: true` semantically meant "prefer the extension when
      // available" in the legacy SDK, which is exactly what
      // `ui.preferExtension` controls in `@metamask/connect-evm`.
      ...(typeof options.extensionOnly === 'boolean'
        ? { preferExtension: options.extensionOnly }
        : {})
    }
  }

  if (
    typeof options.openDeeplink === 'function' ||
    typeof options.useDeeplink === 'boolean'
  ) {
    evmOptions.mobile = {
      ...(typeof options.openDeeplink === 'function'
        ? { preferredOpenLink: options.openDeeplink }
        : {}),
      ...(typeof options.useDeeplink === 'boolean'
        ? { useDeeplink: options.useDeeplink }
        : {})
    }
  }

  return evmOptions
}

export default metamask
