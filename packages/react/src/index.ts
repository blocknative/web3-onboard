import { useEffect, useState, useCallback, useMemo } from 'react'

import Web3Onboard from '@web3-onboard/core'
import type {
  InitOptions,
  OnboardAPI,
  ConnectOptions,
  DisconnectOptions,
  WalletState,
  ConnectedChain
} from '@web3-onboard/core'

import { Chain } from '@web3-onboard/common'

export let web3Onboard: OnboardAPI | null = null

export const init = (options: InitOptions): OnboardAPI => {
  web3Onboard = Web3Onboard(options)
  return web3Onboard
}

export const useConnectWallet = (): [
  { wallet: WalletState | null; connecting: boolean },
  (options: ConnectOptions) => Promise<void>,
  (wallet: DisconnectOptions) => Promise<void>
] => {
  if (!web3Onboard) throw new Error('Must initialize before using hooks.')

  const [wallet, setConnectedWallet] = useState<WalletState | null>(
    () => (web3Onboard as OnboardAPI).state.get().wallets[0] || null
  )
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    const subscription = (web3Onboard as OnboardAPI).state
      .select('wallets')
      .subscribe(wallets => setConnectedWallet(wallets[0] || null))

    return () => subscription.unsubscribe()
  }, [wallet])

  const connect = useCallback(async (options: ConnectOptions) => {
    setConnecting(true)

    const [connectedWallet] = await (web3Onboard as OnboardAPI).connectWallet(
      options
    )

    setConnecting(false)
    setConnectedWallet(connectedWallet || null)
  }, [])

  const disconnect = useCallback(async ({ label }) => {
    setConnecting(true)

    await (web3Onboard as OnboardAPI).disconnectWallet({ label })

    setConnectedWallet(null)
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
  (options: SetChainOptions) => Promise<boolean>
] => {
  if (!web3Onboard) throw new Error('Must initialize before using hooks.')

  const { state, setChain } = web3Onboard as OnboardAPI
  const [settingChain, setInProgress] = useState<boolean>(false)

  const [connectedChain, setConnectedChain] = useState<ConnectedChain | null>(
    () => {
      const initialWallets = (web3Onboard as OnboardAPI).state.get().wallets
      if (initialWallets.length === 0) return null
      return (
        (
          initialWallets.find(({ label }) => label === walletLabel) ||
          initialWallets[0]
        ).chains[0] || null
      )
    }
  )

  const chains = useMemo(() => state.get().chains, [])

  useEffect(() => {
    const subscription = state.select('wallets').subscribe(wallets => {
      const wallet =
        wallets.find(({ label }) => label === walletLabel) || wallets[0]

      wallet && setConnectedChain(wallet.chains[0])
    })

    return () => subscription.unsubscribe()
  }, [])

  const set = useCallback(async (options: SetChainOptions): Promise<boolean> => {
    setInProgress(true)

    const success = await setChain({ ...options, wallet: walletLabel })

    setInProgress(false)

    return success;
  }, [])

  return [{ chains, connectedChain, settingChain }, set]
}

export const useWallets = (): WalletState[] => {
  if (!web3Onboard) throw new Error('Must initialize before using hooks.')

  const [wallets, setConnectedWallets] = useState<WalletState[]>(
    () => (web3Onboard as OnboardAPI).state.get().wallets
  )

  useEffect(() => {
    const wallets$ = (web3Onboard as OnboardAPI).state.select('wallets')
    const subscription = wallets$.subscribe(setConnectedWallets)

    return () => subscription.unsubscribe()
  }, [])

  return wallets
}
