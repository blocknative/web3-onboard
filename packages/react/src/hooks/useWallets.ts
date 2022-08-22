import type { WalletState } from '@web3-onboard/core'

import { useAppState } from './useAppState.js'

export const useWallets = (): WalletState[] => useAppState('wallets')
