import type { Device, ProviderRpcErrorCode } from '@web3-onboard/common'
import type { InjectedProvider, InjectedWalletModule } from './types.js'

export class ProviderRpcError extends Error {
  message: string
  code: ProviderRpcErrorCode | number
  data?: unknown

  constructor(error: Pick<ProviderRpcError, 'message' | 'code' | 'data'>) {
    super(error.message)
    this.message = error.message
    this.code = error.code
    this.data = error.data
  }
}

export const defaultWalletUnavailableMsg = ({
  label,
  externalUrl
}: InjectedWalletModule) =>
  externalUrl
    ? `Please <a href="${externalUrl}" target="_blank">install or switch to</a> ${label} to continue`
    : `Please install or enable ${label} to continue`

export const isWalletAvailable = (
  provider: InjectedProvider,
  checkProviderIdentity: InjectedWalletModule['checkProviderIdentity'],
  device: Device
): boolean => {
  // No injected providers exist.
  if (!provider) {
    return false
  }

  // Many injected providers add their own object into window.
  if (checkProviderIdentity({ provider, device })) {
    return true
  }

  // For multiple injected providers, check providers array
  // example coinbase inj wallet pushes over-ridden wallets
  // into a providers array at window.ethereum
  return !!provider.providers?.some(provider =>
    checkProviderIdentity({ provider, device })
  )
}

export 
function containsExecutableJavaScript(svgString: string): boolean {
  if (!svgString) return false
  // Regular expression to match <script> tags
  const scriptTagRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi

  // Regular expression to match event handler attributes (e.g., onclick, onload)
  const eventHandlerRegex = /\bon[a-z]+\s*=\s*["']?(?:javascript:)?/gi

  // Regular expression to match href or xlink:href attributes containing "javascript:"
  const hrefJavaScriptRegex = /\b(href|xlink:href)\s*=\s*["']?javascript:/gi

  // Check for <script> tags
  if (scriptTagRegex.test(svgString)) {
    return true
  }

  // Check for event handlers
  if (eventHandlerRegex.test(svgString)) {
    return true
  }

  // Check for "javascript:" in href or xlink:href
  if (hrefJavaScriptRegex.test(svgString)) {
    return true
  }

  // No executable JavaScript found
  return false
}
