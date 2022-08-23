import type { ExternalProvider } from '@ethersproject/providers'
import {
  EIP1193Provider,
  WalletModule,
  ProviderAccounts,
  Platform,
  Device
} from '@web3-onboard/common'

/**
 * The `ProviderIdentityFlag` is a property on an injected provider
 * that uniquely identifies that provider
 */
export enum ProviderIdentityFlag {
  AlphaWallet = 'isAlphaWallet',
  AToken = 'isAToken',
  Binance = 'bbcSignTx',
  Bitpie = 'isBitpie',
  BlockWallet = 'isBlockWallet',
  Coinbase = 'isToshi',
  CoinbaseExtension = 'isCoinbaseWallet',
  Detected = 'request',
  Dcent = 'isDcentWallet',
  Exodus = 'isExodus',
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
  XDEFI = 'isXDEFI',
  OneInch = 'isOneInchIOSWallet',
  Tokenary = 'isTokenary',
  Tally = 'isTally',
  BraveWallet = 'isBraveWallet',
  Rabby = 'isRabby',
  MathWallet = 'isMathWallet',
  GameStop = 'isGamestop',
  BitKeep = 'isBitKeep',
  Sequence = 'isSequence'
}

export enum ProviderLabel {
  AlphaWallet = 'AlphaWallet',
  AToken = 'AToken',
  Binance = 'Binance Smart Wallet',
  Bitpie = 'Bitpie',
  BlockWallet = 'BlockWallet',
  Brave = 'Brave Wallet',
  Coinbase = 'Coinbase Wallet',
  Dcent = `D'CENT`,
  Detected = 'Detected Wallet',
  Exodus = 'Exodus',
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
  XDEFI = 'XDEFI Wallet',
  OneInch = '1inch Wallet',
  Tokenary = 'Tokenary Wallet',
  Tally = 'Tally Wallet',
  Rabby = 'Rabby',
  MathWallet = 'MathWallet',
  GameStop = 'GameStop Wallet',
  BitKeep = 'BitKeep',
  Sequence = 'Sequence'
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
  Tally = 'tally',
  Web3 = 'web3',
  Arbitrum = 'arbitrum',
  XFI = 'xfi',
  GameStop = 'gamestop',
  BitKeep = 'bitkeep'
}

export interface CustomWindow extends Window {
  BinanceChain: BinanceProvider
  ethereum: InjectedProvider
  tally: InjectedProvider
  web3: ExternalProvider | MeetOneProvider
  arbitrum: InjectedProvider
  xfi: {
    ethereum: InjectedProvider
  }
  gamestop: InjectedProvider,
  bitkeep: {
    ethereum: InjectedProvider
  }
}

export type InjectedProvider = ExternalProvider &
  BinanceProvider &
  MeetOneProvider &
  Record<string, boolean> &
  Record<string, InjectedProvider[]>

export type WalletFilters = {
  // A provider label mapped to a list of excluded platforms
  // or a boolean indicating if it should be included.
  [key in ProviderLabel | string]?: Platform[] | boolean
}

export interface InjectedWalletOptions {
  // A list of injected wallets to include that
  // are not included by default here: ./packages/injected/
  custom?: InjectedWalletModule[]
  // A mapping of a provider label to a list of filtered platforms
  // or a boolean indicating if it should be included or not.
  // By default all wallets listed in ./packages/injected/
  // are included add them to here to remove them.
  filter?: WalletFilters
}

export interface InjectedWalletModule extends WalletModule {
  injectedNamespace: InjectedNameSpace
  checkProviderIdentity: (helpers: { provider: any; device: Device }) => boolean
  platforms: Platform[]
}
