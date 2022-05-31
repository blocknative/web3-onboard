import type { AppState } from './types'
import { getDevice } from './utils'

export const APP_INITIAL_STATE: AppState = {
  wallets: [],
  walletModules: [],
  chains: [],
  accountCenter: {
    enabled: true,
    position: 'topRight',
    expanded: false,
    minimal: getDevice().type === 'mobile'
  },
  notify: {
    enabled: true,
  },
  notifications: [],
  locale: ''
}

export const STORAGE_KEYS = {
  TERMS_AGREEMENT: 'onboard.js:agreement'
}
