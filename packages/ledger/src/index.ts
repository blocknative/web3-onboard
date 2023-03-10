import type { WalletInit } from '@web3-onboard/common'
import v1 from './v1'
import v2 from './v2'

export type LedgerOptionsWCv1 = {
  walletConnectVersion?: 1
  enableDebugLogs?: boolean,
  chainId?: number
  bridge?: string
  infuraId?: string
  rpc?: { [chainId: number]: string }
}

export type LedgerOptionsWCv2 = {
  walletConnectVersion: 2
  enableDebugLogs?: boolean,
  projectId: string
  requiredChains?: string[] | number[]
  requiredMethods?: string[]
  optionalMethods?: string[]
  requiredEvents?: string[]
  optionalEvents?: string[]
}

export type LedgerOptions = (
  | LedgerOptionsWCv1
  | LedgerOptionsWCv2
)

export const isHexString = (value: string | number) => {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false
  }

  return true
}

function ledger(options?: LedgerOptions): WalletInit {
  const walletConnectVersion = options?.walletConnectVersion || 1
  return walletConnectVersion === 1 ?
    v1(options as LedgerOptionsWCv1) :
    v2(options as LedgerOptionsWCv2)
}

export default ledger
