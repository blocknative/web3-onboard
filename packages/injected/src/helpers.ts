import {
  ProviderRpcErrorCode,
  WalletModule,
  ProviderLabel
} from '@onboard/types'

export class ProviderRpcError extends Error {
  message: string
  code: ProviderRpcErrorCode | number
  data?: unknown

  constructor(error: Pick<ProviderRpcError, 'message' | 'code' | 'data'>) {
    super(error.message)
    this.message = error.message
    this.code = error.code
    this.data = error?.data
  }
}

export const remove =
  ({ detected, metamask }: { detected: boolean; metamask: boolean }) =>
  ({ label }: Partial<WalletModule>) =>
    !(
      (label === ProviderLabel.Detected && detected) ||
      (label === ProviderLabel.MetaMask && metamask)
    )
