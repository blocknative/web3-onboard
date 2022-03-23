import type { AppState } from './types'

export const APP_INITIAL_STATE: AppState = {
  wallets: [],
  chains: [],
  accountCenter: {
    enabled: true,
    position: 'topRight',
    expanded: false
  }
}

export const STORAGE_KEYS = {
  TERMS_AGREEMENT: 'onboard.js:agreement'
}
