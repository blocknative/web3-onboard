import type { AccountCenter } from '@web3-onboard/core'
import { useWeb3Onboard } from '../context'

export const useAccountCenter = (): ((
  update: AccountCenter | Partial<AccountCenter>
) => void) => {
  const web3Onboard = useWeb3Onboard()

  return web3Onboard.state.actions.updateAccountCenter
}
