import { useState, useCallback } from 'react'
import { useSyncExternalStore } from 'use-sync-external-store/shim/index.js'

import Web3Onboard from '@web3-onboard/core'
import type {
  InitOptions,
  OnboardAPI,
  ConnectOptions,
  DisconnectOptions,
  WalletState,
  ConnectedChain,
  AccountCenter,
  AppState,
  CustomNotification,
  Notification,
  Notify,
  UpdateNotification
} from '@web3-onboard/core'
import type { Chain, WalletInit } from '@web3-onboard/common'

export let web3Onboard: OnboardAPI | null = null

export const init = (options: InitOptions): OnboardAPI => {
  web3Onboard = Web3Onboard(options)
  return web3Onboard
}

const HOOK_ERROR_MESSAGE = 'Must initialize before using hooks.'

const useAppState: {
  (): AppState
  <K extends keyof AppState>(stateKey?: K): AppState[K]
} = (stateKey = undefined) => {
  if (!web3Onboard) throw new Error(HOOK_ERROR_MESSAGE)

  const { select, get } = web3Onboard.state

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const { unsubscribe } = stateKey
        ? select(stateKey).subscribe(onStoreChange)
        : select().subscribe(onStoreChange)

      return () => unsubscribe
    },
    [stateKey]
  )

  const getSnapshot = useCallback(() => {
    const snapshot = get()
    return stateKey ? snapshot[stateKey] : snapshot
  }, [stateKey])

  return useSyncExternalStore(subscribe, getSnapshot)
}

export const useConnectWallet = (): [
  { wallet: WalletState | null; connecting: boolean },
  (options?: ConnectOptions) => Promise<void>,
  (wallet: DisconnectOptions) => Promise<void>,
  (addresses?: string[]) => Promise<void>,
  (wallets: WalletInit[]) => void
] => {
  if (!web3Onboard) throw new Error(HOOK_ERROR_MESSAGE)

  const { connectWallet, disconnectWallet } = web3Onboard

  const wallets = useAppState('wallets')
  const wallet = wallets[0] || null

  const [connecting, setConnecting] = useState<boolean>(false)

  const connect = useCallback(async (options?: ConnectOptions) => {
    setConnecting(true)

    await connectWallet(options)

    setConnecting(false)
  }, [])

  const disconnect = useCallback(async ({ label }: DisconnectOptions) => {
    setConnecting(true)

    await disconnectWallet({ label })

    setConnecting(false)
  }, [])

  const updateBalances = web3Onboard.state.actions.updateBalances
  const setWalletModules = web3Onboard.state.actions.setWalletModules

  return [
    { wallet, connecting },
    connect,
    disconnect,
    updateBalances,
    setWalletModules
  ]
}

type SetChainOptions = {
  chainId: string
  chainNamespace?: string
}

export const useSetChain = (
  walletLabel?: string
): [
  {
    chains: Chain[]
    connectedChain: ConnectedChain | null
    settingChain: boolean
  },
  (options: SetChainOptions) => Promise<boolean>
] => {
  if (!web3Onboard) throw new Error(HOOK_ERROR_MESSAGE)

  const { setChain } = web3Onboard

  const { wallets, chains } = useAppState()

  const getChain = () => {
    const wallet = walletLabel
      ? wallets.find(({ label }) => label === walletLabel)
      : wallets[0]
    return wallet && wallet.chains ? wallet.chains[0] : null
  }

  const connectedChain = getChain()

  const [settingChain, setInProgress] = useState<boolean>(false)

  const set = useCallback(async (options: SetChainOptions) => {
    setInProgress(true)

    const success = await setChain({ ...options, wallet: walletLabel })

    setInProgress(false)

    return success
  }, [])

  return [{ chains, connectedChain, settingChain }, set]
}

export const useWallets = (): WalletState[] => {
  if (!web3Onboard) throw new Error(HOOK_ERROR_MESSAGE)

  return useAppState('wallets')
}

export const useNotifications = (): [
  Notification[],
  (updatedNotification: CustomNotification) => {
    dismiss: () => void
    update: UpdateNotification
  },
  (update: Partial<Notify>) => void
] => {
  if (!web3Onboard) throw new Error(HOOK_ERROR_MESSAGE)

  const customNotification = web3Onboard.state.actions.customNotification
  const updateNotify = web3Onboard.state.actions.updateNotify

  return [useAppState('notifications'), customNotification, updateNotify]
}

export const useSetLocale = (): ((locale: string) => void) => {
  if (!web3Onboard) throw new Error(HOOK_ERROR_MESSAGE)

  return web3Onboard.state.actions.setLocale
}

export const useAccountCenter = (): ((
  update: AccountCenter | Partial<AccountCenter>
) => void) => {
  if (!web3Onboard) throw new Error(HOOK_ERROR_MESSAGE)

  return web3Onboard.state.actions.updateAccountCenter
}
