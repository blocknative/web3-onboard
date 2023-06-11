import type { WalletInit } from '@web3-onboard/common'
import { EthereumProviderOptions } from '@walletconnect/ethereum-provider/dist/types/EthereumProvider'
import v1 from './v1.js'
import v2 from './v2.js'

export type WalletConnectOptions = {
  /**
   * Optional function to handle WalletConnect URI when it becomes available
   */
  handleUri?: (uri: string) => Promise<unknown>
  connectFirstChainId?: boolean
  bridge?: string
  qrcodeModalOptions?: {
    mobileLinks: string[]
  }
} & (
  | {
      /**
       * Defaults to version: 1 - this behavior will be deprecated after the WalletConnect v1 sunset
       */
      version?: 1
    }
  | {
      /**
       * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
       */
      projectId: string
      /**
       * Defaults to version: 1 - this behavior will be deprecated after the WalletConnect v1 sunset
       */
      version: 2
      /**
       * List of Required Chain(s) ID for wallets to support in number format (integer or hex)
       * Defaults to [1] - Ethereum
       * The chains defined within the web3-onboard config will define the
       * optional chains for the WalletConnect module
       */
      requiredChains?: number[] | undefined
      /**
       * `undefined` by default, see https://docs.walletconnect.com/2.0/web/walletConnectModal/options
       */
      qrModalOptions?: EthereumProviderOptions['qrModalOptions']
    }
)

export const isHexString = (value: string | number) => {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false
  }

  return true
}

function walletConnect(options?: WalletConnectOptions): WalletInit {
  const version = (options && options.version) || 1
  return version === 1 ? v1(options) : v2(options)
}

export default walletConnect
