import type { EIP1193Provider } from '@web3-onboard/common'
import type en from './i18n/en.json'
import type SDK from 'bnc-sdk'
import type { SimulationTransaction } from 'bnc-sdk'

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

export type TransactionForSim = SimulationTransaction & {
  data?: string
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

export type Locale = string
export type i18nOptions = Record<Locale, i18n>
export type i18n = typeof en

export type DeviceNotBrowser = {
  type: null
  os: null
  browser: null
}
