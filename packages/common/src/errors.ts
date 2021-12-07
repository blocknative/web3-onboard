import type { ProviderRpcErrorCode } from '@bn-onboard/types'

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

export enum ErrorCodes {
  ACCOUNT_ACCESS_REJECTED = 4001,
  ACCOUNT_ACCESS_ALREADY_REQUESTED = -32002
}
