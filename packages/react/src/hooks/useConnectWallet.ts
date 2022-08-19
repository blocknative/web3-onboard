import { useCallback, useState } from 'react'

import type {
  ConnectOptions,
  DisconnectOptions,
  WalletState
} from '@web3-onboard/core'
import type { WalletInit } from '@web3-onboard/common'
import { useWeb3Onboard } from '../context'
import { useAppState } from './useAppState'

export const useConnectWallet = (): [
  { wallet: WalletState | null; connecting: boolean },
  (options?: ConnectOptions) => Promise<WalletState[]>,
  (wallet: DisconnectOptions) => Promise<WalletState[]>,
  (addresses?: string[]) => Promise<void>,
  (wallets: WalletInit[]) => void,
  (wallet: WalletState, address?: string) => void
] => {
  const web3Onboard = useWeb3Onboard()

  const { connectWallet, disconnectWallet } = web3Onboard

  const wallets = useAppState('wallets')
  const wallet = wallets[0] || null

  const [connecting, setConnecting] = useState<boolean>(false)

  const connect = useCallback(async (options?: ConnectOptions) => {
    setConnecting(true)

    const walletState = await connectWallet(options)

    setConnecting(false)

    return walletState
  }, [])

  const disconnect = useCallback(async ({ label }: DisconnectOptions) => {
    setConnecting(true)

    const walletState = await disconnectWallet({ label })

    setConnecting(false)

    return walletState
  }, [])

  const updateBalances = web3Onboard.state.actions.updateBalances
  const setWalletModules = web3Onboard.state.actions.setWalletModules
  const setPrimaryWallet = web3Onboard.state.actions.setPrimaryWallet

  return [
    { wallet, connecting },
    connect,
    disconnect,
    updateBalances,
    setWalletModules,
    setPrimaryWallet
  ]
}
