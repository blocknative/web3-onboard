import { useCallback } from 'react'
import { useSyncExternalStore } from 'use-sync-external-store/shim/index.js'

import type { AppState } from '@web3-onboard/core'
import { useWeb3Onboard } from '../context.js'

export const useAppState: {
  (): AppState
  <K extends keyof AppState>(stateKey?: K): AppState[K]
} = (stateKey = undefined) => {
  const web3Onboard = useWeb3Onboard()

  const { select, get } = web3Onboard.state

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const { unsubscribe } = stateKey
        ? select(stateKey).subscribe(onStoreChange)
        : select().subscribe(onStoreChange)

      return () => unsubscribe
    },
    [stateKey]
  )

  const getSnapshot = useCallback(() => {
    const snapshot = get()
    return stateKey ? snapshot[stateKey] : snapshot
  }, [stateKey])

  const getServerSnapshot = () => get() || getSnapshot
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
