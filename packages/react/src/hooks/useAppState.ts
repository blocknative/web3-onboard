import * as React from 'react'
import { useSyncExternalStore } from 'use-sync-external-store/shim/index.js'

import type { AppState } from '@web3-onboard/core'
import { useWeb3Onboard } from '../context'

export const useAppState: {
  (): AppState
  <K extends keyof AppState>(stateKey?: K): AppState[K]
} = (stateKey = undefined) => {
  const web3Onboard = useWeb3Onboard()

  const { select, get } = web3Onboard.state

  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      const { unsubscribe } = stateKey
        ? select(stateKey).subscribe(onStoreChange)
        : select().subscribe(onStoreChange)

      return () => unsubscribe
    },
    [stateKey]
  )

  const getSnapshot = React.useCallback(() => {
    const snapshot = get()
    return stateKey ? snapshot[stateKey] : snapshot
  }, [stateKey])

  const getServerSnapshot = () => get() || getSnapshot
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
