import type { Chain, WalletInit, WalletModule } from '@web3-onboard/common'
import { dispatch, state } from './index'
import { configuration } from '../configuration'

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
  NotifyOptions,
  UpdateNotifyAction,
  Notification,
  AddNotificationAction,
  RemoveNotificationAction,
  UpdateAllWalletsAction,
  CustomNotification
} from '../types'

import {
  validateAccountCenterUpdate,
  validateLocale,
  validateNotification,
  validateCustomNotification,
  validateNotifyOptions,
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
  UPDATE_NOTIFY,
  SET_WALLET_MODULES,
  SET_LOCALE,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  UPDATE_ALL_WALLETS
} from './constants'

import { setCustomNotificationProps } from '../notify'

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

export function updateNotify(update: Partial<NotifyOptions>): void {
  const error = validateNotifyOptions(update)

  if (error) {
    throw error
  }

  const action = {
    type: UPDATE_NOTIFY,
    payload: update
  }

  dispatch(action as UpdateNotifyAction)
}

export function addNotification(notification: Notification): void {
  const error = validateNotification(notification)

  if (error) {
    throw error
  }

  const action = {
    type: ADD_NOTIFICATION,
    payload: notification
  }

  dispatch(action as AddNotificationAction)
}

// wrap below in notify component
export function addCustomNotification(notification: CustomNotification): void {
  const customNotificationError = validateCustomNotification(notification)
  
  if (customNotificationError) {
    throw customNotificationError
  }
  // notification = setCustomNotificationProps(notification)

  const action = {
    type: ADD_NOTIFICATION,
    payload: notification
  }

  dispatch(action as AddNotificationAction)
}

export function removeNotification(id: Notification['id']): void {
  if (typeof id !== 'string') {
    throw new Error('Notification id must be of type string')
  }

  const action = {
    type: REMOVE_NOTIFICATION,
    payload: id
  }

  dispatch(action as RemoveNotificationAction)
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

  const modules = initializeWalletModules(wallets)
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

  dispatch(action as UpdateAllWalletsAction)
}

// ==== HELPERS ==== //
export function initializeWalletModules(modules: WalletInit[]): WalletModule[] {
  const { device } = configuration
  return modules.reduce((acc, walletInit) => {
    const initialized = walletInit({ device })

    if (initialized) {
      // injected wallets is an array of wallets
      acc.push(...(Array.isArray(initialized) ? initialized : [initialized]))
    }

    return acc
  }, [] as WalletModule[])
}

export function uniqueWalletsByLabel(
  walletModuleList: WalletModule[]
): WalletModule[] {
  return walletModuleList.filter(
    (wallet, i) =>
      walletModuleList.findIndex(
        (innerWallet: WalletModule) => innerWallet.label === wallet.label
      ) === i
  )
}
