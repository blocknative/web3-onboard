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
  wallets: Array<WalletModule | WalletInit>
}

export interface WalletCheckModule {
  (stateAndHelpers: StateAndHelpers):
    | WalletCheckModal
    | undefined
    | Promise<WalletCheckModal | undefined>
}

export interface WalletCheckModal {
  heading: string
  description: string
  button?: {
    onclick: () => void
    text: string
  }
  eventCode: string
  action?: () => Promise<{ message: string } | undefined>
  loading?: Promise<undefined>
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
  exit: () => void
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
  getAddress: (provider: any) => Promise<string | any>
  getNetwork: (provider: any) => Promise<number | any>
  getBalance: (provider: any) => Promise<string | any>
}

export interface WalletInterface {
  name: string | undefined
  connect?: () => Promise<{ message: string } | undefined>
  disconnect?: () => void
  loading?: Promise<undefined>
  address: StateSyncer
  network: StateSyncer
  balance: StateSyncer
}

export interface StateSyncer {
  get?: () => Promise<string | number | null>
  onChange?: (updater: (val: number | string) => void) => void
}

export interface Wallet {
  name: string
  provider: any
  instance?: any
  connect?: () => Promise<{ message: string } | undefined>
  loading?: Promise<undefined>
}

export interface SdkWalletOptions {
  apiKey: string
  networkId: number
  preferred?: boolean
  label?: string
  iconSrc?: string
  svg?: string
}

export interface WalletConnectOptions {
  infuraKey: string
  preferred?: boolean
  label?: string
  iconSrc?: string
  svg?: string
}

export interface TorusOptions {
  networkId: number
  chainId?: number
  loginMethod?: 'google' | 'facebook' | 'twitch' | 'reddit' | 'discord'
  buildEnv?: 'production' | 'development' | 'staging' | 'testing'
  showTorusButton?: boolean
  buttonPosition?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left'
  enableLogging?: boolean
  preferred?: boolean
  label?: string
  iconSrc?: string
  svg?: string
}

export interface WalletInit {
  walletName: string
  preferred?: boolean
  apiKey?: string
  infuraKey?: string
  networkId?: number
  label?: string
  iconSrc?: string
  svg?: string
}

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
  config: Config
  getState: GetState
}

export interface WritableStore {
  set: (newValue: any) => void
  update: (updater: (newValue: any) => any) => void
  subscribe: (subscriber: (store: any) => any) => () => void
}

export interface WalletInterfaceStore {
  subscribe: (subscriber: (store: any) => void) => () => void
  update: (
    updater: (walletInterface: WalletInterface | null) => WalletInterface
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
}

export interface CancelablePromise extends Promise<any> {
  cancel: () => void
}

export interface QueryablePromise extends CancelablePromise {
  isFulfilled: () => boolean
  isResolved: () => boolean
  isRejected: () => boolean
}
