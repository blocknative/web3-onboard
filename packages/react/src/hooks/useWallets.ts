import type { WalletState } from '@web3-onboard/core'

import { useAppState } from './useAppState'

export const useWallets = (): WalletState[] => {
  return useAppState('wallets')
}
