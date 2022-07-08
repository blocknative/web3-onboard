import { useWeb3Onboard } from '../context'

export const useSetLocale = (): ((locale: string) => void) => {
  const web3Onboard = useWeb3Onboard()

  return web3Onboard.state.actions.setLocale
}
