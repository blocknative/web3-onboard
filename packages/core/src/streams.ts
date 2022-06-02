import type { Chain } from '@web3-onboard/common'
import { onDestroy, onMount, beforeUpdate, afterUpdate } from 'svelte'
import { Observable, Subject, defer, BehaviorSubject } from 'rxjs'
import {
  take,
  takeUntil,
  withLatestFrom,
  pluck,
  shareReplay
} from 'rxjs/operators'

import { resetStore } from './store/actions'
import { state } from './store'

import type { WalletState, ConnectOptions } from './types'

export const reset$ = new Subject<void>()
export const disconnectWallet$ = new Subject<WalletState['label']>()

export const connectWallet$ = new BehaviorSubject<{
  autoSelect?: ConnectOptions['autoSelect']
  actionRequired?: string
  inProgress: boolean
}>({ inProgress: false, actionRequired: '' })

export const switchChainModal$ = new BehaviorSubject<null | {
  chain: Chain
}>(null)

export const wallets$ = (
  state.select('wallets') as Observable<WalletState[]>
).pipe(shareReplay(1))

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
