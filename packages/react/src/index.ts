import { useState, useCallback, useSyncExternalStore } from 'react'

import Web3Onboard from '@web3-onboard/core'
import type {
  InitOptions,
  OnboardAPI,
  ConnectOptions,
  DisconnectOptions,
  WalletState,
  ConnectedChain
} from '@web3-onboard/core'

import type { Chain } from '@web3-onboard/common'
import type { AppState } from '@web3-onboard/core/dist/types'

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

  const subscribe = useCallback((onStoreChange: () => void) => {
    const { unsubscribe } = stateKey
      ? select(stateKey).subscribe(onStoreChange)
      : select().subscribe(onStoreChange)

    return () => unsubscribe
  }, [stateKey])

  const getSnapshot = useCallback(() => {
    const snapshot = get()
    return stateKey ? snapshot[stateKey] : snapshot
  }, [stateKey])

  return useSyncExternalStore(subscribe, getSnapshot)
  }

export const useConnectWallet = (): [
  { wallet: WalletState | null; connecting: boolean },
  (options?: ConnectOptions) => Promise<void>,
  (wallet: DisconnectOptions) => Promise<void>
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

  const disconnect = useCallback(async ({ label }) => {
    setConnecting(true)

    await disconnectWallet({ label })

    setConnecting(false)
  }, [])

  return [{ wallet, connecting }, connect, disconnect]
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
  (options: SetChainOptions) => Promise<void>
] => {
  if (!web3Onboard) throw new Error(HOOK_ERROR_MESSAGE)

  const { setChain } = web3Onboard

  const { wallets, chains } = useAppState()

  const connectedChain =
    (walletLabel
      ? wallets.find(({ label }) => label === walletLabel)
      : wallets[0]
    )?.chains[0] || null

  const [settingChain, setInProgress] = useState<boolean>(false)

  const set = useCallback(async (options: SetChainOptions) => {
    setInProgress(true)

    await setChain({ ...options, wallet: walletLabel })

    setInProgress(false)
  }, [])

  return [{ chains, connectedChain, settingChain }, set]
}

export const useWallets = (): WalletState[] => {
  if (!web3Onboard) throw new Error(HOOK_ERROR_MESSAGE)

  return useAppState('wallets')
}
