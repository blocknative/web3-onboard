import type { WagmiConfig } from '@web3-onboard/core'
import { useAppState } from './useAppState.js'

export const useWagmiConfig = (): WagmiConfig | null =>
  useAppState('wagmiConfig')
