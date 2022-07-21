import { configuration } from './configuration'
import type { AppState } from './types'

export const APP_INITIAL_STATE: AppState = {
  wallets: [],
  walletModules: [],
  chains: [],
  accountCenter: {
    enabled: true,
    position: 'topRight',
    expanded: false,
    containerElement: 'body',
    minimal: configuration.device.type === 'mobile'
  },
  notify: {
    enabled: true,
    transactionHandler: () => {},
    position: 'topRight'
  },
  notifications: [],
  locale: '',
  gas: null
}

export const STORAGE_KEYS = {
  TERMS_AGREEMENT: 'onboard.js:agreement'
}
