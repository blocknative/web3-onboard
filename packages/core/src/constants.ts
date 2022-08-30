import { configuration } from './configuration.js'
import type { AppState } from './types.js'

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
    position: 'topRight',
    replacement: {
      gasPriceProbability: {
        speedup: 80,
        cancel: 95
      }
    }
  },
  notifications: [],
  locale: '',
  connect: {
    showSidebar: true
  }
}

export const STORAGE_KEYS = {
  TERMS_AGREEMENT: 'onboard.js:agreement'
}
