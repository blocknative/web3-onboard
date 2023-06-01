import type { AppState } from './types.js'

export const APP_INITIAL_STATE: AppState = {
  wallets: [],
  walletModules: [],
  chains: [],
  accountCenter: {
    enabled: true,
    position: 'bottomRight',
    expanded: false,
    minimal: true
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
    showSidebar: true,
    disableClose: false
  }
}

export const STORAGE_KEYS = {
  TERMS_AGREEMENT: 'onboard.js:agreement',
  LAST_CONNECTED_WALLET: 'onboard.js:last_connected_wallet'
}

export const MOBILE_WINDOW_WIDTH = 768

export const BN_PROTECT_RPC_URL = 'https://rpc.blocknative.com/protect'
