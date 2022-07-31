import * as React from 'react'

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
  (options?: ConnectOptions) => Promise<void>,
  (wallet: DisconnectOptions) => Promise<void>,
  (addresses?: string[]) => Promise<void>,
  (wallets: WalletInit[]) => void,
  (wallet: WalletState, address?: string) => void
] => {
  const web3Onboard = useWeb3Onboard()

  const { connectWallet, disconnectWallet } = web3Onboard

  const wallets = useAppState('wallets')
  const wallet = wallets[0] || null

  const [connecting, setConnecting] = React.useState<boolean>(false)

  const connect = React.useCallback(async (options?: ConnectOptions) => {
    setConnecting(true)

    await connectWallet(options)

    setConnecting(false)
  }, [])

  const disconnect = React.useCallback(async ({ label }: DisconnectOptions) => {
    setConnecting(true)

    await disconnectWallet({ label })

    setConnecting(false)
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
