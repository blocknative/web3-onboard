import type { ProviderRpcErrorCode } from './types.js'

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
