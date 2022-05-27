import { BehaviorSubject, Subject, Observable } from 'rxjs'
import { distinctUntilKeyChanged, pluck, filter } from 'rxjs/operators'
import { locale } from 'svelte-i18n'
import type { Chain, WalletModule } from '@web3-onboard/common'

import { APP_INITIAL_STATE } from '../constants'
import { notNullish } from '../utils'

import { getBalance } from '../provider'

import type {
  AppState,
  WalletState,
  Action,
  UpdateWalletAction,
  AddWalletAction,
  UpdateAccountAction,
  UpdateAccountCenterAction,
  Locale,
  UpdateBalancesAction
} from '../types'

import {
  ADD_CHAINS,
  ADD_WALLET,
  UPDATE_WALLET,
  REMOVE_WALLET,
  RESET_STORE,
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_CENTER,
  SET_WALLET_MODULES,
  SET_LOCALE,
  UPDATE_BALANCES
} from './constants'

async function reducer(state: AppState, action: Action): Promise<AppState> {
  const { type, payload } = action

  switch (type) {
    case ADD_CHAINS:
      return {
        ...state,
        chains: [...state.chains, ...(payload as Chain[])]
      }

    case ADD_WALLET: {
      const wallet = payload as AddWalletAction['payload']
      const existingWallet = state.wallets.find(
        ({ label }) => label === wallet.label
      )

      return {
        ...state,
        wallets: [
          // add to front of wallets as it is now the primary wallet
          existingWallet || (payload as WalletState),
          // filter out wallet if it already existed
          ...state.wallets.filter(({ label }) => label !== wallet.label)
        ]
      }
    }

    case UPDATE_WALLET: {
      const update = payload as UpdateWalletAction['payload']
      const { id, ...walletUpdate } = update

      const updatedWallets = state.wallets.map(wallet =>
        wallet.label === id ? { ...wallet, ...walletUpdate } : wallet
      )

      return {
        ...state,
        wallets: updatedWallets
      }
    }

    case UPDATE_BALANCES: {
      const addresses = payload as UpdateBalancesAction['payload']
      const { wallets, chains } = state

      const updatedWallets = await Promise.all(
        wallets.map(async wallet => {
          const chain = chains.find(({ id }) => id === wallet.chains[0].id)

          const updatedAccounts = await Promise.all(
            wallet.accounts.map(async account => {
              // if no addresses then we want to update all address balances
              // otherwise check if address is in the supplied addresses array
              if (!addresses || addresses.includes(account.address)) {
                const updatedBalance = await getBalance(account.address, chain)
                return { ...account, balance: updatedBalance }
              }

              return account
            })
          )

          return { ...wallet, accounts: updatedAccounts }
        })
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

    case UPDATE_ACCOUNT: {
      const update = payload as UpdateAccountAction['payload']
      const { id, address, ...accountUpdate } = update

      const updatedWallets = state.wallets.map(wallet => {
        if (wallet.label === id) {
          wallet.accounts = wallet.accounts.map(account => {
            if (account.address === address) {
              return { ...account, ...accountUpdate }
            }

            return account
          })
        }

        return wallet
      })

      return {
        ...state,
        wallets: updatedWallets
      }
    }

    case UPDATE_ACCOUNT_CENTER: {
      const update = payload as UpdateAccountCenterAction['payload']
      return {
        ...state,
        accountCenter: {
          ...state.accountCenter,
          ...update
        }
      }
    }
    case SET_WALLET_MODULES: {
      return {
        ...state,
        walletModules: payload as WalletModule[]
      }
    }

    case SET_LOCALE: {
      // Set the locale in the svelte-i18n internal state
      locale.set(payload as Locale)
      return {
        ...state,
        locale: payload as Locale
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

export async function dispatch(action: Action): Promise<void> {
  const state = await _store.getValue()
  const nextState = await reducer(state, action)
  _stateUpdates.next(nextState)
}

async function select(): Promise<Observable<AppState>>
async function select<T extends keyof AppState>(stateKey: T): 
  Promise<Observable<AppState[T]>>
async function select<T extends keyof AppState>(
  stateKey?: keyof AppState
): Promise<Observable<AppState> | Observable<AppState[T]>> {
  if (!stateKey) return _stateUpdates.asObservable()

  const validStateKeys = await Object.keys(_store.getValue())
    
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
