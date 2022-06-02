import type { Chain, WalletInit } from '@web3-onboard/common'
import { internalState$ } from '../streams'
import { initializeWalletModules, uniqueWalletsByLabel } from '../utils'
import { dispatch } from './index'

import type {
  Account,
  AddChainsAction,
  AddWalletAction,
  AccountCenter,
  RemoveWalletAction,
  ResetStoreAction,
  SetWalletModulesAction,
  SetLocaleAction,
  UpdateAccountAction,
  UpdateAccountCenterAction,
  UpdateWalletAction,
  WalletState,
  UpdateAllWalletsAction
} from '../types'

import {
  validateAccountCenterUpdate,
  validateLocale,
  validateString,
  validateWallet,
  validateWalletInit,
  validateUpdateBalances
} from '../validation'

import {
  ADD_CHAINS,
  UPDATE_WALLET,
  RESET_STORE,
  ADD_WALLET,
  REMOVE_WALLET,
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_CENTER,
  SET_WALLET_MODULES,
  SET_LOCALE,
  UPDATE_ALL_WALLETS
} from './constants'

export function addChains(chains: Chain[]): void {
  // chains are validated on init
  const action = {
    type: ADD_CHAINS,
    payload: chains.map(({ namespace = 'evm', ...rest }) => ({
      ...rest,
      namespace
    }))
  }

  dispatch(action as AddChainsAction)
}

export function addWallet(wallet: WalletState): void {
  const error = validateWallet(wallet)

  if (error) {
    console.error(error)
    throw error
  }

  const action = {
    type: ADD_WALLET,
    payload: wallet
  }

  dispatch(action as AddWalletAction)
}

export function updateWallet(id: string, update: Partial<WalletState>): void {
  const error = validateWallet(update)

  if (error) {
    console.error(error)
    throw error
  }

  const action = {
    type: UPDATE_WALLET,
    payload: {
      id,
      ...update
    }
  }

  dispatch(action as UpdateWalletAction)
}

export function removeWallet(id: string): void {
  const error = validateString(id)

  if (error) {
    throw error
  }

  const action = {
    type: REMOVE_WALLET,
    payload: {
      id
    }
  }

  dispatch(action as RemoveWalletAction)
}

export function updateAccount(
  id: string,
  address: string,
  update: Partial<Account>
): void {
  const action = {
    type: UPDATE_ACCOUNT,
    payload: {
      id,
      address,
      ...update
    }
  }

  dispatch(action as UpdateAccountAction)
}

export function updateAccountCenter(
  update: AccountCenter | Partial<AccountCenter>
): void {
  const error = validateAccountCenterUpdate(update)

  if (error) {
    throw error
  }

  const action = {
    type: UPDATE_ACCOUNT_CENTER,
    payload: update
  }

  dispatch(action as UpdateAccountCenterAction)
}

export function resetStore(): void {
  const action = {
    type: RESET_STORE
  }

  dispatch(action as ResetStoreAction)
}

export function setWalletModules(wallets: WalletInit[]): void {
  const error = validateWalletInit(wallets)

  if (error) {
    throw error
  }

  const modules = initializeWalletModules(
    wallets,
    internalState$.getValue().device
  )
  const dedupedWallets = uniqueWalletsByLabel(modules)

  const action = {
    type: SET_WALLET_MODULES,
    payload: dedupedWallets
  }

  dispatch(action as SetWalletModulesAction)
}

export function setLocale(locale: string): void {
  const error = validateLocale(locale)

  if (error) {
    throw error
  }

  const action = {
    type: SET_LOCALE,
    payload: locale
  }

  dispatch(action as SetLocaleAction)
}

export function updateAllWallets(wallets: WalletState[]): void {
  const error = validateUpdateBalances(wallets)

  if (error) {
    throw error
  }
  
  const action = {
    type: UPDATE_ALL_WALLETS,
    payload: wallets
  }

  console.log(4, wallets)

  dispatch(action as UpdateAllWalletsAction)

}