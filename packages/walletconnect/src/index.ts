import type { WalletInit } from '@web3-onboard/common'
import v1 from './v1'
import v2 from './v2'

export type WalletConnectOptions = {
  connectFirstChainId?: boolean
  bridge?: string
  qrcodeModalOptions?: {
    mobileLinks: string[]
  }
} & (
  | {
      version?: '1'
    }
  | {
      /**
       * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
       */
      projectId: string
      version: '2'
    }
)

export const isHexString = (value: string | number) => {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false
  }

  return true
}

function walletConnect(options?: WalletConnectOptions): WalletInit {
  const version = options?.version || '1'
  return version === '1' ? v1(options) : v2(options)
}

export default walletConnect
