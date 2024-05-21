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
  ApexWallet = 'isApexWallet',
  AToken = 'isAToken',
  BifrostWallet = 'isBifrost',
  Binance = 'bbcSignTx',
  Bitpie = 'isBitpie',
  BlockWallet = 'isBlockWallet',
  Coinbase = 'isToshi',
  CoinbaseExtension = 'isCoinbaseWallet',
  Detected = 'request',
  Dcent = 'isDcentWallet',
  Exodus = 'isExodus',
  Frontier = 'isFrontier',
  Frame = 'isFrame',
  HuobiWallet = 'isHbWallet',
  HyperPay = 'isHyperPay',
  ImToken = 'isImToken',
  InfinityWallet = 'isInfinityWallet',
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
  Bitget = 'isBitKeep',
  Sequence = 'isSequence',
  Core = 'isAvalanche',
  Opera = 'isOpera',
  Bitski = 'isBitski',
  Enkrypt = 'isEnkrypt',
  Phantom = 'isPhantom',
  OKXWallet = 'isOkxWallet',
  Zeal = 'isZeal',
  Zerion = 'isZerion',
  Rainbow = 'isRainbow',
  SafePal = 'isSafePal',
  DeFiWallet = 'isDeficonnectProvider',
  Safeheron = 'isSafeheron',
  Talisman = 'isTalisman',
  OneKey = 'isOneKey',
  Fordefi = 'isFordefi',
  Coin98Wallet = 'isCoin98',
  SubWallet = 'isSubWallet',
  Kayros = 'isKayros',
  FoxWallet = 'isFoxWallet',
  Lif3Wallet = 'isLif3Wallet',
  ZodiacPilot = 'isZodiacPilot',
  StableWallet = 'isStableWallet',
  Echooo = 'isEchooo'
}

/**
 * The ProviderExternalUrl enum represents the external URLs associated
 * with different injected providers. It is used to direct end users who
 * do not have a wallet installed to the corresponding wallet installation page.
 * For this to be displayed a dapp must set `displayUnavailable`
 * to an array (to specify displayed unavailable wallets) or
 * true (to display all unavailable wallets) and a user select that wallet.
 */
export enum ProviderExternalUrl {
  Binance = 'https://www.bnbchain.org/ru/blog/binance-extension-wallet/',
  Bitget = 'https://web3.bitget.com/en/wallet-download',
  Coinbase = 'https://www.coinbase.com/wallet/downloads',
  MetaMask = 'https://metamask.io/download/',
  OKXWallet = 'https://okx.com/download',
  Phantom = 'https://phantom.app/ul/v1/connect',
  Talisman = 'https://www.talisman.xyz/',
  Trust = 'https://link.trustwallet.com',
  OneKey = 'https://onekey.so/download/',
  RoninWallet = 'https://wallet.skymavis.com/',
  Coin98Wallet = 'https://coin98.com/wallet/',
  SubWallet = 'https://www.subwallet.app/',
  Kayros = 'https://www.kayros.games/wallet/',
  XDEFI = 'https://xdefi.io/',
  FoxWallet = 'https://foxwallet.com/download',
  Lif3Wallet = 'https://lif3.com',
  Rabby = 'https://rabby.io',
  ZodiacPilot = 'https://pilot.gnosisguild.org/',
  Echooo = 'https://www.echooo.xyz'
}

export enum ProviderLabel {
  AlphaWallet = 'AlphaWallet',
  ApexWallet = 'Apex Wallet',
  AToken = 'AToken',
  BifrostWallet = 'Bifrost Wallet',
  Binance = 'Binance Smart Wallet',
  Bitpie = 'Bitpie',
  Bitski = 'Bitski',
  BlockWallet = 'BlockWallet',
  Brave = 'Brave Wallet',
  Coinbase = 'Coinbase Wallet',
  Dcent = `D'CENT`,
  Detected = 'Detected Wallet',
  Exodus = 'Exodus',
  Frame = 'Frame',
  Frontier = 'Frontier',
  HuobiWallet = 'Huobi Wallet',
  HyperPay = 'HyperPay',
  ImToken = 'imToken',
  InfinityWallet = 'Infinity Wallet',
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
  Tally = 'Taho',
  Rabby = 'Rabby Wallet',
  MathWallet = 'MathWallet',
  Bitget = 'Bitget Wallet',
  Sequence = 'Sequence',
  Core = 'Core',
  Enkrypt = 'Enkrypt',
  Zeal = 'Zeal',
  Phantom = 'Phantom',
  OKXWallet = 'OKX Wallet',
  Zerion = 'Zerion',
  Rainbow = 'Rainbow',
  SafePal = 'SafePal',
  DeFiWallet = 'DeFi Wallet',
  Safeheron = 'Safeheron',
  Talisman = 'Talisman',
  OneKey = 'OneKey',
  Fordefi = 'Fordefi',
  RoninWallet = 'Ronin Wallet',
  Coin98Wallet = 'Coin98 Wallet',
  SubWallet = 'SubWallet',
  Kayros = 'Kayros',
  FoxWallet = 'FoxWallet',
  Lif3Wallet = 'Lif3 Wallet',
  ZodiacPilot = 'Zodiac Pilot',
  StableWallet = 'StableWallet',
  Echooo = 'Echooo'
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
  Bitget = 'bitkeep',
  Avalanche = 'avalanche',
  Bitski = 'Bitski',
  Enkrypt = 'enkrypt',
  Zeal = 'zeal',
  Phantom = 'phantom',
  OKXWallet = 'okxwallet',
  Trust = 'trustwallet',
  Frontier = 'frontier',
  DeFiConnectProvider = 'deficonnectProvider',
  Safeheron = 'safeheron',
  Talisman = 'talismanEth',
  OneKey = '$onekey',
  RoninWallet = 'ronin',
  Coin98Wallet = 'coin98',
  SubWallet = 'SubWallet',
  Kayros = 'kayros',
  FoxWallet = 'foxwallet',
  Echooo = 'echooo'
}

export interface CustomWindow extends Window {
  BinanceChain: BinanceProvider
  ethereum: InjectedProvider
  tally: InjectedProvider
  zeal: InjectedProvider
  web3: ExternalProvider | MeetOneProvider
  arbitrum: InjectedProvider
  xfi: {
    ethereum: InjectedProvider
  }
  bitkeep: {
    ethereum: InjectedProvider
  }
  avalanche: InjectedProvider
  Bitski: {
    getProvider(): InjectedProvider
  }
  enkrypt: {
    providers: {
      ethereum: InjectedProvider
    }
  }
  frontier: {
    ethereum: InjectedProvider
  }
  phantom: {
    ethereum: InjectedProvider
  }
  okxwallet: InjectedProvider
  trustwallet: InjectedProvider
  deficonnectProvider: InjectedProvider
  safeheron: InjectedProvider
  talismanEth: InjectedProvider
  $onekey: {
    ethereum: InjectedProvider
  }
  ronin: {
    provider: InjectedProvider
  }
  coin98: {
    provider: InjectedProvider
  }
  SubWallet: {
    provider: InjectedProvider
  }
  kayros: InjectedProvider
  foxwallet: InjectedProvider
  echooo: {
    ethereum: InjectedProvider
  }
}

export type InjectedProvider = ExternalProvider &
  BinanceProvider &
  MeetOneProvider &
  Record<string, boolean> &
  Record<string, InjectedProvider[]>

export type WalletFilters = {
  /**A provider label mapped to a list of excluded platforms
   * or a boolean indicating if it should be included. */
  [key in ProviderLabel | string]?: Platform[] | boolean | 'unavailable'
}

export interface InjectedWalletOptions {
  /**A list of injected wallets to include that
   * are not included by default here: ./packages/injected/ */
  custom?: InjectedWalletModule[]
  /**A mapping of a provider label to a list of filtered platforms
   * or a boolean indicating if it should be included or not.
   * By default all wallets listed in ./packages/injected/
   * are included add them to here to remove them. */
  filter?: WalletFilters
  /**If set to true: Will display all unavailable injected wallets even if they
   * are not currently available to the end user.
   * If set to an array of ProviderLabel.walletLabel
   * those wallets will be the only unavailable injected wallets shown
   * For example [ProviderLabel.MetaMask, ProviderLabel.Trust]
   */
  displayUnavailable?: boolean | string[]
  /**A function that allows for customizing the message to be displayed if the wallet
   * is unavailable
   */
  walletUnavailableMessage?: (wallet: WalletModule) => string
  /**Function that can be used to sort the order of wallets that are displayed */
  sort?: (wallets: WalletModule[]) => WalletModule[]
  /** A boolean that can be passed to disable supporting 6963 (https://eips.ethereum.org/EIPS/eip-6963) 
   * which will display wallets available on the browser
   */
  disable6963Support?: boolean
}

export interface InjectedWalletModule extends WalletModule {
  injectedNamespace?: InjectedNameSpace
  checkProviderIdentity: (helpers: { provider: any; device: Device }) => boolean
  platforms: Platform[]
  /**
   * A Url to link users to a download page for the wallet
   * to be shown if not installed or available on the browser
   */
  externalUrl?: string
  eip6963Provider?: InjectedProvider
}

// Define a class for the "eip6963:requestProvider" event
export class EIP6963RequestProviderEvent extends Event {
  constructor() {
    super('eip6963:requestProvider')
  }
}

// Define an interface for the "eip6963:announceProvider" event
export interface EIP6963AnnounceProviderEvent extends Event {
  type: 'eip6963:announceProvider'
  detail: EIP6963ProviderDetail
}

// Define an interface for the provider details
export interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo
  provider: EIP1193Provider
}

// Define an interface for the provider information
export interface EIP6963ProviderInfo {
  uuid: string // Unique identifier of the wallet extension announcement, keep in mind it changes on every request-announcement cycle
  name: string // Name of the wallet extension
  icon: string // Icon for the wallet extension
  rdns: string // Reverse DNS name of the wallet extension
}
