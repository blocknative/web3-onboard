import { Observable, Subject, defer, BehaviorSubject } from 'rxjs'
import {
  take,
  takeUntil,
  withLatestFrom,
  pluck,
  share,
  shareReplay
} from 'rxjs/operators'
import { onDestroy, onMount, beforeUpdate, afterUpdate } from 'svelte'
import type { Chain } from '@bn-onboard/types'

import { resetStore } from './store/actions'
import { state } from './store'
import type { WalletState, InternalState } from './types'

export const reset$ = new Subject<void>()
export const disconnectWallet$ = new Subject<WalletState['label']>()

export const internalState$ = new BehaviorSubject<InternalState>({
  svelteInstance: null,
  walletModules: [],
  appMetadata: null,
  device: null
})

export const connectWallet$ = new BehaviorSubject<{
  autoSelect?: string
  inProgress: boolean
}>({ inProgress: false })

export const switchChainModal$ = new BehaviorSubject<null | {
  chain: Chain
}>(null)

export const wallets$ = (
  state.select('wallets') as Observable<WalletState[]>
).pipe(share())

// reset logic
reset$.pipe(withLatestFrom(wallets$), pluck('1')).subscribe(wallets => {
  // disconnect all wallets
  wallets.forEach(({ label }) => {
    disconnectWallet$.next(label)
  })

  resetStore()
})

export const onMount$ = defer(() => {
  const subject = new Subject<void>()
  onMount(() => {
    subject.next()
  })
  return subject.asObservable().pipe(take(1))
})

export const onDestroy$ = defer(() => {
  const subject = new Subject<void>()
  onDestroy(() => {
    subject.next()
  })
  return subject.asObservable().pipe(take(1))
})

export const afterUpdate$ = defer(() => {
  const subject = new Subject<void>()
  afterUpdate(() => {
    subject.next()
  })
  return subject.asObservable().pipe(takeUntil(onDestroy$))
})

export const beforeUpdate$ = defer(() => {
  const subject = new Subject<void>()
  beforeUpdate(() => {
    subject.next()
  })
  return subject.asObservable().pipe(takeUntil(onDestroy$))
})
