import { useWeb3Onboard } from '../context.js'

export const useSetLocale = (): ((locale: string) => void) =>
  useWeb3Onboard().state.actions.setLocale
