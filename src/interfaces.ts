export interface Initialization {
  dappId?: string
  networkId: number
  networkName?: string
  subscriptions?: Subscriptions
  walletSelect?: WalletSelectModuleOptions
  walletCheck?: Array<WalletCheckModule | WalletCheckInit>
  darkMode?: boolean
  apiUrl?: string
  hideBranding?: boolean
  blockPollingInterval?: number
}

export interface Subscriptions {
  address?: (address: string) => void
  ens?: (ens: Ens) => void
  network?: (networkId: number) => void
  balance?: (balance: string) => void
  wallet?: (wallet: Wallet) => void
}

export interface WalletSelectModuleOptions {
  heading?: string
  description?: string
  wallets?: Array<WalletModule | WalletInitOptions>
  explanation?: string
  agreement?: TermsOfServiceAgreementOptions
}

export interface WalletSelectModule {
  heading: string
  description: string
  wallets: Promise<Array<WalletModule | WalletInitOptions>>
  explanation?: string
  agreement?: TermsOfServiceAgreementOptions
}

export interface TermsOfServiceAgreementOptions {
  version: string
  termsUrl?: string
  privacyUrl?: string
}

export interface WalletCheckModule {
  (stateAndHelpers: StateAndHelpers):
    | WalletCheckModal
    | undefined
    | Promise<WalletCheckModal | undefined>
}

export interface WalletCheckModule {
  reset?: () => void
}

export interface Connect {
  (): Promise<{ message: string } | string[] | undefined>
}

export interface WalletCheckModal {
  heading: string
  description: string
  html?: string
  button?: {
    onclick: () => void
    text: string
  }
  eventCode: string
  action?: Connect | null
  icon?: string
}

export interface WalletSelectModalData {
  heading: string
  description: string
  explanation?: string
  primaryWallets: WalletModule[]
  secondaryWallets: WalletModule[] | undefined
}

export interface UserState {
  address: string
  network: number
  balance: string
  wallet: Wallet
  mobileDevice: boolean
  appNetworkId: number
}

export interface StateAndHelpers extends UserState {
  BigNumber: any
  walletSelect: WalletSelectFunction
  walletCheck: WalletCheck
  wallet: Wallet
  exit: (completed?: boolean, state?: Partial<AppState>) => void
  stateSyncStatus: {
    [key: string]:
      | null
      | CancelablePromise
      | Promise<Array<string>>
      | Promise<string>
      | Promise<void>
    balance: null | CancelablePromise
    address: null | Promise<Array<string>>
    network: null | Promise<string>
  }
  stateStore: {
    address: WalletStateSliceStore
    network: WalletStateSliceStore
    balance: BalanceStore | WalletStateSliceStore
  }
}

export interface WalletModule {
  name: string
  iconSrc?: string
  iconSrcSet?: string
  svg?: string
  wallet: (helpers: Helpers) => Promise<{
    provider: any | undefined
    interface: WalletInterface | null
    instance?: any
  }>
  type: WalletType
  link?: string
  installMessage?: (wallets: {
    currentWallet: string | undefined
    selectedWallet: string
  }) => string
  preferred?: boolean
  desktop?: boolean
  mobile?: boolean
  osExclusions?: Array<string>
}

export type WalletType = 'hardware' | 'injected' | 'sdk'

export interface Helpers {
  getProviderName: (provider: any) => string | undefined
  createLegacyProviderInterface: (provider: any) => WalletInterface
  createModernProviderInterface: (provider: any) => WalletInterface
  BigNumber: any
  networkName: (id: number) => string
  getAddress: (provider: any) => Promise<string | any>
  getNetwork: (provider: any) => Promise<number | any>
  getBalance: (provider: any, address?: string) => Promise<string | any>
  resetWalletState: (options?: {
    disconnected: boolean
    walletName: string
  }) => void
  browser: Browser
  os: OS
}

export interface WalletInterface {
  name: string | undefined
  connect?: Connect | null
  disconnect?: () => void
  address: StateSyncer
  network: StateSyncer
  balance: StateSyncer
  dashboard?: () => void
}

export interface StateSyncer {
  get?: () => Promise<string | number | null>
  onChange?: (updater: (val: number | string | undefined) => void) => void
}

export interface Wallet {
  name: string | null
  provider: any | null
  type: 'hardware' | 'injected' | 'sdk' | null
  instance?: any | null
  connect?: Connect | null
  dashboard?: () => void | null
  icons: Pick<WalletModule, 'svg' | 'iconSrc' | 'iconSrcSet'>
}

export interface CommonWalletOptions {
  walletName: string
  preferred?: boolean
  label?: string
  iconSrc?: string
  svg?: string
  networkId?: number
}

export interface SdkWalletOptions extends CommonWalletOptions {
  apiKey: string
}

export interface WalletConnectOptions extends CommonWalletOptions {
  infuraKey: string
  rpc: {
    [key: string]: string
  }
  bridge: string
}

export interface MewConnectOptions extends CommonWalletOptions {
  infuraKey: string
  rpc: {
    [key: string]: string
  }
}

/*
 * Types taken from https://github.com/ethereumjs/ethereumjs-vm/blob/eb05651554ec23d2ba7c46af6e5f5a7bc199f217/packages/common/src/types.ts#L15
 * since they are not exported
 */

export interface GenesisBlock {
  hash: string
  timestamp: string | null
  gasLimit: number
  difficulty: number
  nonce: string
  extraData: string
  stateRoot: string
}
export interface Hardfork {
  name: string
  block: number | null
}

export interface BootstrapNode {
  ip: string
  port: number | string
  network?: string
  chainId?: number
  id: string
  location: string
  comment: string
}

export interface HardwareWalletCustomNetwork {
  networkId: number
  genesis: GenesisBlock
  hardforks: Hardfork[]
  bootstrapNodes: BootstrapNode[]
}

export interface TrezorOptions extends CommonWalletOptions {
  appUrl: string
  email: string
  rpcUrl: string
  customNetwork?: HardwareWalletCustomNetwork
}

export interface LatticeOptions extends CommonWalletOptions {
  appName: string
  rpcUrl: string
  customNetwork?: HardwareWalletCustomNetwork
}

export interface LedgerOptions extends CommonWalletOptions {
  rpcUrl: string
  LedgerTransport?: any
  customNetwork?: HardwareWalletCustomNetwork
}

export interface GnosisOptions extends CommonWalletOptions {
  // For default apps (cf. https://github.com/gnosis/safe-apps-list/issues/new/choose)
  appName?: string
  // For other apps, give the URL needed to add a custom app
  appUrl?: string
}

//#region torus

interface VerifierStatus {
  google?: boolean
  facebook?: boolean
  reddit?: boolean
  twitch?: boolean
  discord?: boolean
}

type LOGIN_TYPE =
  | 'google'
  | 'facebook'
  | 'reddit'
  | 'discord'
  | 'twitch'
  | 'apple'
  | 'github'
  | 'linkedin'
  | 'twitter'
  | 'weibo'
  | 'line'
  | 'jwt'
  | 'email-password'
  | 'passwordless'

interface BaseLoginOptions {
  display?: 'page' | 'popup' | 'touch' | 'wap'
  prompt?: 'none' | 'login' | 'consent' | 'select_account'
  max_age?: string | number
  ui_locales?: string
  id_token_hint?: string
  login_hint?: string
  acr_values?: string
  scope?: string
  audience?: string
  connection?: string
  [key: string]: unknown
}

interface JwtParameters extends BaseLoginOptions {
  domain: string
  client_id?: string
  redirect_uri?: string
  leeway?: number
  verifierIdField?: string
  isVerifierIdCaseSensitive?: boolean
}

interface IntegrityParams {
  check: boolean
  hash?: string
  version?: string
}

interface WhiteLabelParams {
  theme: ThemeParams
  defaultLanguage?: string
  logoDark: string
  logoLight: string
  topupHide?: boolean
  featuredBillboardHide?: boolean
  disclaimerHide?: boolean
  tncLink?: LocaleLinks<string>
  privacyPolicy?: LocaleLinks<string>
  contactLink?: LocaleLinks<string>
  customTranslations?: LocaleLinks<any>
}

interface LocaleLinks<T> {
  en?: T
  ja?: T
  ko?: T
  de?: T
  zh?: T
  es?: T
}

interface ThemeParams {
  isDark: boolean
  colors: any
}

interface LoginConfigItem {
  name: string
  typeOfLogin: LOGIN_TYPE
  description?: string
  clientId?: string
  logoHover?: string
  logoLight?: string
  logoDark?: string
  showOnModal?: boolean
  showOnMobile?: boolean
  showOnDesktop?: boolean
  mainOption?: boolean
  jwtParameters?: JwtParameters
  priority?: number
}

interface LoginConfig {
  [verifier: string]: LoginConfigItem
}

export interface TorusOptions extends CommonWalletOptions {
  buttonPosition?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left'
  modalZIndex?: number
  apiKey?: string
  buildEnv?:
    | 'production'
    | 'development'
    | 'binance'
    | 'testing'
    | 'lrc'
    | 'beta'
  enableLogging?: boolean
  enabledVerifiers?: VerifierStatus
  loginConfig?: LoginConfig
  showTorusButton?: boolean
  integrity?: IntegrityParams
  whiteLabel?: WhiteLabelParams
  loginMethod?: 'google' | 'facebook' | 'twitch' | 'reddit' | 'discord' | string
  rpcUrl?: string
}

//#endregion torus

export interface AuthereumOptions extends CommonWalletOptions {
  apiKey?: string
  disableNotifications?: boolean
  rpcUri?: string
  webUri?: string
  xsUri?: string
  blockedPopupRedirect?: boolean
}

export interface WalletLinkOptions extends CommonWalletOptions {
  appName: string
  appLogoUrl?: string
  rpcUrl: string
}

export interface InjectedWithBalanceOptions extends CommonWalletOptions {
  rpcUrl?: string
}

export type WalletInitOptions =
  | CommonWalletOptions
  | SdkWalletOptions
  | WalletConnectOptions
  | TorusOptions
  | TrezorOptions
  | LatticeOptions
  | AuthereumOptions
  | LedgerOptions
  | InjectedWithBalanceOptions

export type AllWalletInitOptions = CommonWalletOptions &
  SdkWalletOptions &
  WalletConnectOptions &
  TorusOptions &
  TrezorOptions &
  LatticeOptions &
  AuthereumOptions &
  LedgerOptions &
  WalletLinkOptions &
  InjectedWithBalanceOptions & { networkId: number } & { isMobile: boolean }

export interface WalletCheckCustomOptions {
  heading?: string
  description?: string
  minimumBalance?: string
  icon?: string
  button?: {
    text: string
    onclick: () => void
  }
  html?: string
}

export interface WalletCheckInit extends WalletCheckCustomOptions {
  checkName: string
}

export interface WalletSelectFunction {
  (autoSelectWallet?: string): Promise<boolean>
}

export interface WalletCheck {
  (): Promise<boolean>
}

export interface AccountSelect {
  (): Promise<boolean>
}

export interface Config {
  (options: ConfigOptions): void
}

export interface GetState {
  (): UserState
}

export interface ConfigOptions {
  darkMode?: boolean
  networkId?: number
}

export interface API {
  walletSelect: WalletSelectFunction
  walletCheck: WalletCheck
  walletReset: () => void
  config: Config
  getState: GetState
  accountSelect: AccountSelect
}

export interface WritableStore {
  set: (newValue: any) => void
  update: (updater: (newValue: any) => any) => void
  subscribe: (subscriber: (store: any) => any) => () => void
}

export interface ReadableStore {
  subscribe: (subscriber: (store: any) => any) => () => void
}

export interface WalletInterfaceStore {
  subscribe: (subscriber: (store: any) => void) => () => void
  update: (
    updater: (walletInterface: WalletInterface | null) => WalletInterface | null
  ) => void
  set: (walletInterface: WalletInterface | null) => void | never
}

export interface WalletStateSliceStore {
  subscribe: (subscriber: (store: any) => void) => () => void
  reset: () => void
  setStateSyncer: (
    stateSyncer: StateSyncer
  ) => { clear: () => void } | undefined
  get: () => any
}

export interface BalanceStore {
  subscribe: (subscriber: (store: any) => void) => () => void
  setStateSyncer: (stateSyncer: StateSyncer) => undefined
  reset: () => void
  get: () => any
}

export type Browser = {
  name: string
  version: string
}

export type OS = {
  name: string
  version: string
  versionName: string
}

export interface AppState {
  dappId: string
  networkId: number
  networkName: string
  version: string
  mobileDevice: boolean
  os: OS
  browser: Browser
  darkMode: boolean
  autoSelectWallet: string
  walletSelectInProgress: boolean
  walletSelectCompleted: boolean
  walletCheckInProgress: boolean
  walletCheckCompleted: boolean
  accountSelectInProgress: boolean
  walletSelectDisplayedUI: boolean
  walletCheckDisplayedUI: boolean
  switchingWallets: boolean
  displayBranding: boolean
  agreement: TermsOfServiceAgreementOptions
}

export interface CancelablePromise extends Promise<any> {
  cancel: () => void
}

export interface StorageKeys {
  TERMS_AGREEMENT: string
}

/**
 * The object that will be stored in local storage to track
 * user's agreement to the terms.
 */
export interface TermsAgreementState {
  version: string
  terms?: boolean
  privacy?: boolean
}

export interface Ens {
  name?: string
  avatar?: string
  contentHash?: string
  getText?: (key: string) => Promise<string | undefined>
}
