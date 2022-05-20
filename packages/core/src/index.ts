import { SofiaProRegular } from '@web3-onboard/common'
import connectWallet from './connect'
import disconnectWallet from './disconnect'
import setChain from './chain'
import { state } from './store'
import {
  addChains,
  setWalletModules,
  updateAccountCenter
} from './store/actions'
import { reset$, internalState$ } from './streams'
import { validateInitOptions } from './validation'
import initI18N from './i18n'

import App from './views/Index.svelte'
import type { InitOptions, OnboardAPI } from './types'
import { APP_INITIAL_STATE } from './constants'
import { getDevice } from './utils'

const API = {
  connectWallet,
  disconnectWallet,
  setChain,
  state: {
    get: state.get,
    select: state.select,
    actions: {
      setWalletModules
    }
  }
}

export type {
  InitOptions,
  OnboardAPI,
  ConnectOptions,
  DisconnectOptions,
  WalletState,
  ConnectedChain
} from './types'

export type { EIP1193Provider } from '@web3-onboard/common'

function init(options: InitOptions): OnboardAPI {
  if (typeof window === 'undefined') return API

  if (options) {
    const error = validateInitOptions(options)

    if (error) {
      throw error
    }
  }

  const { wallets, chains, appMetadata = null, i18n, accountCenter } = options

  initI18N(i18n)
  addChains(chains)

  const device = getDevice()
  
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

  const { svelteInstance } = internalState$.getValue()

  if (svelteInstance) {
    // if already initialized, need to cleanup old instance
    console.warn('Re-initializing Onboard and resetting back to initial state')
    reset$.next()
  }

  const app = svelteInstance || mountApp()

  internalState$.next({
    appMetadata,
    svelteInstance: app,
    device
  })

  setWalletModules(wallets)

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

  document.body.appendChild(onboard)

  const app = new App({
    target
  })

  return app
}

export default init
