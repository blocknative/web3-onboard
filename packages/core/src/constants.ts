import type { AppState } from './types'

export const APP_INITIAL_STATE: AppState = {
  wallets: [],
  chains: [],
  dashboard: {
    enabled: true,
    position: 'topRight',
    expanded: true
  }
}

export const STORAGE_KEYS = {
  TERMS_AGREEMENT: 'onboard.js:agreement'
}
