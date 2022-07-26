import * as React from 'react'

import Web3Onboard from '@web3-onboard/core'

import type { InitOptions, OnboardAPI } from '@web3-onboard/core'

export const init = (options: InitOptions): OnboardAPI => Web3Onboard(options)

export const Context = React.createContext<OnboardAPI | undefined>(undefined)

export type Web3OnboardProviderProps = {
  web3Onboard: OnboardAPI
}

export function Web3OnboardProvider({
  children,
  web3Onboard
}: React.PropsWithChildren<Web3OnboardProviderProps>) {
  return (
    <Context.Provider value={web3Onboard as unknown as OnboardAPI}>
      {children}
    </Context.Provider>
  )
}

export function useWeb3Onboard() {
  const web3Onboard = React.useContext(Context)
  if (!web3Onboard)
    throw new Error(
      '`useWeb3Onboard` must be used within `Web3OnboardProvider`.'
    )
  return web3Onboard
}
