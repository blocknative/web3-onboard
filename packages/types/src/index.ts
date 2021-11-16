import type { ExternalProvider } from '@ethersproject/providers'

/**
 * A method that takes `WalletHelpers` and returns an initialised `WalletModule` or array of `WalletModule`s.
 */
export type WalletInit = (
  helpers: WalletHelpers
) => WalletModule | WalletModule[]

export type WalletHelpers = {
  device: Device
}

export type WalletExclusions = {
  // A provider label mapped to a list of excluded platforms or a boolean indicating if it should be included.
  [key in ProviderLabel | string]?: Platform[] | boolean
}

export interface InjectedWalletOptions {
  // A list of injected wallets to include that are not included by default here: ./packages/injected/
  wallets?: InjectedWalletModule[]
  // A mapping of a provider label to a list of excluded platforms
  // or a boolean indicating if it should be included or not.
  // By default all wallets listed in ./packages/injected/ are included add them to here to remove them.
  exclude?: WalletExclusions
}

export type Device = {
  os: DeviceOS
  type: DeviceType
  browser: DeviceBrowser
}

export interface WalletModule {
  // The label of the wallet
  label: ProviderLabel | string
  /**
   * Gets the icon of the wallet
   * @returns
   */
  getIcon: () => Promise<string>
  /**
   * @returns the wallet interface associated with the module
   */
  getInterface: () => Promise<WalletInterface>
  supported: boolean
  type: WalletModuleType
}

export type WalletModuleType = 'injected' | 'sdk' | 'hardware'

export interface InjectedWalletModule
  extends Omit<WalletModule, 'type' | 'supported'> {
  injectedNamespace: InjectedNameSpace
  checkProviderIdentity: (helpers: { provider: any; device: Device }) => boolean
  platforms: Platform[]
}

export type Platform = DeviceOSName | DeviceBrowserName | DeviceType | 'all'

export type DeviceOS = {
  name: DeviceOSName
  version: string
}

export type DeviceBrowser = {
  name: DeviceBrowserName
  version: string
}

export type DeviceOSName =
  | 'Windows Phone'
  | 'Windows'
  | 'macOS'
  | 'iOS'
  | 'Android'
  | 'Linux'
  | 'Chrome OS'

export type DeviceBrowserName =
  | 'Android Browser'
  | 'Chrome'
  | 'Chromium'
  | 'Firefox'
  | 'Microsoft Edge'
  | 'Opera'
  | 'Safari'

export type DeviceType = 'desktop' | 'mobile' | 'tablet'

export type ChainId = string

export type RpcUrl = string

export type WalletInterface = {
  provider: EIP1193Provider
}

export interface ProviderRpcError extends Error {
  message: string
  code: number
  data?: unknown
}

export interface ProviderMessage {
  type: string
  data: unknown
}

export interface ProviderInfo {
  chainId: ChainId
}
/**
 *  The account address
 */
export type Account = string

/**
 * An array of addresses
 */
export type ProviderAccounts = Account[]

export type ProviderEvent =
  | 'connect'
  | 'disconnect'
  | 'message'
  | 'chainChanged'
  | 'accountsChanged'

export interface SimpleEventEmitter {
  on(
    event: ProviderEvent,
    listener:
      | ConnectListener
      | DisconnectListener
      | MessageListener
      | ChainListener
      | AccountsListener
  ): void
  addListener(
    event: ProviderEvent,
    listener:
      | ConnectListener
      | DisconnectListener
      | MessageListener
      | ChainListener
      | AccountsListener
  ): void
  once(
    event: ProviderEvent,
    listener:
      | ConnectListener
      | DisconnectListener
      | MessageListener
      | ChainListener
      | AccountsListener
  ): void
  removeListener(
    event: ProviderEvent,
    listener:
      | ConnectListener
      | DisconnectListener
      | MessageListener
      | ChainListener
      | AccountsListener
  ): void
  off(
    event: ProviderEvent,
    listener:
      | ConnectListener
      | DisconnectListener
      | MessageListener
      | ChainListener
      | AccountsListener
  ): void
}

export type ConnectListener = (info: ProviderInfo) => void
export type DisconnectListener = (error: ProviderRpcError) => void
export type MessageListener = (message: ProviderMessage) => void
export type ChainListener = (chainId: ChainId) => void
export type AccountsListener = (accounts: ProviderAccounts) => void

export type RequestMethods =
  | 'eth_accounts'
  | 'eth_chainId'
  | 'eth_getBalance'
  | 'eth_requestAccounts'
  | 'wallet_addEthereumChain'
  | 'wallet_switchEthereumChain'

/**
 * The hexadecimal representation of the users
 */
export type Balance = string

interface BaseRequest {
  params?: never
}

export interface EthAccountsRequest extends BaseRequest {
  method: 'eth_accounts'
}

export interface EthChainIdRequest extends BaseRequest {
  method: 'eth_chainId'
}

export interface EthBalanceRequest {
  method: 'eth_getBalance'
  params: [string, (number | 'latest' | 'earliest' | 'pending')?]
}

export interface EIP1102Request extends BaseRequest {
  method: 'eth_requestAccounts'
}

export interface EIP3085Request {
  method: 'wallet_addEthereumChain'
  params: AddChainParams[]
}

export interface EIP3326Request {
  method: 'wallet_switchEthereumChain'
  params: { chainId: ChainId }[]
}

export type AddChainParams = {
  chainId: ChainId
  chainName?: string
  nativeCurrency: {
    name?: string
    symbol?: string
    decimals: number
  }
  rpcUrls: string[]
}

export interface EIP1193Provider extends SimpleEventEmitter {
  on(event: 'connect', listener: ConnectListener): void
  on(event: 'disconnect', listener: DisconnectListener): void
  on(event: 'message', listener: MessageListener): void
  on(event: 'chainChanged', listener: ChainListener): void
  on(event: 'accountsChanged', listener: AccountsListener): void
  request(args: EthAccountsRequest): Promise<ProviderAccounts>
  request(args: EthBalanceRequest): Promise<Balance>
  request(args: EIP1102Request): Promise<ProviderAccounts>
  request(args: EIP3326Request): Promise<null>
  request(args: EIP3085Request): Promise<null>
  request(args: EthChainIdRequest): Promise<ChainId>
}

export interface MeetOneProvider extends ExternalProvider {
  wallet?: string
}

export interface BinanceProvider extends EIP1193Provider {
  bbcSignTx: () => void
  requestAccounts: () => Promise<ProviderAccounts>
  isUnlocked: boolean
}

export enum InjectedNameSpace {
  Ethereum = 'ethereum',
  Binance = 'BinanceChain',
  Web3 = 'web3'
}

export interface CustomWindow extends Window {
  BinanceChain: BinanceProvider
  ethereum: InjectedProvider
  web3: ExternalProvider | MeetOneProvider
}

export type InjectedProvider = ExternalProvider &
  BinanceProvider &
  MeetOneProvider &
  ExternalProvider &
  Record<string, boolean>

/**
 * The `ProviderIdentityFlag` is a property on an injected provider
 * that uniquely identifies that provider
 */
export enum ProviderIdentityFlag {
  AlphaWallet = 'isAlphaWallet',
  AToken = 'isAToken',
  Binance = 'bbcSignTx',
  Bitpie = 'isBitpie',
  BlankWallet = 'isBlank',
  Coinbase = 'isWalletLink',
  Detected = 'request',
  Dcent = 'isDcentWallet',
  Frame = 'isFrame',
  HuobiWallet = 'isHbWallet',
  HyperPay = 'isHyperPay',
  ImToken = 'isImToken',
  Liquality = 'isLiquality',
  MeetOne = 'wallet',
  MetaMask = 'isMetaMask',
  MyKey = 'isMYKEY',
  OwnBit = 'isOwnbit',
  Status = 'isStatus',
  Trust = 'isTrust',
  TokenPocket = 'isTokenPocket',
  TP = 'isTp',
  WalletIo = 'isWalletIO',
  XDEFI = 'isXDEFI'
}

export enum ProviderLabel {
  AlphaWallet = 'AlphaWallet',
  AToken = 'AToken',
  Binance = 'Binance Smart Wallet',
  Bitpie = 'Bitpie',
  BlankWallet = 'BlankWallet',
  Coinbase = 'Coinbase Wallet',
  Dcent = "D'CENT",
  Detected = 'Detected Wallet',
  Frame = 'Frame',
  HuobiWallet = 'Huobi Wallet',
  HyperPay = 'HyperPay',
  ImToken = 'imToken',
  Liquality = 'Liquality',
  MeetOne = 'MeetOne',
  MetaMask = 'MetaMask',
  MyKey = 'MyKey',
  Opera = 'Opera Wallet',
  OwnBit = 'OwnBit',
  Status = 'Status Wallet',
  Trust = 'Trust Wallet',
  TokenPocket = 'TokenPocket',
  TP = 'TP Wallet',
  WalletIo = 'Wallet.io',
  XDEFI = 'XDEFI Wallet'
}

export enum ProviderRpcErrorCode {
  /** The user rejected the request. */
  RejectedRequest = '4001',

  /** The requested method and/or account has not been authorized by the user. */
  Unauthorized = '4100',

  /** The Provider does not support the requested method. */
  UnsupportedMethod = '4200',

  /** The Provider is disconnected from all chains. */
  Disconnected = '4900',

  /** The Provider is not connected to the requested chain. */
  ChainDisconnected = '4901'
}
