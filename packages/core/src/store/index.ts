import { BehaviorSubject, Subject, Observable } from 'rxjs'
import { distinctUntilKeyChanged, pluck, filter } from 'rxjs/operators'

import type { Chain } from '@bn-onboard/types'

import type {
  AppState,
  WalletState,
  Action,
  UpdateWalletAction
} from '../types'

import {
  ADD_CHAINS,
  ADD_WALLET,
  UPDATE_WALLET,
  REMOVE_WALLET,
  RESET_STORE
} from './constants'

import { APP_INITIAL_STATE } from '../constants'
import { notNullish } from '../utils'

// observable to log actions or do sideeffects after every state change
export const actions$ = new Subject<{
  action: Action
  state: AppState
}>()

function reducer(state: AppState, action: Action): AppState {
  const { type, payload } = action

  switch (type) {
    case ADD_CHAINS:
      return {
        ...state,
        chains: [...state.chains, ...(payload as Chain[])]
      }

    case ADD_WALLET:
      return {
        ...state,
        // add to front of wallets as it is now the primary wallet
        wallets: [payload as WalletState, ...state.wallets]
      }

    case UPDATE_WALLET: {
      const update = payload as UpdateWalletAction['payload']

      const updatedWallets = state.wallets.map(wallet =>
        wallet.label === update.id ? { ...wallet, ...update } : wallet
      )

      return {
        ...state,
        wallets: updatedWallets
      }
    }

    case REMOVE_WALLET: {
      const update = payload as { id: string }
      return {
        ...state,
        wallets: state.wallets.filter(({ label }) => label !== update.id)
      }
    }

    case RESET_STORE:
      return APP_INITIAL_STATE

    default:
      throw new Error(`Unknown type: ${type} in appStore reducer`)
  }
}

const _store = new BehaviorSubject<AppState>(APP_INITIAL_STATE)
const _stateUpdates = new Subject<AppState>()

_stateUpdates.subscribe(_store)

export function dispatch(action: Action): void {
  const state = _store.getValue()
  actions$.next({ action, state })

  _stateUpdates.next(reducer(state, action))
}

function select(): Observable<AppState>
function select<T extends keyof AppState>(stateKey: T): Observable<AppState[T]>
function select<T extends keyof AppState>(
  stateKey?: keyof AppState
): Observable<AppState[T]> | Observable<AppState> {
  if (!stateKey) return _stateUpdates.asObservable()

  const validStateKeys = Object.keys(_store.getValue())

  if (!validStateKeys.includes(String(stateKey))) {
    throw new Error(`key: ${stateKey} does not exist on this store`)
  }

  return _stateUpdates
    .asObservable()
    .pipe(
      distinctUntilKeyChanged(stateKey),
      pluck(stateKey),
      filter(notNullish)
    ) as Observable<AppState[T]>
}

function get(): AppState {
  return _store.getValue()
}

export const state = {
  select,
  get
}
