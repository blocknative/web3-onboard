import { useState, useCallback } from 'react'

import type { ConnectedChain } from '@web3-onboard/core'
import type { Chain } from '@web3-onboard/common'
import { useAppState } from './useAppState'
import { useWeb3Onboard } from '../context'

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
  const web3Onboard = useWeb3Onboard()

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
