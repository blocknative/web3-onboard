import type {
  ConnectOptions,
  DisconnectOptions,
  WalletState,
  ConnectedChain
} from '@web3-onboard/core'
import type { Ref, ComputedRef } from 'vue-demi'

// Syntax sugar for Readonly Refs
type ReadonlyRef<T> = Readonly<Ref<T>>

type SetChainOptions = {
  chainId: string
  chainNamespace?: string
  wallet: string
  rpcUrl?: string
  label?: string
  token?: string
}

interface OnboardComposable {
  alreadyConnectedWallets: ReadonlyRef<string[]>
  connectWallet: (options?: ConnectOptions) => Promise<WalletState[]>
  connectedChain: ComputedRef<ConnectedChain | null>
  connectedWallet: ComputedRef<WalletState | null>
  connectingWallet: ReadonlyRef<boolean>
  disconnectWallet: (wallet: DisconnectOptions) => Promise<WalletState[]>
  disconnectConnectedWallet: () => Promise<void>
  getChain: (walletLabel: string) => ConnectedChain | null
  lastConnectionTimestamp: ReadonlyRef<number>
  setChain: (options: SetChainOptions) => Promise<boolean>
  settingChain: ReadonlyRef<boolean>
  wallets: ReadonlyRef<WalletState[]>
}

export { type ReadonlyRef, type SetChainOptions, type OnboardComposable }
