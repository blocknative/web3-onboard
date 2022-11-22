import type { EIP1193Provider } from '@web3-onboard/common'
import type en from './i18n/en.json'
import type SDK from 'bnc-sdk'

export type TransactionPreviewModule = (
  options: TransactionPreviewOptions
) => TransactionPreviewAPI

export type TransactionPreviewAPI = {
  /**
   * Pass this method a standard EIP1193 provider
   * (such as an injected wallet from window.ethereum)
   * and it will be patched to allow for transaction previewing
   */
  patchProvider: (provider: PatchedEIP1193Provider) => PatchedEIP1193Provider
  /**
   * Pass this method a standard EIP1193 provider
   * (such as an injected wallet from window.ethereum)
   * and it will be patched to allow for transaction previewing
   */
  init: (initializationOptions: TransactionPreviewInitOptions) => void
}

export type PatchedEIP1193Provider = EIP1193Provider & { simPatched: boolean }

export interface ProviderReq {
  method: string
  params?: Array<unknown>
}

export type RequestOptions = Pick<TransactionPreviewInitOptions, 'apiKey'>

export type TransactionPreviewInitOptions = {
  /**
   * Blocknative API key (https://explorer.blocknative.com/account)
   */
  apiKey: string
  /**
   * Your Blocknative SDK instance
   * */
  sdk: SDK
  /**
   * Optional dom query string to mount UI to
   * */
  containerElement: string
}

export type TransactionPreviewOptions = {
  /**
   * Optional requirement for user to accept transaction balance changes
   * prior to sending the transaction to the wallet
   * */
  requireTransactionApproval?: boolean
  /**
   * An optional internationalization object that defines the display
   * text for different locales. Can also be used to override the default text.
   * To override the default text, pass in a object for the en locale
   */
  i18n?: i18nOptions
}

export interface TransactionObject {
  data?: string
  from: string
  gas?: string
  gasLimit?: string
  to: string
  chainId: number
  value?: string
  nonce?: string

  /**
   *  Either include gasPrice or maxFeePerGas and maxPriorityFeePerGas
   * to differentiate between a type 0 and type 2 (EIP1559) transaction
   */
  gasPrice?: string
  maxFeePerGas?: string
  maxPriorityFeePerGas?: string
}

// TODO: Remove these after importing from SDK after release
export type SimPlatformResponse = {
  contractCall: ContractCall[]
  error: unknown[]
  gasUsed: number[]
  internalTransactions: TransactionObject[][]
  netBalanceChanges: NetBalanceChange[][]
  network: string
  simDetails: SimDetails
  system: string
  status: string
  simulatedBlockNumber: number
  transactions: TransactionObject[]
}

export interface NetBalanceChange {
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
    _amount?: string
    _spender?: string
    amountIn?: string
    amountOutMin?: string
    deadline?: string
    path?: string[]
    to?: string
  }
  contractAddress: string
  contractType?: string
  contractAlias?: string
  contractDecimals?: string
  contractName?: string
}

export type Locale = string
export type i18nOptions = Record<Locale, i18n>
export type i18n = typeof en

export type DeviceNotBrowser = {
  type: null
  os: null
  browser: null
}
