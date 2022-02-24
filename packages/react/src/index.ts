import { useEffect, useState } from 'react'

import Web3Onboard, {
  InitOptions,
  OnboardAPI,
  ConnectOptions,
  WalletState,
  ConnectedChain
} from '@web3-onboard/core'

export let web3Onboard: OnboardAPI | null = null

export const init = (options: InitOptions) => {
  web3Onboard = Web3Onboard(options)
  return web3Onboard
}

export const useConnectWallet = () => {
  if (!web3Onboard) throw new Error('Must initialize before using hooks.')

  const [wallet, setConnectedWallet] = useState<WalletState | null>(null)
  const [connecting, setConnecting] = useState(false)

  const connect = async (options: ConnectOptions) => {
    setConnecting(true)

    const [lastConnectedWallet] = await (
      web3Onboard as OnboardAPI
    ).connectWallet(options)

    setConnecting(false)

    if (lastConnectedWallet) {
      setConnectedWallet(lastConnectedWallet)
    }
  }

  return [{ connecting, wallet }, connect]
}

export const useSetChain = (wallet: string) => {
  if (!web3Onboard) throw new Error('Must initialize before using hooks.')
  const { state, setChain } = web3Onboard as OnboardAPI
  const [chain, setChainState] = useState<ConnectedChain | null>(null)
  const [inProgress, setInProgress] = useState<boolean>(false)

  const findWallet = (wallets: WalletState[]) =>
    wallets.find(({ label }) => label === wallet)
  const currentWalletState = findWallet(state.get().wallets)
  currentWalletState && setChainState(currentWalletState.chains[0] || null)

  useEffect(() => {
    const { unsubscribe } = state.select('wallets').subscribe(wallets => {
      const wallet = findWallet(wallets)
      wallet && setChainState(wallet.chains[0] || null)
    })

    return unsubscribe
  })

  const set = async (options: {
    chainId: string
    chainNamespace?: string | undefined
    wallet?: string | undefined
  }) => {
    setInProgress(true)
    await setChain(options)
    setInProgress(false)
  }

  return [{ chain, inProgress }, set]
}

export const useWallets = () => {
  if (!web3Onboard) throw new Error('Must initialize before using hooks.')

  const [wallets, setConnectedWallets] = useState<WalletState[]>([])

  useEffect(() => {
    const wallets$ = (web3Onboard as OnboardAPI).state.select('wallets')
    const { unsubscribe } = wallets$.subscribe(setConnectedWallets)

    return unsubscribe
  })

  return wallets
}
