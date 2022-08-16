import type { WalletState } from '@web3-onboard/core'

import { useAppState } from './useAppState'

export const useWallets = (): WalletState[] => useAppState('wallets')
