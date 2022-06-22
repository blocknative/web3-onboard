import Web3Onboard from '@web3-onboard/core'
import type {
  InitOptions,
  OnboardAPI,
  ConnectOptions,
  DisconnectOptions,
  WalletState,
  ConnectedChain
} from '@web3-onboard/core'

// Not sure why it can't be imported directly without passing for dist
import type { AppState } from '@web3-onboard/core/dist/types'

// We use vue-demi to automatically use the correct reactivity API for both Vue 2 and Vue 3
import { ref, computed, readonly, shallowRef } from 'vue-demi'
import type { SetChainOptions, OnboardComposable } from './types'

// Vueuse helper to use the localstorage as a reactive variable
import { useStorage } from '@vueuse/core'

// Vueuse helper to streamline the use of rxjs observables as vue refs
import { useSubscription } from '@vueuse/rxjs'

// Onboard will be kept here to be reused every time that we access the composable
let web3Onboard: OnboardAPI | null = null

// Useful data about the previously connected wallets that will synced with the localstorage
const alreadyConnectedWallets = useStorage<string[]>(
  'alreadyConnectedWallets',
  []
)
const lastConnectionTimestamp = useStorage<number>(
  'lastWalletConnectionTimestamp',
  0
)

// We store the internal onboard state as a shallowRef to have reactivity but with a smaller computational cost compared to a full ref
// Because it is shallow, we must update it every time replacing the entire object
const onboardState = shallowRef<AppState>({} as AppState)

const updateAlreadyConnectedWallets = () => {
  alreadyConnectedWallets.value = onboardState.value.wallets.map(
    (w: WalletState) => w.label
  )
}

const init = (options: InitOptions): OnboardAPI => {
  web3Onboard = Web3Onboard(options)
  onboardState.value = web3Onboard.state.get()

  // To avoid memory leaks, we use only one rxjs subscription to update the internal onboard state
  // This subscription will be automatically destroyed when the context is destroyed
  useSubscription(
    web3Onboard.state.select().subscribe(update => {
      onboardState.value = update
      updateAlreadyConnectedWallets()
    })
  )
  return web3Onboard
}

const useOnboard = (): OnboardComposable => {
  // Raise an error if init() wasn't called
  if (!web3Onboard) {
    throw new Error('web3Onboard is not initialized')
  }

  // Wallet related functions and variables

  const connectingWallet = ref<boolean>(false)
  const wallets = computed(() => onboardState.value.wallets)

  const connectedWallet = computed<WalletState | null>(() =>
    wallets.value.length > 0 ? wallets.value[0] : null
  )

  const connectWallet = async (options?: ConnectOptions) => {
    connectingWallet.value = true
    await (web3Onboard as OnboardAPI).connectWallet(options)
    lastConnectionTimestamp.value = Date.now()
    connectingWallet.value = false
  }

  const disconnectWallet = async (wallet: DisconnectOptions) => {
    connectingWallet.value = true
    await (web3Onboard as OnboardAPI).disconnectWallet(wallet)
    updateAlreadyConnectedWallets()
    connectingWallet.value = false
  }

  const disconnectConnectedWallet = async () => {
    if (connectedWallet.value) {
      await disconnectWallet({ label: connectedWallet.value.label })
    }
  }

  // Chain related functions and variables

  const settingChain = ref<boolean>(false)

  const connectedChain = computed<ConnectedChain | null>(
    () =>
      (connectedWallet &&
        connectedWallet.value &&
        connectedWallet.value.chains[0]) ||
      null
  )

  const getChain = (walletLabel: string) => {
    const wallet = onboardState.value.wallets.find(
      (w: WalletState) => w.label === walletLabel
    )
    return (wallet && wallet.chains[0]) || null
  }

  const setChain = async (options: SetChainOptions) => {
    settingChain.value = true
    await (web3Onboard as OnboardAPI).setChain(options)
    settingChain.value = false
  }

  return {
    alreadyConnectedWallets,
    connectWallet,
    connectedChain,
    connectedWallet,
    connectingWallet: readonly(connectingWallet),
    disconnectConnectedWallet,
    disconnectWallet,
    getChain,
    lastConnectionTimestamp,
    setChain,
    settingChain: readonly(settingChain),
    wallets
  }
}

export { init, useOnboard }
