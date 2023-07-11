import type { WalletInit } from '@web3-onboard/common'
import v1 from './v1.js'
import v2 from './v2.js'

export type LedgerOptionsWCv1 = {
  /**
   * @deprecated
   * Version 1 of WalletConnect has been deprecated by the WC team and the WC bridge is not available.
   * To use version 1 a custom bridge url will need to be provided.
   * Support will be completely remove from Web3-Onboard in the future
   */
  walletConnectVersion?: 1
  enableDebugLogs?: boolean
  chainId?: number
  bridge?: string
  infuraId?: string
  rpc?: { [chainId: number]: string }
}

export type LedgerOptionsWCv2 = {
  walletConnectVersion: 2
  enableDebugLogs?: boolean
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: string
  /**
   * List of Optional Chain(s) ID for wallets to support in number format (integer or hex)
   * Defaults to the chains provided within the web3-onboard init chain property
   */
  requiredChains?: string[] | number[]
  requiredMethods?: string[]
  /**
   * Additional methods to be added to the default list of ['eth_sendTransaction',  'eth_signTransaction',  'personal_sign',  'eth_sign',  'eth_signTypedData',  'eth_signTypedData_v4']
   * Passed methods to be included along with the defaults methods - see https://docs.walletconnect.com/2.0/web/walletConnectModal/options
   */
  optionalMethods?: string[]
  requiredEvents?: string[]
  optionalEvents?: string[]
}

export type LedgerOptions = LedgerOptionsWCv1 | LedgerOptionsWCv2

export const isHexString = (value: string | number) => {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false
  }

  return true
}

function ledger(options?: LedgerOptions): WalletInit {
  const walletConnectVersion = options?.walletConnectVersion || 2
  return walletConnectVersion === 1
    ? v1(options as LedgerOptionsWCv1)
    : v2(options as LedgerOptionsWCv2)
}

export default ledger
