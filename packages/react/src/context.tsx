import * as React from 'react'
import Web3Onboard from '@web3-onboard/core'
import type { InitOptions, OnboardAPI } from '@web3-onboard/core'

const HOOK_ERROR_MESSAGE =
  'Must call the provided initialization method`init` method before using hooks.'

export let web3OnboardGlobal: OnboardAPI | undefined = undefined
// Flag indicating whether or not the context provider is being used
let usingContextProvider: boolean = false

export const init = (options: InitOptions): OnboardAPI => {
  web3OnboardGlobal = Web3Onboard(options)
  return web3OnboardGlobal
}

export const Context = React.createContext<OnboardAPI | undefined>(undefined)

export type Web3OnboardProviderProps = {
  web3Onboard: OnboardAPI
}

export function Web3OnboardProvider({
  children,
  web3Onboard
}: React.PropsWithChildren<Web3OnboardProviderProps>) {
  // Set the flag indicating that we are using the context provider rather than raw hooks
  usingContextProvider = true
  // Set the global web3Onboard instance to null as we are going to use the provided instance
  // rather than the global instance, so we want to clean up this reference.
  web3OnboardGlobal = undefined
  return (
    <Context.Provider value={web3Onboard as unknown as OnboardAPI}>
      {children}
    </Context.Provider>
  )
}

export function useWeb3Onboard() {
  // Use the context provided instance or the global instance
  const web3Onboard = usingContextProvider
    ? React.useContext(Context)
    : web3OnboardGlobal

  if (!web3Onboard) {
    throw new Error(HOOK_ERROR_MESSAGE)
  }

  return web3Onboard
}
