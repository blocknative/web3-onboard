import type { AppState } from './types'

export const APP_INITIAL_STATE: AppState = {
  wallets: [],
  walletModules: [],
  chains: [],
  accountCenter: {
    enabled: true,
    position: 'topRight',
    expanded: false
  },
  locale: ''
}

export const STORAGE_KEYS = {
  TERMS_AGREEMENT: 'onboard.js:agreement'
}
