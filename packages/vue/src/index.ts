import Web3Onboard from '@web3-onboard/core'
import type {
  InitOptions,
  OnboardAPI,
  ConnectOptions,
  DisconnectOptions,
  WalletState,
  ConnectedChain
} from '@web3-onboard/core'

// We use vue-demi to automatically use the correct reactivity API for both Vue 2 and Vue 3
import { ref, computed, readonly } from 'vue-demi'
import type { SetChainOptions, OnboardComposable } from './types'

// Vueuse helper to streamline the use of rxjs observables as vue refs
import { useObservable } from '@vueuse/rxjs'

// Onboard will be kept here to be reused every time that we access the composable
let web3Onboard: OnboardAPI | null = null

const init = (options: InitOptions): OnboardAPI => {
  web3Onboard = Web3Onboard(options)
  return web3Onboard
}

const useOnboard = (): OnboardComposable => {
  // Raise an error if init() wasn't called
  if (!web3Onboard) {
    throw new Error('web3Onboard is not initialized')
  }

  // Wallet related functions and variables
  const wallets = useObservable(web3Onboard.state.select('wallets'))

  const connectingWallet = ref<boolean>(false)

  const connectedWallet = computed<WalletState | null>(
    () => wallets?.value[0] ?? null
  )

  const connectWallet = async (options: ConnectOptions) => {
    connectingWallet.value = true
    await (web3Onboard as OnboardAPI).connectWallet(options)
    connectingWallet.value = false
  }

  const disconnectWallet = async (wallet: DisconnectOptions) => {
    connectingWallet.value = true
    await (web3Onboard as OnboardAPI).disconnectWallet(wallet)
    connectingWallet.value = false
  }

  const disconnectConnectedWallet = async () => {
    if (connectedWallet.value) {
      await disconnectWallet({ label: connectedWallet.value.label })
    }
  }

  // Chain related functions and variables
  const chains = useObservable(web3Onboard.state.select('chains'))

  const settingChain = ref<boolean>(false)

  const connectedChain = computed<ConnectedChain | null>(
    () => connectedWallet?.value?.chains[0] ?? null
  )

  const getChain = (walletLabel: string) => {
    const wallet = wallets?.value?.find(
      (w: WalletState) => w.label === walletLabel
    )
    return wallet?.chains[0] ?? null
  }

  const setChain = async (options: SetChainOptions) => {
    settingChain.value = true
    await (web3Onboard as OnboardAPI).setChain(options)
    settingChain.value = false
  }

  return {
    chains,
    connectWallet,
    connectedChain,
    connectedWallet,
    connectingWallet: readonly(connectingWallet),
    disconnectWallet,
    disconnectConnectedWallet,
    getChain,
    setChain,
    settingChain: readonly(settingChain),
    wallets
  }
}

export { init, useOnboard }
