export interface Initialization {
  dappId?: string
  networkId: number
  subscriptions?: Subscriptions
  walletSelect?: WalletSelectModuleOptions
  walletCheck?: Array<WalletCheckModule | WalletCheckInit>
  darkMode?: boolean
  apiUrl?: string
  hideBranding?: boolean
}

export interface Subscriptions {
  address?: (address: string) => void
  network?: (networkId: number) => void
  balance?: (balance: string) => void
  wallet?: (wallet: Wallet) => void
}

export interface WalletSelectModuleOptions {
  heading?: string
  description?: string
  wallets?: Array<WalletModule | WalletInitOptions>
  explanation?: string
}

export interface WalletSelectModule {
  heading: string
  description: string
  wallets: Array<WalletModule | WalletInitOptions>
  explanation?: string
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
  wallet: Wallet
  exit: (completed?: boolean) => void
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
  wallet: (
    helpers: Helpers
  ) => Promise<{
    provider: any | undefined
    interface: WalletInterface | null
    instance?: any
  }>
  type: 'hardware' | 'injected' | 'sdk'
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
}

export interface CommonWalletOptions {
  walletName: string
  preferred?: boolean
  label?: string
  iconSrc?: string
  svg?: string
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

export interface TrezorOptions extends CommonWalletOptions {
  appUrl: string
  email: string
  rpcUrl: string
}

export interface LedgerOptions extends CommonWalletOptions {
  rpcUrl: string
  LedgerTransport?: any
}

export interface TorusOptions extends CommonWalletOptions {
  loginMethod?: 'google' | 'facebook' | 'twitch' | 'reddit' | 'discord'
  buildEnv?: 'production' | 'development' | 'staging' | 'testing'
  showTorusButton?: boolean
  buttonPosition?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left'
  enableLogging?: boolean
  enabledVerifiers?: TorusVerifierStatus
}

interface TorusVerifierStatus {
  google?: boolean
  facebook?: boolean
  reddit?: boolean
  twitch?: boolean
  discord?: boolean
}

export interface AuthereumOptions extends CommonWalletOptions {
  disableNotifications?: boolean
}

export interface WalletLinkOptions extends CommonWalletOptions {
  appName: string
  appLogoUrl?: string
  rpcUrl: string
}

export interface ImTokenOptions extends CommonWalletOptions {
  rpcUrl?: string
}

export interface TrustWalletOptions extends CommonWalletOptions {
  rpcUrl?: string
}

export type WalletInitOptions =
  | CommonWalletOptions
  | SdkWalletOptions
  | WalletConnectOptions
  | TorusOptions
  | TrezorOptions
  | AuthereumOptions
  | LedgerOptions
  | ImTokenOptions
  | TrustWalletOptions

export type AllWalletInitOptions = CommonWalletOptions &
  SdkWalletOptions &
  WalletConnectOptions &
  TorusOptions &
  TrezorOptions &
  AuthereumOptions &
  LedgerOptions &
  WalletLinkOptions &
  ImTokenOptions &
  TrustWalletOptions & { networkId: number }

export interface WalletCheckInit {
  checkName: string
  minimumBalance?: string
}

export interface WalletSelectFunction {
  (autoSelectWallet?: string): Promise<boolean>
}

interface WalletCheck {
  (): Promise<boolean>
}

interface AccountSelect {
  (): Promise<boolean>
}

interface Config {
  (options: ConfigOptions): void
}

interface GetState {
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

export interface AppState {
  dappId: string
  networkId: number
  version: string
  mobileDevice: boolean
  os: string
  darkMode: boolean
  autoSelectWallet: string
  walletSelectInProgress: boolean
  walletSelectCompleted: boolean
  walletCheckInProgress: boolean
  walletCheckCompleted: boolean
  accountSelectInProgress: boolean
  walletSelectDisplayedUI: boolean
  walletCheckDisplayedUI: boolean
  displayBranding: boolean
}

export interface CancelablePromise extends Promise<any> {
  cancel: () => void
}
