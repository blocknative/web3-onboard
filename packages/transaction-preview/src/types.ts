import { EIP1193Provider } from "@web3-onboard/common"

export type RequestEndpoint = 'blockPrices'

export type InitOptions = {
  apiKey: string
  walletProvider: EIP1193Provider
  network?: string //defaults to mainnet for now
}

export interface TransactionObject {
  to: string
  from: string
  value: string
  input: string
  gas: string

  // Either include gasPrice or maxFeePerGas and maxPriorityFeePerGas
  // to differentiate between a type 0 and type 2 (EIP1559) transaction
  gasPrice?: string
  maxFeePerGas?: string
  maxPriorityFeePerGas?: string
}

export type SimPlatformResponse = {
  internalTransactions: TransactionObject[][]
  netBalanceChanges: NetBalanceChange[][]
  simDetails: SimDetails
  contractCall: ContractCall[]
  error: unknown[]
  system: string
  network: string
  // gasUsed: number
}

interface NetBalanceChange {
  address: string
  balanceChanges: BalanceChange[]
}

interface BalanceChange {
  delta: string
  asset: Asset
  breakdown: Breakdown[]
}

interface Asset {
  type: string
  symbol: string
  contractAddress: string
}

interface Breakdown {
  counterparty: string
  amount: string
}

interface SimDetails {
  blockNumber: number
  performanceProfile: PerformanceProfile
  e2eMs: number
}

interface PerformanceProfile {
  breakdown: SimDetailsBreakdown[]
}

interface SimDetailsBreakdown {
  label: string
  timeStamp: string
}

interface ContractCall {
  status: string
  value: ContractCallValue[]
}

interface ContractCallValue {
  methodName: string
  params: {
    amount: string
    spender: string
  }
  contractAddress: string
  contractType: string
  contractAlias: string
  contractDecimals: string
  contractName: string
}
