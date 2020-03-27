export interface Initialization {
  dappId: string
  networkId: number
  subscriptions: Subscriptions
  walletSelect: WalletSelectModule
  walletCheck: Array<WalletCheckModule | WalletCheckInit>
  darkMode?: boolean
}

export interface Subscriptions {
  address: (address: string) => void
  network: (networkId: number) => void
  balance: (balance: string) => void
  wallet: (wallet: Wallet) => void
}

export interface WalletSelectModule {
  heading: string
  description: string
  wallets: Array<WalletModule | WalletInitOptions>
}

export interface WalletCheckModule {
  (stateAndHelpers: StateAndHelpers):
    | WalletCheckModal
    | undefined
    | Promise<WalletCheckModal | undefined>
  id?: string
}

export interface WalletCheckModule {
  reset?: () => void
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
  action?: () => Promise<{ message: string } | undefined>
  icon?: string
}

export interface WalletSelectModalData {
  heading: string
  description: string
  primaryWallets: WalletModule[]
  secondaryWallets: WalletModule[] | undefined
}

export interface UserState {
  address: string
  network: number
  balance: string
  wallet: Wallet | null
  mobileDevice: boolean
  appNetworkId: number
}

export interface StateAndHelpers extends UserState {
  BigNumber: any
  walletSelect: WalletSelectFunction
  wallet: Wallet
  exit: (completed?: boolean) => void
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
  url?: string
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
  getBalance: (provider: any) => Promise<string | any>
  resetWalletState: (options?: {
    disconnected: boolean
    walletName: string
  }) => void
}

export interface WalletInterface {
  name: string | undefined
  connect?: () => Promise<{ message: string } | string[] | undefined>
  disconnect?: () => void
  address: StateSyncer
  network: StateSyncer
  balance: StateSyncer
}

export interface StateSyncer {
  get?: () => Promise<string | number | null>
  onChange?: (updater: (val: number | string | undefined) => void) => void
}

export interface Wallet {
  name: string
  provider: any
  type: 'hardware' | 'injected' | 'sdk'
  instance?: any
  connect?: () => Promise<{ message: string } | undefined>
}

export interface CommonWalletOptions {
  networkId: number
  preferred?: boolean
  label?: string
  iconSrc?: string
  svg?: string
}

export interface SdkWalletOptions {
  apiKey: string
}

export interface WalletConnectOptions {
  infuraKey: string
}

export interface TrezorOptions {
  appUrl: string
  email: string
  rpcUrl: string
}

export interface LedgerOptions {
  rpcUrl: string
  LedgerTransport?: any
}

export interface TorusOptions {
  loginMethod?: 'google' | 'facebook' | 'twitch' | 'reddit' | 'discord'
  buildEnv?: 'production' | 'development' | 'staging' | 'testing'
  showTorusButton?: boolean
  buttonPosition?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left'
  enableLogging?: boolean
  enabledVerifiers: TorusVerifierStatus
}

interface TorusVerifierStatus {
  google?: boolean
  facebook?: boolean
  reddit?: boolean
  twitch?: boolean
  discord?: boolean
}

export interface AuthereumOptions {
  disableNotifications?: boolean
}

interface WalletName {
  walletName: string
}

export type WalletInitOptions = CommonWalletOptions &
  SdkWalletOptions &
  WalletConnectOptions &
  TorusOptions &
  TrezorOptions &
  AuthereumOptions &
  LedgerOptions &
  WalletName

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

export interface WalletInterfaceStore {
  subscribe: (subscriber: (store: any) => void) => () => void
  update: (
    updater: (walletInterface: WalletInterface | null) => WalletInterface | null
  ) => void
  set: (walletInterface: WalletInterface) => void | never
}

export interface WalletStateSliceStore {
  subscribe: (subscriber: (store: any) => void) => () => void
  reset: () => void
  setStateSyncer: (stateSyncer: StateSyncer) => number | undefined
}

export interface BalanceStore {
  subscribe: (subscriber: (store: any) => void) => () => void
  setStateSyncer: (stateSyncer: StateSyncer) => number | undefined
  reset: () => void
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
}

export interface CancelablePromise extends Promise<any> {
  cancel: () => void
}
