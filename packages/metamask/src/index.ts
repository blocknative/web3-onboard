import type { Chain, WalletInit } from '@web3-onboard/common'
import type {
  createEVMClient as CreateEVMClientFn,
  getInfuraRpcUrls as GetInfuraRpcUrlsFn,
  MetamaskConnectEVM
} from '@metamask/connect-evm'

/**
 * Public Mainnet RPC used as a last-resort fallback when no
 * `supportedNetworks` can be derived from user options or the chains web3-
 * onboard was configured with. `@metamask/connect-evm` requires the map to
 * contain at least one chain.
 */
const FALLBACK_MAINNET_RPC = 'https://1.rpc.thirdweb.com'

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
  /**
   * When `true`, prefer the MetaMask browser extension over the mobile/QR
   * flow. Maps to `ui.preferExtension`. The default mirrors the new
   * `@metamask/connect-evm` default (extension is preferred when installed).
   */
  extensionOnly?: boolean
  /** Maps to `ui.headless` in `@metamask/connect-evm`. */
  headless?: boolean
  /**
   * When `true`, allow `@metamask/connect-evm` to render its own
   * install/QR modal. Defaults to `false` because web3-onboard already
   * supplies the surrounding wallet-selection UI and a second modal would
   * sit on top of it.
   */
  showInstallModal?: boolean
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
    // Cache the dynamic import so we only fetch the SDK once per page load.
    // On rejection (e.g. transient network failure during `import(...)`)
    // clear the cache so the next `getInterface` call can retry instead of
    // permanently surfacing the original error.
    if (!importPromise) {
      importPromise = loadImports().catch(error => {
        importPromise = null
        throw error
      })
    }

    return {
      label: 'MetaMask',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ appMetadata, chains }) => {
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
          fallbackBase64Icon: appLogoUrl,
          chains
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

/**
 * Build a `{ '0xHexChainId': rpcUrl }` map from web3-onboard's `chains`
 * config, normalizing chain IDs to lower-case hex (the format
 * `@metamask/connect-evm` expects).
 */
function chainsToRpcMap(chains: Chain[]): Record<string, string> {
  const map: Record<string, string> = {}
  for (const chain of chains) {
    if (!chain.rpcUrl) continue
    const hexId = toHexChainId(chain.id)
    if (!hexId) continue
    map[hexId] = chain.rpcUrl
  }
  return map
}

function toHexChainId(id: string | number): string | null {
  if (typeof id === 'number') {
    return Number.isFinite(id) ? `0x${id.toString(16)}` : null
  }
  const trimmed = id.trim().toLowerCase()
  if (trimmed.startsWith('0x')) return trimmed
  if (/^\d+$/.test(trimmed)) {
    return `0x${BigInt(trimmed).toString(16)}`
  }
  return null
}

function mapLegacyOptions({
  options,
  getInfuraRpcUrls,
  fallbackName,
  fallbackBase64Icon,
  chains
}: {
  options: Partial<MetaMaskSDKOptions>
  getInfuraRpcUrls: typeof GetInfuraRpcUrlsFn
  fallbackName?: string
  fallbackBase64Icon: string
  chains: Chain[]
}): EvmClientOptions {
  // `api.supportedNetworks` must be a non-empty `Record<hexChainId, rpcUrl>`.
  // We derive it from (in priority order):
  //   1. `options.infuraAPIKey` -> `getInfuraRpcUrls`
  //   2. `options.readonlyRPCMap`
  //   3. RPC URLs of the chains web3-onboard itself was configured with
  //   4. A public Mainnet RPC, so the client always has at least one chain.
  const fromInfura =
    typeof options.infuraAPIKey === 'string' && options.infuraAPIKey
      ? getInfuraRpcUrls({ infuraApiKey: options.infuraAPIKey })
      : {}

  const fromChains = chainsToRpcMap(chains)

  const supportedNetworks: Record<string, string> = {
    ...fromInfura,
    ...fromChains,
    ...(options.readonlyRPCMap ?? {})
  }

  if (Object.keys(supportedNetworks).length === 0) {
    supportedNetworks['0x1'] = FALLBACK_MAINNET_RPC
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
    api: {
      supportedNetworks: supportedNetworks as Record<`0x${string}`, string>
    }
  }

  // Build the `ui` block.
  //
  // - The legacy `extensionOnly` option is intentionally only honored when
  //   set to `true`, mapping to `preferExtension: true`. The legacy default
  //   (`false`) meant "fall back to mobile/QR if no extension"; in the new
  //   client that behavior is the default of `preferExtension: true` (use
  //   the extension when present, otherwise the modal). Mapping
  //   `extensionOnly: false` to `preferExtension: false` would force the
  //   install/QR modal to open even when the extension is installed, which
  //   matches what users have been reporting.
  // - `showInstallModal` defaults to `false` because web3-onboard already
  //   renders its own connect modal; layering the MetaMask install modal on
  //   top breaks click-through.
  evmOptions.ui = {
    ...(typeof options.headless === 'boolean'
      ? { headless: options.headless }
      : {}),
    ...(options.extensionOnly === true ? { preferExtension: true } : {}),
    showInstallModal:
      typeof options.showInstallModal === 'boolean'
        ? options.showInstallModal
        : false
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
