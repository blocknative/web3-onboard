import type { ProviderRpcErrorCode } from '@web3-onboard/common'
import type { InjectedWalletModule } from './types.js'

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

export const defaultWalletUnavailableMsg = ({ label }: InjectedWalletModule) =>
  `Please install or enable ${label} to continue`
