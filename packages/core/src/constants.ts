import type { AppState } from './types'

export const APP_INITIAL_STATE: AppState = {
  wallets: [],
  chains: []
}

export const STORAGE_KEYS = {
  TERMS_AGREEMENT: 'onboard.js:agreement'
}
