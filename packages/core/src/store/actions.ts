import type {
  AddChainsAction,
  AddWalletAction,
  Chain,
  RemoveWalletAction,
  ResetStoreAction,
  UpdateWalletAction,
  WalletState
} from '../types'

import { validateChains, validateString, validateWallet } from '../validation'

import {
  ADD_CHAINS,
  UPDATE_WALLET,
  RESET_STORE,
  ADD_WALLET,
  REMOVE_WALLET
} from './constants'
import { dispatch } from './index'

export function addChains(chains: Chain[]): void {
  const error = validateChains(chains)

  if (error) {
    throw error
  }

  const action = {
    type: ADD_CHAINS,
    payload: chains
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

export function resetStore(): void {
  const action = {
    type: RESET_STORE,
    payload: null
  }

  dispatch(action as ResetStoreAction)
}
