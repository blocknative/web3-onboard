export interface Initialization {
  networkId: number
  dappId: string
  subscriptions: Subscriptions
  modules: Modules
}

export interface Subscriptions {
  address: (address: string) => void
  network: (networkId: number) => void
  balance: (balance: string) => void
  wallet: (wallet: Wallet) => void
  [Key: string]: (val: any) => void
}

interface Modules {
  walletSelect: WalletSelectModule
  walletReady: WalletReadyModule[]
}

export interface WalletSelectModule {
  heading: string
  description: string
  wallets: {
    mobile: WalletModule[]
    desktop: WalletModule[]
  }
}

export interface WalletReadyModule {
  (stateAndHelpers: StateAndHelpers):
    | ReadyModal
    | undefined
    | Promise<ReadyModal | undefined>
}

export interface ReadyModal {
  img?: string
  heading: string
  description: string
  button?: {
    onclick: () => void
    text: string
  }
  invalidMsg?: string
  eventCode: string
  action?: () => Promise<{ message: string } | undefined>
  loading?: () => Promise<undefined>
  icon?: string
}

export interface SelectModalData {
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
  ) => {
    provider: any | undefined
    interface: WalletInterface | null
    instance?: any
  }
  link?: string
  installMessage?: (wallets: {
    currentWallet: string
    selectedWallet: string
  }) => string
  preferred?: boolean
}

export interface Helpers {
  getProviderName: (provider: any) => string | undefined
  createLegacyProviderInterface: (provider: any) => WalletInterface
  createModernProviderInterface: (provider: any) => WalletInterface
  BigNumber: any
}

export interface WalletInterface {
  name: string
  connect?: () => Promise<{ message: string } | undefined>
  disconnect?: () => void
  loading?: () => Promise<undefined>
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
  loading?: () => Promise<undefined>
}

export interface ReadyDefaultsOptions {
  networkId: number
  minimumBalance?: string
}

export interface SdkWalletOptions {
  apiKey: string
  networkId: number
}

export interface WalletConnectOptions {
  infuraKey: string
}

export interface SelectDefaultsOptions {
  heading: string
  description: string
  networkId: number
  fortmaticInit: { apiKey: string }
  portisInit: { apiKey: string }
  squarelinkInit: { apiKey: string }
  walletConnectInit: WalletConnectOptions
}

export interface WalletSelectFunction {
  (autoSelectWallet?: string): Promise<boolean>
}

interface WalletReady {
  (): Promise<boolean>
}

interface Config {
  (options: ConfigOptions): void
}

interface GetState {
  (): UserState
}

export interface ConfigOptions {
  darkMode: boolean
}

export interface API {
  walletSelect: WalletSelectFunction
  walletReady: WalletReady
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
}

export interface AppState {
  dappId: string
  networkId: number
  version: string
  mobileDevice: boolean
  darkMode: boolean
  autoSelectWallet: string
  walletSelectInProgress: boolean
  walletSelectCompleted: boolean
  walletReadyInProgress: boolean
  walletReadyCompleted: boolean
}

export interface QuerablePromise extends CancelablePromise {
  isFulfilled: () => boolean
  isResolved: () => boolean
  isRejected: () => boolean
}

export interface CancelablePromise extends Promise<any> {
  cancel: () => void
  isFulfilled: () => boolean
  isResolved: () => boolean
  isRejected: () => boolean
}
