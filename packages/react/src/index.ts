import { useEffect, useState, useCallback, useMemo } from 'react'

import Web3Onboard from '@web3-onboard/core'
import type {
  InitOptions,
  OnboardAPI,
  ConnectOptions,
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
  (wallet: WalletState) => Promise<void>
] => {
  if (!web3Onboard) throw new Error('Must initialize before using hooks.')

  const [wallet, setConnectedWallet] = useState<WalletState | null>(null)
  const [connecting, setConnecting] = useState(false)

  const connect = useCallback(async (options: ConnectOptions) => {
    setConnecting(true)

    const [lastConnectedWallet] = await (
      web3Onboard as OnboardAPI
    ).connectWallet(options)

    setConnecting(false)

    if (lastConnectedWallet) {
      setConnectedWallet(lastConnectedWallet)
    }
  }, [])

  const disconnect = useCallback(async wallet => {
    setConnecting(true)

    await (
      web3Onboard as OnboardAPI
    ).disconnectWallet({ label: wallet.label })

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
  (options: SetChainOptions) => Promise<void>
] => {
  if (!web3Onboard) throw new Error('Must initialize before using hooks.')

  const { state, setChain } = web3Onboard as OnboardAPI
  const [settingChain, setInProgress] = useState<boolean>(false)

  const [connectedChain, setConnectedChain] = useState<ConnectedChain | null>(
    null
  )

  const chains = useMemo(() => state.get().chains, [])

  useEffect(() => {
    const { unsubscribe } = state.select('wallets').subscribe(wallets => {
      const wallet =
        wallets.find(({ label }) => label === walletLabel) || wallets[0]

      wallet && setConnectedChain(wallet.chains[0])
    })

    return unsubscribe
  }, [])

  const set = useCallback(async (options: SetChainOptions) => {
    setInProgress(true)

    await setChain({ ...options, wallet: walletLabel })

    setInProgress(false)
  }, [])

  return [{ chains, connectedChain, settingChain }, set]
}

export const useWallets = (): WalletState[] => {
  if (!web3Onboard) throw new Error('Must initialize before using hooks.')

  const [wallets, setConnectedWallets] = useState<WalletState[]>([])

  useEffect(() => {
    const wallets$ = (web3Onboard as OnboardAPI).state.select('wallets')
    const { unsubscribe } = wallets$.subscribe(setConnectedWallets)

    return unsubscribe
  }, [])

  return wallets
}
