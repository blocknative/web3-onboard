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
  GameStop = 'isGamestop',
  BitKeep = 'isBitKeep',
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
  Fordefi = 'isFordefi'
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
  BitKeep = 'https://bitkeep.com/en/download?type=0',  
  Coinbase = 'https://www.coinbase.com/wallet/downloads',
  MetaMask = 'https://metamask.io/download/',
  OKXWallet = 'https://okx.com/download',
  Phantom = 'https://phantom.app/download',
  Talisman = 'https://www.talisman.xyz/',
  Trust = 'https://trustwallet.com/download/',
  OneKey = 'https://onekey.so/download/',
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
  GameStop = 'GameStop Wallet',
  BitKeep = 'BitKeep',
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
  BitKeep = 'bitkeep',
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
  OneKey = '$onekey'
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
  gamestop: InjectedProvider
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
}

export interface InjectedWalletModule extends WalletModule {
  injectedNamespace: InjectedNameSpace
  checkProviderIdentity: (helpers: { provider: any; device: Device }) => boolean
  platforms: Platform[]
  /**  
   * A Url to link users to a download page for the wallet 
   * to be shown if not installed or available on the browser
  */
  externalUrl?: string
}
