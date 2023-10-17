import { createSignal, createEffect, createMemo, Signal } from 'solid-js'
import { SetStoreFunction, Store, createStore } from 'solid-js/store'
import Web3Onboard from '@web3-onboard/core'
import type {
  InitOptions,
  OnboardAPI,
  ConnectOptions,
  DisconnectOptions,
  WalletState,
  ConnectedChain,
  AppState
} from '@web3-onboard/core'
import { OnboardComposable, SetChainOptions } from './types'
export type * from '@web3-onboard/core'
export type * from './types'

export const STORAGE_KEYS = {
  TERMS_AGREEMENT: 'onboard.js:agreement',
  LAST_CONNECTED_WALLET: 'onboard.js:last_connected_wallet'
}

function createLocalStore<T extends object>(
  name: string,
  init: T
): [Store<T>, SetStoreFunction<T>] {
  const localState = localStorage.getItem(name)

  const [state, setState] = createStore<T>(
    localState ? (JSON.parse(localState) as T) : init
  )
  createEffect(() => {
    localStorage.setItem(name, JSON.stringify(state))
  })
  return [state, setState]
}

function createLocalStorageSignal<T>(
  key: string,
  defaultValue: T,
  storage = localStorage
): Signal<T> {
  const initialValue: T =
    JSON.parse(storage.getItem(key) ?? '{}').value ?? defaultValue

  const [value, setValue] = createSignal<T>(initialValue as T)

  const setValueAndStore = ((arg: any) => {
    const v = setValue(arg)
    storage.setItem(key, JSON.stringify({ value: v }))
    return v
  }) as typeof setValue

  return [value, setValueAndStore]
}

// Onboard will be kept here to be reused every time that we access the composable
let web3Onboard: OnboardAPI | null = null

const [alreadyConnectedWallets, setAlreadyConnectedWallets] = createLocalStore<
  string[]
>(STORAGE_KEYS.LAST_CONNECTED_WALLET, [])
const [lastConnectionTimestamp, setLastConnectionTimestamp] =
  createLocalStorageSignal('lastConnectionTimestamp', 0)
const [onboardState, setOnboardState] = createStore<AppState>({} as AppState)

const updateAlreadyConnectedWallets = () => {
  setAlreadyConnectedWallets(
    onboardState.wallets.map((w: WalletState) => w.label)
  )
}

const init = (options: InitOptions): OnboardAPI => {
  web3Onboard = Web3Onboard(options)
  setOnboardState(web3Onboard.state.get())

  createEffect(() => {
    web3Onboard?.state.select().subscribe((update: AppState) => {
      setOnboardState(update)
      updateAlreadyConnectedWallets()
    })
  })

  return web3Onboard
}

const useOnboard = (): OnboardComposable => {
  // Raise an error if init() wasn't called
  if (!web3Onboard) {
    throw new Error('web3Onboard is not initialized')
  }

  // Wallet related functions and variables
  const [connectingWallet, setConnectingWallet] = createSignal<boolean>(false)
  const wallets = createMemo(() => onboardState.wallets)

  const connectedWallet = createMemo<WalletState | null>(() =>
    wallets().length > 0 ? wallets()[0] : null
  )

  const connectWallet = async (options?: ConnectOptions) => {
    setConnectingWallet(true)
    await (web3Onboard as OnboardAPI).connectWallet(options)
    setLastConnectionTimestamp(Date.now())
    setConnectingWallet(false)
  }

  const disconnectWallet = async (wallet: DisconnectOptions) => {
    setConnectingWallet(true)
    await (web3Onboard as OnboardAPI).disconnectWallet(wallet)
    updateAlreadyConnectedWallets()
    setConnectingWallet(false)
  }

  const disconnectConnectedWallet = async () => {
    if (connectedWallet()) {
      await disconnectWallet({ label: connectedWallet()!.label })
    }
  }

  // Chain related functions and variables
  const [settingChain, setSettingChain] = createSignal<boolean>(false)
  const connectedChain = createMemo<ConnectedChain | null>(
    () => (connectedWallet() && connectedWallet()!.chains[0]) || null
  )

  const getChain = (walletLabel: string) => {
    const wallet = onboardState.wallets.find(
      (w: WalletState) => w.label === walletLabel
    )
    return (wallet && wallet.chains[0]) || null
  }

  const setChain = async (options: SetChainOptions) => {
    setSettingChain(true)
    await (web3Onboard as OnboardAPI).setChain(options)
    setSettingChain(false)
  }

  return {
    alreadyConnectedWallets,
    connectWallet,
    connectedChain,
    connectedWallet,
    connectingWallet,
    disconnectConnectedWallet,
    disconnectWallet,
    getChain,
    lastConnectionTimestamp,
    setChain,
    settingChain,
    wallets
  }
}

export { init, useOnboard, OnboardComposable, OnboardAPI, InitOptions }
