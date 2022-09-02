import { SofiaProRegular } from '@web3-onboard/common'
import connectWallet from './connect.js'
import disconnectWallet from './disconnect.js'
import setChain from './chain.js'
import { state } from './store/index.js'
import { reset$ } from './streams.js'
import initI18N from './i18n/index.js'
import App from './views/Index.svelte'
import type { InitOptions, Notify } from './types.js'
import { APP_INITIAL_STATE } from './constants.js'
import { configuration, updateConfiguration } from './configuration.js'
import updateBalances from './update-balances.js'
import { chainIdToHex } from './utils.js'
import { preflightNotifications } from './preflight-notifications.js'

import {
  validateInitOptions,
  validateNotify,
  validateNotifyOptions
} from './validation.js'

import {
  addChains,
  updateAccountCenter,
  updateNotify,
  customNotification,
  setLocale,
  setPrimaryWallet,
  setWalletModules,
  updateConnectModal
} from './store/actions.js'

const API = {
  connectWallet,
  disconnectWallet,
  setChain,
  state: {
    get: state.get,
    select: state.select,
    actions: {
      setWalletModules,
      setLocale,
      updateNotify,
      customNotification,
      preflightNotifications,
      updateBalances,
      updateAccountCenter,
      setPrimaryWallet
    }
  }
}

export type OnboardAPI = typeof API

export type {
  InitOptions,
  ConnectOptions,
  DisconnectOptions,
  WalletState,
  ConnectedChain,
  AccountCenter,
  AppState,
  CustomNotification,
  Notification,
  Notify,
  UpdateNotification,
  PreflightNotificationsOptions
} from './types.js'

export type { EIP1193Provider } from '@web3-onboard/common'

function init(options: InitOptions): OnboardAPI {
  if (typeof window === 'undefined') return API

  if (options) {
    const error = validateInitOptions(options)

    if (error) {
      throw error
    }
  }

  const {
    wallets,
    chains,
    appMetadata = null,
    i18n,
    accountCenter,
    apiKey,
    notify,
    gas,
    connect
  } = options

  const { device, svelteInstance } = configuration

  if (svelteInstance) {
    // if already initialized, need to cleanup old instance
    console.warn('Re-initializing Onboard and resetting back to initial state')
    reset$.next()
  }

  initI18N(i18n)
  addChains(chainIdToHex(chains))

  if (typeof connect !== undefined) {
    updateConnectModal(connect)
  }

  // update accountCenter
  if (typeof accountCenter !== 'undefined') {
    let accountCenterUpdate

    if (device.type === 'mobile' && accountCenter.mobile) {
      accountCenterUpdate = {
        ...APP_INITIAL_STATE.accountCenter,
        ...accountCenter.mobile
      }
    } else if (accountCenter.desktop) {
      accountCenterUpdate = {
        ...APP_INITIAL_STATE.accountCenter,
        ...accountCenter.desktop
      }
    }

    updateAccountCenter(accountCenterUpdate)
  }

  // update notify
  if (typeof notify !== 'undefined') {
    if ('desktop' in notify || 'mobile' in notify) {
      const error = validateNotifyOptions(notify)

      if (error) {
        throw error
      }

      if (
        (!notify.desktop || (notify.desktop && !notify.desktop.position)) &&
        accountCenter &&
        accountCenter.desktop &&
        accountCenter.desktop.position
      ) {
        notify.desktop.position = accountCenter.desktop.position
      }

      if (
        (!notify.mobile || (notify.mobile && !notify.mobile.position)) &&
        accountCenter &&
        accountCenter.mobile &&
        accountCenter.mobile.position
      ) {
        notify.mobile.position = accountCenter.mobile.position
      }

      let notifyUpdate: Partial<Notify>

      if (device.type === 'mobile' && notify.mobile) {
        notifyUpdate = {
          ...APP_INITIAL_STATE.notify,
          ...notify.mobile
        }
      } else if (notify.desktop) {
        notifyUpdate = {
          ...APP_INITIAL_STATE.notify,
          ...notify.desktop
        }
      }

      updateNotify(notifyUpdate)
    } else {
      const error = validateNotify(notify as Notify)

      if (error) {
        throw error
      }

      const notifyUpdate: Partial<Notify> = {
        ...APP_INITIAL_STATE.notify,
        ...notify
      }

      updateNotify(notifyUpdate)
    }
  } else {
    const notifyUpdate: Partial<Notify> = APP_INITIAL_STATE.notify

    updateNotify(notifyUpdate)
  }

  const app = svelteInstance || mountApp()

  updateConfiguration({
    appMetadata,
    svelteInstance: app,
    apiKey,
    initialWalletInit: wallets,
    gas
  })

  return API
}

function mountApp() {
  class Onboard extends HTMLElement {
    constructor() {
      super()
    }
  }

  if (!customElements.get('onboard-v2')) {
    customElements.define('onboard-v2', Onboard)
  }

  // Add Fonts to main page
  const styleEl = document.createElement('style')

  styleEl.innerHTML = `
    ${SofiaProRegular}
  `

  document.body.appendChild(styleEl)

  // add to DOM
  const onboard = document.createElement('onboard-v2')
  const target = onboard.attachShadow({ mode: 'open' })

  onboard.style.all = 'initial'

  target.innerHTML = `
      <style>
        :host {  
          /* COLORS */
          --white: white;
          --black: black;
          --primary-1: #2F80ED;
          --primary-100: #eff1fc;
          --primary-200: #d0d4f7;
          --primary-300: #b1b8f2;
          --primary-400: #929bed;
          --primary-500: #6370e5;
          --primary-600: #454ea0;
          --primary-700: #323873;
          --gray-100: #ebebed;
          --gray-200: #c2c4c9;
          --gray-300: #999ca5;
          --gray-400: #707481;
          --gray-500: #33394b;
          --gray-600: #242835;
          --gray-700: #1a1d26;
          --success-100: #d1fae3;
          --success-200: #baf7d5;
          --success-300: #a4f4c6;
          --success-400: #8df2b8;
          --success-500: #5aec99;
          --success-600: #18ce66;
          --success-700: #129b4d;
          --danger-100: #ffe5e6;
          --danger-200: #ffcccc;
          --danger-300: #ffb3b3;
          --danger-400: #ff8080;
          --danger-500: #ff4f4f;
          --danger-600: #cc0000;
          --danger-700: #660000;
          --warning-100: #ffefcc;
          --warning-200: #ffe7b3;
          --warning-300: #ffd780;
          --warning-400: #ffc74c;
          --warning-500: #ffaf00;
          --warning-600: #cc8c00;
          --warning-700: #664600;
  
          /* FONTS */
          --font-family-normal: Sofia Pro;
  
          --font-size-1: 3rem;
          --font-size-2: 2.25rem;
          --font-size-3: 1.5rem;
          --font-size-4: 1.25rem;
          --font-size-5: 1rem;
          --font-size-6: .875rem;
          --font-size-7: .75rem;
  
          --font-line-height-1: 24px;
          --font-line-height-2: 20px;
          --font-line-height-3: 16px;
          --font-line-height-4: 12px;
  
          /* SPACING */
          --spacing-1: 3rem;
          --spacing-2: 2rem;
          --spacing-3: 1.5rem;
          --spacing-4: 1rem;
          --spacing-5: 0.5rem;
          --spacing-6: 0.25rem;
          --spacing-7: 0.125rem;
  
          /* BORDER RADIUS */
          --border-radius-1: 24px;  
          --border-radius-2: 20px;  
          --border-radius-3: 16px;  
          --border-radius-4: 12px;  
          --border-radius-5: 8px;  

          /* SHADOWS */
          --shadow-0: none;
          --shadow-1: 0px 4px 12px rgba(0, 0, 0, 0.1);
          --shadow-2: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
          --shadow-3: 0px 4px 16px rgba(179, 179, 179, 0.2);

          /* MODAL POSITIONING */
          --modal-z-index: 10;
          --modal-top: unset;
          --modal-right: unset;
          --modal-bottom: unset;
          --modal-left: unset;
          
          /* MODAL STYLES */
          --modal-backdrop: rgba(0, 0, 0, 0.6);
        }
      </style>
    `

  const containerElementQuery =
    state.get().accountCenter.containerElement || 'body'

  const containerElement = document.querySelector(containerElementQuery)

  if (!containerElement) {
    throw new Error(
      `Element with query ${state.get().accountCenter} does not exist.`
    )
  }

  containerElement.appendChild(onboard)

  const app = new App({
    target
  })

  return app
}

export default init
