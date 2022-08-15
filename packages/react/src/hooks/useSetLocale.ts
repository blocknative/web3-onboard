import { useWeb3Onboard } from '../context'

export const useSetLocale = (): ((locale: string) => void) =>
  useWeb3Onboard().state.actions.setLocale
