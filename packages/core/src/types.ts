import type { SvelteComponent } from 'svelte'

import type {
  AppMetadata,
  Address,
  Device,
  WalletInit,
  EIP1193Provider,
  WalletModule,
  Chain,
  TokenSymbol,
  ChainWithDecimalId,
  DeviceNotBrowser
} from '@web3-onboard/common'

import type gas from '@web3-onboard/gas'
import type unstoppableResolution from '@web3-onboard/unstoppable-resolution'

import type en from './i18n/en.json'
import type { Network } from 'bnc-sdk'
import type { GetEnsTextReturnType } from 'viem'
import type { Config, Connector, WagmiModuleAPI } from '@web3-onboard/wagmi'
import type wagmi from '@web3-onboard/wagmi'
export type { Config as WagmiConfig } from '@web3-onboard/wagmi'

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
   * @deprecated apiKey parameter has been deprecated and is no
   * longer used within Web3-Onboard to provide notifications
   */
  apiKey?: string
  /**
   * Transaction notification options
   */
  notify?: Partial<NotifyOptions> | Partial<Notify>
  /** Gas module */
  gas?: typeof gas
  /** Web3-Onboard module to add Wagmi support
   * see https://www.npmjs.com/package/@web3-onboard/wagmi
   */
  wagmi?: typeof wagmi
  /**
   * Object mapping for W3O components with the key being the DOM
   * element to mount the component to, this defines the DOM container
   *  element for svelte to attach the component
   */
  containerElements?: Partial<ContainerElements>
  /**
   * @deprecated Transaction Preview support has ended and Transaction Preview
   * is no longer supported as part of Web3-Onboard.
   * Please remove from your onboard config to avoid
   * console errors and un-expected behavior
   */
  transactionPreview?: unknown
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
  /**
   * WAGMI Connector object
   * Can be used to leverage all WAGMI functions from
   * the @web3-onboard/wagmi module
   * See https://www.npmjs.com/package/@web3-onboard/wagmi for more details
   */
  wagmiConnector?: Connector
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
  avatar: string | null
  contentHash: Address | null
  ensResolver: Address | null
  getText: (key: string) => Promise<GetEnsTextReturnType>
}

export interface Uns {
  name: string
}

export interface AppState {
  chains: Chain[]
  walletModules: WalletModule[]
  wallets: WalletState[]
  accountCenter: AccountCenter
  locale: Locale
  notify: Notify
  notifications: Notification[]
  connect: ConnectModalOptions
  appMetadata: AppMetadata | null
  wagmiConfig: Config | null
}

export type Configuration = {
  svelteInstance: SvelteComponent | null
  device: Device | DeviceNotBrowser
  initialWalletInit: WalletInit[]
  appMetadata?: AppMetadata | null
  /**
   * @deprecated APIKey parameter has been deprecated and is no
   * longer used within Web3-Onboard
   */
  apiKey?: string
  gas?: typeof gas
  wagmi?: WagmiModuleAPI
  containerElements?: ContainerElements
  transactionPreview?: unknown
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
   * Hide the "Where is my wallet?" link notice displayed in the connect modal
   * at the bottom of the wallets list
   */
  removeWhereIsMyWalletWarning?: boolean
  /**
   * Hide the "I don't have a wallet" link displayed
   * on the left panel of the connect modal
   */
  removeIDontHaveAWalletInfoLink?: boolean
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
  /**
   * Controls the visibility of the 'Enable Transaction Protection' button
   * within the expanded Account Center.
   * - When set to false (default), the button is visible.
   * - When set to true, the button is hidden.
   * This setting can be configured globally for the Account Center, or
   * separately for different interfaces like desktop/mobile.
   * defaults to
   * `docs.blocknative.com/blocknative-mev-protection/transaction-boost-alpha`
   * Use this property to override the default link to give users
   * more information about transaction protection and the RPC be set
   */
  transactionProtectionInfoLink?: string
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
   * Controls the visibility of the 'Enable Transaction Protection' button
   * within the expanded Account Center.
   * - When set to false (default), the button is visible.
   * - When set to true, the button is hidden.
   * This setting can be configured globally for the Account Center, or
   * separately for different interfaces like desktop/mobile.
   * defaults to
   * `docs.blocknative.com/blocknative-mev-protection/transaction-boost-alpha`
   * Use this property to override the default link to give users
   * more information about transaction protection and the RPC be set
   */
  transactionProtectionInfoLink?: string
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
   * Position of notifications that defaults to the same position as the
   * Account Center (if enabled) of the top right if AC is disabled
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
  | UpdateWagmiConfigAction

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
  payload: { id: string; address: Address } & Partial<Account>
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

export type UpdateWagmiConfigAction = {
  type: 'update_wagmi_config'
  payload: Config
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
