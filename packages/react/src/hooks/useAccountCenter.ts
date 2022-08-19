import type { AccountCenter } from '@web3-onboard/core'
import { useWeb3Onboard } from '../context'

export const useAccountCenter = (): ((
  update: AccountCenter | Partial<AccountCenter>
) => void) => useWeb3Onboard().state.actions.updateAccountCenter
