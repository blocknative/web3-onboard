import type { SvelteComponent } from 'svelte'

import type {
  AppMetadata,
  Device,
  WalletInit,
  EIP1193Provider,
  WalletModule,
  Chain,
  TokenSymbol,
  ChainWithDecimalId
} from '@web3-onboard/common'

import type gas from '@web3-onboard/gas'
import type unstoppableResolution from '@web3-onboard/unstoppable-resolution'
import type { TransactionPreviewAPI } from '@web3-onboard/transaction-preview'

import type en from './i18n/en.json'
import type { EthereumTransactionData, Network } from 'bnc-sdk'

export interface InitOptions {
  /**
   * Wallet modules to be initialized and added to wallet selection modal
   */
  wallets: WalletInit[]
  /**
   * The chains that your app works with
   */
  chains: (Chain | ChainWithDecimalId)[]
  /**
   * Additional metadata about your app to be displayed in the Onboard UI
   */
  appMetadata?: AppMetadata
  /**
   * Define custom copy for the 'en' locale or add locales to i18n your app
   */
  i18n?: i18nOptions
  /**
   * Customize the connect modal
   */
  connect?: ConnectModalOptions
  /**
   * Customize the account center UI
   */
  accountCenter?: AccountCenterOptions
  /**
   * Opt in to Blocknative value add services (transaction updates) by providing
   * your Blocknative API key, head to https://explorer.blocknative.com/account
   */
  apiKey?: string
  /**
   * Transaction notification options
   */
  notify?: Partial<NotifyOptions> | Partial<Notify>
  /** Gas module */
  gas?: typeof gas
  /**
   * Object mapping for W3O components with the key being the DOM
   * element to mount the component to, this defines the DOM container
   *  element for svelte to attach the component
   */
  containerElements?: Partial<ContainerElements>
  /**
   * Transaction Preview module
   */
  transactionPreview?: TransactionPreviewAPI
  /**
   * Custom or predefined theme for Web3Onboard
   * BuiltInThemes: ['default', 'dark', 'light', 'system']
   * or customize with a ThemingMap object.
   */
  theme?: Theme
  /**
   * Defaults to False - use to reduce load time
   * If set to true the Inter font will not be imported and
   * instead the default 'sans-serif' font will be used
   * To define the font used see `--w3o-font-family` prop within
   * the Theme initialization object or set as css variable
   */
  disableFontDownload?: boolean
  /**
   * Type of unstoppableResolution module
   * A small module that can bee added to allow Unstoppable Domain
   * address resolution similar to that of ens (Ethereum Name Service)
   * ENS resolution will take president if available
   */
  unstoppableResolution?: typeof unstoppableResolution
}

export type Theme = ThemingMap | BuiltInThemes | 'system'

export type BuiltInThemes = 'default' | 'dark' | 'light'

export type ThemingMap = {
  '--w3o-background-color'?: string
  '--w3o-font-family'?: string
  '--w3o-foreground-color'?: string
  '--w3o-text-color'?: string
  '--w3o-border-color'?: string
  '--w3o-action-color'?: string
  '--w3o-border-radius'?: string
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
  uns: Uns | null
  balance: Balances | null
  secondaryTokens?: SecondaryTokenBalances[] | null
}

export type Balances = Record<TokenSymbol, string> | null

export interface SecondaryTokenBalances {
  name: TokenSymbol
  balance: string
  icon?: string
}

export interface Ens {
  name: string
  avatar: Avatar | null
  contentHash: string | null
  getText: (key: string) => Promise<string | undefined>
}

export interface Uns {
  name: string
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
  notify: Notify
  notifications: Notification[]
  connect: ConnectModalOptions,
  appMetadata: AppMetadata
}

export type Configuration = {
  svelteInstance: SvelteComponent | null
  device: Device | DeviceNotBrowser
  initialWalletInit: WalletInit[]
  appMetadata?: AppMetadata | null
  apiKey?: string
  gas?: typeof gas
  containerElements?: ContainerElements
  transactionPreview?: TransactionPreviewAPI
  unstoppableResolution?: typeof unstoppableResolution
}

export type Locale = string
export type i18nOptions = Record<Locale, i18n>
/**
 * RecursivePartial is a utility type that allows one to define a partial
 * version of a type that also includes all nested properties as partial.
 * This allows partial i18n override in TypeScript:
 */
type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}
export type i18n = RecursivePartial<typeof en>

export type ConnectModalOptions = {
  /**
   * Display the connect modal sidebar - only applies to desktop views
   */
  showSidebar?: boolean
  /**
   * Disabled close of the connect modal with background click and
   * hides the close button forcing an action from the connect modal
   * Defaults to false
   */
  disableClose?: boolean
  /**
   * If set to true, the most recently connected wallet will store in
   * local storage. Then on init, onboard will try to reconnect to
   * that wallet with no modals displayed
   */
  autoConnectLastWallet?: boolean
  /**
   * If set to true, all previously connected wallets will store in
   * local storage. Then on init, onboard will try to reconnect to
   * each wallet with no modals displayed
   */
  autoConnectAllPreviousWallet?: boolean
  /**
   * Customize the link for the `I don't have a wallet` flow shown on the
   * select wallet modal.
   * Defaults to `https://ethereum.org/en/wallets/find-wallet/#main-content`
   */
  iDontHaveAWalletLink?: string
  /**
   * Customize the link for the `Where's My Wallet` info pop up shown on the
   * select wallet modal.
   * Defaults to `https://www.blocknative.com/blog/
   * metamask-wont-connect-web3-wallet-troubleshooting`
   */
  wheresMyWalletLink?: string
  /**
   * @deprecated Has no effect unless `@web3-onboard/unstoppable-resolution`
   * package has been added and passed into the web3-onboard initialization
   * In this case remove the `@web3-onboard/unstoppable-resolution` package
   * to remove unstoppableDomain resolution support
   */
  disableUDResolution?: boolean
}

export type CommonPositions =
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft'
  | 'topLeft'

export type AccountCenterPosition = CommonPositions

export type NotificationPosition = CommonPositions

export type AccountCenter = {
  enabled: boolean
  /**
   * false by default - This allows removal of the
   * Enable Transaction Protection' button within the Account Center
   * expanded when set to true
   * Can be set as a global for Account Center or per interface (desktop/mobile)
   */
  hideTransactionProtectionBtn?: boolean
  position?: AccountCenterPosition
  expanded?: boolean
  minimal?: boolean
  /**
   * @deprecated Use top level containerElements property
   * with the accountCenter prop set to the desired container El
   */
  containerElement?: string
}

export type AccountCenterOptions = {
  desktop: Omit<AccountCenter, 'expanded'>
  mobile: Omit<AccountCenter, 'expanded'>
  /**
   * false by default - This allows removal of the
   * Enable Transaction Protection' button within the Account Center
   * expanded when set to true
   * Can be set as a global for Account Center or per interface (desktop/mobile)
   */
  hideTransactionProtectionBtn?: boolean
}

export type ContainerElements = {
  /** When attaching the Connect Modal to a container el be aware that
   * the modal was styled to be mounted through the app to the html body
   * and will respond to screen width rather than container width
   * This is specifically apparent on mobile so please test thoroughly
   * Also consider that other DOM elements(specifically Notifications and
   * Account Center) will also append to this DOM el if enabled and their
   * own containerEl are not defined
   */
  connectModal?: string
  /** when using the accountCenter with a container el the accountCenter
   * position properties are ignored
   */
  accountCenter?: string
}

export type Notify = {
  /**
   * Defines whether whether to subscribe to transaction events or not
   * default: true
   */
  enabled: boolean
  /**
   * Callback that receives all transaction events
   * Return a custom notification based on the event
   * Or return false to disable notification for this event
   * Or return undefined for a default notification
   */
  transactionHandler: (
    event: EthereumTransactionData
  ) => TransactionHandlerReturn
  /**
   * Position of notifications that defaults to the same position as the
   * Account Center (if enabled) of the top right if AC is disabled
   * and notifications are enabled (enabled by default with API key)
   */
  position?: NotificationPosition
  replacement?: {
    gasPriceProbability?: {
      speedup?: number
      cancel?: number
    }
  }
}

export type NotifyOptions = {
  desktop: Notify
  mobile: Notify
}

export type Notification = {
  id: string
  key: string
  network: Network
  startTime?: number
  /**
   * to completely customize the message shown
   */
  message: string
  /**
   * handle codes in your own way - see codes here under the notify
   * prop default en file at ./packages/core/src/i18n/en.json
   */
  eventCode: string
  /**
   * icon type displayed (see `NotificationType` below for options)
   */
  type: NotificationType
  /**
   * time (in ms) after which the notification will be dismissed. If set
   * to `0` the notification will remain on screen until the user dismisses the
   * notification, refreshes the page or navigates away from the site
   * with the notifications
   */
  autoDismiss: number
  /**
   * add link to the transaction hash. For instance, a link to the
   * transaction on etherscan
   */
  link?: string
  /**
   * onClick handler for when user clicks the notification element
   */
  onClick?: (event: Event) => void
}

export type TransactionHandlerReturn = CustomNotification | boolean | void

export type CustomNotification = Partial<
  Omit<Notification, 'startTime' | 'network' | 'id' | 'key'>
>

export type CustomNotificationUpdate = Partial<
  Omit<Notification, 'startTime' | 'network'>
>

export type NotificationType = 'pending' | 'success' | 'error' | 'hint'

export interface UpdateNotification {
  (notificationObject: CustomNotification): {
    dismiss: () => void
    update: UpdateNotification
  }
}

export interface PreflightNotificationsOptions {
  sendTransaction?: () => Promise<string | void>
  estimateGas?: () => Promise<string>
  gasPrice?: () => Promise<string>
  balance?: string | number
  txDetails?: TxDetails
  txApproveReminderTimeout?: number
}

export interface TxDetails {
  value: string | number
  to?: string
  from?: string
}

// ==== ACTIONS ==== //
export type Action =
  | AddChainsAction
  | UpdateChainsAction
  | AddWalletAction
  | UpdateWalletAction
  | RemoveWalletAction
  | ResetStoreAction
  | UpdateAccountAction
  | UpdateAccountCenterAction
  | SetWalletModulesAction
  | SetLocaleAction
  | UpdateNotifyAction
  | AddNotificationAction
  | RemoveNotificationAction
  | UpdateAllWalletsAction
  | UpdateConnectModalAction 
  | UpdateAppMetadataAction

export type AddChainsAction = { type: 'add_chains'; payload: Chain[] }
export type UpdateChainsAction = { type: 'update_chains'; payload: Chain }
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

export type UpdateConnectModalAction = {
  type: 'update_connect_modal'
  payload: Partial<ConnectModalOptions>
}

export type SetWalletModulesAction = {
  type: 'set_wallet_modules'
  payload: WalletModule[]
}

export type SetLocaleAction = {
  type: 'set_locale'
  payload: string
}

export type UpdateNotifyAction = {
  type: 'update_notify'
  payload: Partial<Notify>
}

export type AddNotificationAction = {
  type: 'add_notification'
  payload: Notification
}

export type RemoveNotificationAction = {
  type: 'remove_notification'
  payload: Notification['id']
}

export type UpdateAllWalletsAction = {
  type: 'update_balance'
  payload: WalletState[]
}

export type UpdateAppMetadataAction = {
  type: 'update_app_metadata'
  payload: AppMetadata | Partial<AppMetadata>
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
  iconColor?: string
}

export type DeviceNotBrowser = {
  type: null
  os: null
  browser: null
}

export type WalletPermission = {
  id: string
  parentCapability: string
  invoker: string
  caveats: {
    type: string
    value: string[]
  }[]

  date: number
}
