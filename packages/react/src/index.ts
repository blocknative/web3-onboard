import { useEffect, useState } from 'react'

import Web3Onboard, {
  InitOptions,
  OnboardAPI,
  ConnectOptions,
  WalletState
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
