import type { SvelteComponent } from 'svelte'
import type setChain from './chain'
import type connect from './connect'
import type disconnect from './disconnect'
import type { state } from './store'
import type { addChains } from './store/actions'
import type en from './i18n/en.json'

import type {
  Device,
  WalletInit,
  ChainId,
  EIP1193Provider,
  WalletModule,
  Chain,
  TokenSymbol
} from '@bn-onboard/types'

export interface InitOptions {
  wallets: WalletInit[]
  appMetadata?: AppMetadata
  i18n?: i18nOptions
}

export interface AppMetadata {
  /* App name */
  name: string

  /* SVG icon string, with height set to 100% */
  icon: string

  /* Description of app*/
  description?: string

  /* Url to a getting started guide for app */
  gettingStartedGuide?: string

  /* Url that points to more information about app */
  explore?: string

  /** When no injected wallets detected, recommend the user to install some*/
  recommendedInjectedWallets?: RecommendedInjectedWallets[]
}

export type RecommendedInjectedWallets = {
  name: string
  url: string
}

export interface OnboardAPI {
  connectWallet: typeof connect
  disconnectWallet: typeof disconnect
  addChains: typeof addChains
  setChain: typeof setChain
  state: typeof state
}
export interface ConnectOptions {
  autoSelect?: string // wallet name to autoselect for user
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

export interface RequestArguments {
  method: string
  params?: unknown[] | unknown
}

export interface WalletState {
  label: string //  wallet name
  icon: string // wallet icon svg string
  provider: EIP1193Provider
  accounts: Account[]
  chain: ChainId
  instance?: unknown
}

export type Account = {
  address: Address
  ens: Ens | null
  balance: Balances
}

export type Balances = Record<TokenSymbol, string> | null

export interface Ens {
  name?: string
  avatar?: string
  contentHash?: string
  getText?: (key: string) => Promise<string | undefined>
}

export type Address = string

export type AddChains = (chains: Chain[]) => void
export interface OnboardActions {
  addChains: AddChains
}

export interface AppState {
  chains: Chain[]
  wallets: WalletState[]
}

export type InternalState = {
  svelteInstance: SvelteComponent | null
  walletModules: WalletModule[]
  appMetadata: AppMetadata | null
  device: Device | null
}

export type ValueOf<T> = T[keyof T]
export type Locale = string

export type i18nOptions = Record<Locale, i18n>

export type i18n = typeof en

// ==== ACTIONS ==== //
export type Action =
  | AddChainsAction
  | AddWalletAction
  | UpdateWalletAction
  | RemoveWalletAction
  | ResetStoreAction

export type AddChainsAction = { type: 'add_chains'; payload: Chain[] }

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
  payload: null
}
