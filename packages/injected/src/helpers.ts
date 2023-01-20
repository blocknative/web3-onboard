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

export const defaultWalletUnavailableMsg = ({ label }: InjectedWalletModule) =>
  `Please install or enable ${label} to continue`

export const isWalletAvailable = (
  provider: InjectedProvider,
  checkProviderIdentity: InjectedWalletModule['checkProviderIdentity'],
  device: Device
): boolean => {
  if (provider && provider.providers && Array.isArray(provider.providers)) {
    return !!provider.providers.filter(provider =>
      checkProviderIdentity({ provider, device })
    ).length
  } else {
    return checkProviderIdentity({ provider, device })
  }
}
