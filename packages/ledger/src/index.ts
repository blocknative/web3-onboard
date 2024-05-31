import type { WalletInit } from '@web3-onboard/common'
import v2 from './v2.js'

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

function ledger(options?: LedgerOptionsWCv2): WalletInit {
  return v2(options as LedgerOptionsWCv2)
}

export default ledger
