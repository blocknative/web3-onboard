import type { SvelteComponent } from 'svelte'

import type {
  AppMetadata,
  Device,
  WalletInit,
  EIP1193Provider,
  WalletModule,
  Chain,
  TokenSymbol
} from '@web3-onboard/common'

import type setChain from './chain'
import type connect from './connect'
import type disconnect from './disconnect'
import type { state } from './store'
import type en from './i18n/en.json'

export interface InitOptions {
  dappId?: string
  wallets: WalletInit[]
  chains: Chain[]
  appMetadata?: AppMetadata
  i18n?: i18nOptions
  accountCenter?: AccountCenterOptions
  notify?: NotifyInitOptions
}

export interface OnboardAPI {
  connectWallet: typeof connect
  disconnectWallet: typeof disconnect
  setChain: typeof setChain
  state: typeof state
}
export interface ConnectOptions {
  autoSelect?: { label: string; disableModals: boolean }
}

export interface ConnectOptionsString {
  autoSelect?: string
}

export interface DisconnectOptions {
  label: string // wallet name to disconnect
}

export interface WalletWithLoadedIcon extends Omit<WalletModule, 'getIcon'> {
  icon: string
}

export interface WalletWithLoadingIcon
  extends Omit<WalletWithLoadedIcon, 'icon'> {
  icon: Promise<string>
}

export type ConnectedChain = {
  id: Chain['id']
  namespace: Chain['namespace']
}

export interface WalletState {
  label: string //  wallet name
  icon: string // wallet icon svg string
  provider: EIP1193Provider
  accounts: Account[]
  // in future it will be possible that a wallet
  // is connected to multiple chains at once
  chains: ConnectedChain[]
  instance?: unknown
}

export type Account = {
  address: Address
  ens: Ens | null
  balance: Balances | null
}

export type Balances = Record<TokenSymbol, string> | null

export interface Ens {
  name: string
  avatar: Avatar | null
  contentHash: string | null
  getText: (key: string) => Promise<string | undefined>
}

export type Avatar = {
  url: string
  linkage: Array<{ type: string; content: string }>
}

export type Address = string

export interface AppState {
  chains: Chain[]
  walletModules: WalletModule[]
  wallets: WalletState[]
  accountCenter: AccountCenter
  locale: Locale
  notify: NotifyOptions
  notifications: NotificationObject[]
}

export type InternalState = {
  svelteInstance: SvelteComponent | null
  appMetadata: AppMetadata | null
  device: Device | null
}

export type Locale = string
export type i18nOptions = Record<Locale, i18n>
export type i18n = typeof en

export type AccountCenterPosition =
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft'
  | 'topLeft'

export type AccountCenter = {
  enabled: boolean
  position?: AccountCenterPosition
  expanded?: boolean
  minimal?: boolean
}

export type AccountCenterOptions = {
  desktop: Omit<AccountCenter, 'expanded'>
  mobile: Omit<AccountCenter, 'expanded'>
}

// ==== ACTIONS ==== //
export type Action =
  | AddChainsAction
  | AddWalletAction
  | UpdateWalletAction
  | RemoveWalletAction
  | ResetStoreAction
  | UpdateAccountAction
  | UpdateAccountCenterAction
  | UpdateNotifyAction
  | UpdateNotificationsAction
  | SetWalletModulesAction
  | SetLocaleAction

export type AddChainsAction = { type: 'add_chains'; payload: Chain[] }
export type AddWalletAction = { type: 'add_wallet'; payload: WalletState }

export type UpdateWalletAction = {
  type: 'update_wallet'
  payload: { id: string } & Partial<WalletState>
}

export type RemoveWalletAction = {
  type: 'remove_wallet'
  payload: { id: string }
}

export type ResetStoreAction = {
  type: 'reset_store'
  payload: unknown
}

export type UpdateAccountAction = {
  type: 'update_account'
  payload: { id: string; address: string } & Partial<Account>
}

export type UpdateAccountCenterAction = {
  type: 'update_account_center'
  payload: AccountCenter | Partial<AccountCenter>
}

export type UpdateNotifyAction = {
  type: 'update_notify'
  payload: NotifyOptions | Partial<NotifyOptions>
}

export type UpdateNotificationsAction = {
  type: 'update_notifications'
  payload: NotificationObject[]
}

export type SetWalletModulesAction = {
  type: 'set_wallet_modules'
  payload: WalletModule[]
}

export type SetLocaleAction = {
  type: 'set_locale'
  payload: string
}

// ==== MISC ==== //
export type ChainStyle = {
  icon: string
  color: string
}

export type NotifyEventStyles = {
  backgroundColor: string
  borderColor: string
  eventIcon: string
}

// Notify V1

// import type {
//   BitcoinTransactionLog,
//   EthereumTransactionLog,
//   SDKError,
//   TransactionHandler
// } from 'bnc-sdk/dist/types/src/interfaces'

export interface NotifyOptions {
  dappId?: string
  // transactionHandler?: TransactionHandler
  apiUrl?: string
  // onerror?: ErrorHandler
  enabled?: boolean
}

export type NotifyInitOptions = Omit<
  NotifyOptions,
  'dappId' | 'name' | 'apiUrl'
>

// export type ErrorHandler = (error: SDKError) => void

export interface TransactionEvent {
  emitterResult: void | boolean | CustomNotificationObject
  transaction: TransactionData
}

export type System = 'bitcoin' | 'ethereum'

export type TransactionEventCode =
  | 'txSent'
  | 'txPool'
  | 'txConfirmed'
  | 'txSpeedUp'
  | 'txCancel'
  | 'txFailed'
  | 'txRequest'
  | 'nsfFail'
  | 'txRepeat'
  | 'txAwaitingApproval'
  | 'txConfirmReminder'
  | 'txSendFail'
  | 'txError'
  | 'txUnderPriced'
  | 'all'

export interface TransactionData {
  asset?: string
  blockHash?: string
  blockNumber?: number
  contractCall?: ContractCall | DecodedContractCall
  counterparty?: string
  eventCode?: string
  from?: string
  gas?: string
  gasPrice?: string
  hash?: string
  txid?: string
  id?: string
  input?: string
  monitorId?: string
  monitorVersion?: string
  nonce?: number
  replaceHash?: string
  r?: string
  s?: string
  status?: string
  to?: string
  transactionIndex?: number
  v?: string
  value?: string | number
  startTime?: number
  watchedAddress?: string
  originalHash?: string
  direction?: string
  system?: string
  inputs?: BitcoinInputOutput[]
  outputs?: BitcoinInputOutput[]
  baseFeePerGasGwei?: number
  maxPriorityFeePerGasGwei?: number
  maxFeePerGasGwei?: number
  gasPriceGwei?: number
}

export type NotificationType = 'pending' | 'success' | 'error' | 'hint'

export interface CustomNotificationObject {
  type?: NotificationType
  message?: string
  autoDismiss?: number
  onclick?: (event: any) => void
  eventCode?: string
  link?: string
}

export interface BitcoinInputOutput {
  address: string
  value: string
}

export interface NotificationObject {
  id: string
  type: NotificationType
  key: string
  startTime?: number
  eventCode?: string
  message: string
  autoDismiss?: number
  link?: string
}

export interface ContractCall {
  methodName: string
  params: string[]
}

export interface DecodedContractCall {
  contractAddress?: string
  contractType?: string
  params: Record<string, unknown>
  methodName: string
}

export interface AppStore {
  version: string
  dappId?: string
  name?: string
  networkId?: number
  nodeSynced: boolean
  // onerror?: ErrorHandler
  mobilePosition: 'bottom' | 'top'
  desktopPosition: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'
  darkMode: boolean
  txApproveReminderTimeout: number
  txStallPendingTimeout: number
  txStallConfirmedTimeout: number
  clientLocale: string
  notifyMessages: NotifyMessages
}

export interface NotifyMessages {
  [key: string]: LocaleMessages
}

export interface LocaleMessages {
  transaction: {
    [key: string]: string
  }
  watched: {
    [key: string]: string
  }
  time: {
    [key: string]: string
  }
}

export interface TransactionOptions {
  sendTransaction?: () => Promise<string>
  estimateGas?: () => Promise<string>
  gasPrice?: () => Promise<string>
  balance?: string
  contractCall?: ContractCall
  txDetails?: {
    to?: string
    from?: string
    value: string
  }
}

export interface PreflightEvent {
  eventCode: string
  contractCall?: ContractCall
  balance: string
  txDetails?: {
    to?: string
    from?: string
    value: string | number
  }
  emitter: Emitter
  status?: string
}

export interface UpdateNotification {
  (notificationObject: CustomNotificationObject): {
    dismiss: () => void
    update: UpdateNotification
  }
}

export interface Hash {
  (hash: string, id?: string):
    | never
    | {
        // details: BitcoinTransactionLog | EthereumTransactionLog
        emitter: Emitter
      }
}

export interface Transaction {
  (options: TransactionOptions): { result: Promise<string>; emitter: Emitter }
}

export interface NotifyAccount {
  (address: string): never | { details: { address: string }; emitter: Emitter }
}

export interface Unsubscribe {
  (addressOrHash: string): void
}

export interface Notification {
  (notificationObject: CustomNotificationObject): {
    dismiss: () => void
    update: UpdateNotification
  }
}

export interface EmitterListener {
  (state: TransactionData): boolean | void | CustomNotificationObject
}

export interface Emitter {
  listeners: {
    [key: string]: EmitterListener
  }
  on: (eventCode: TransactionEventCode, listener: EmitterListener) => void
  emit: (state: TransactionData) => boolean | void | CustomNotificationObject
}

export interface NotificationDetails {
  id: string
  hash?: string
  startTime: number
  eventCode: string
  direction?: string
  counterparty?: string
  value?: string
  asset?: string
}
