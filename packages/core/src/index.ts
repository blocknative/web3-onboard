import type { WalletModule } from '@bn-onboard/types'
import connectWallet from './connect'
import disconnectWallet from './disconnect'
import setChain from './chain'
import { state } from './store'
import { addChains } from './store/actions'
import { reset$, internalState$ } from './streams'
import { validateInitOptions } from './validation'
import initI18N from './i18n'

import App from './views/Index.svelte'
import type { InitOptions, OnboardAPI } from './types'
import { getDeviceInfo } from './utils'
import { SofiaProRegular, SofiaProSemiBold, SofiaProLight } from './fonts'

function init(options: InitOptions): OnboardAPI {
  if (options) {
    const error = validateInitOptions(options)

    if (error) {
      throw error
    }
  }

  const { wallets, chains, appMetadata = null, i18n } = options

  initI18N(i18n)
  addChains(chains)

  // if already initialized, need to cleanup old instance
  const { svelteInstance } = internalState$.getValue()

  if (svelteInstance) {
    console.warn('Re-initializing Onboard and resetting back to initial state')
    svelteInstance.$destroy()
    reset$.next()
  }

  const device = getDeviceInfo()

  const walletModules = wallets.reduce((acc, walletInit) => {
    const initialized = walletInit({ device })

    if (initialized) {
      acc.push(...(Array.isArray(initialized) ? initialized : [initialized]))
    }

    return acc
  }, [] as WalletModule[])

  const app = mountApp()

  internalState$.next({
    appMetadata,
    svelteInstance: app,
    walletModules,
    device
  })

  return {
    connectWallet,
    disconnectWallet,
    setChain,
    state
  }
}

function mountApp() {
  class OnboardV2 extends HTMLElement {
    constructor() {
      super()
    }
  }

  customElements.define('onboard-v2', OnboardV2)

  // Add Fonts to main page
  const styleEl = document.createElement('style')

  styleEl.innerHTML = `
    ${SofiaProRegular}
    ${SofiaProSemiBold}
    ${SofiaProLight}
  `
  document.body.appendChild(styleEl)

  // add to DOM
  const onboard = document.createElement('onboard-v2')
  const target = onboard.attachShadow({ mode: 'open' })

  target.innerHTML = `
      <style>
        :host {  
          /* COLORS */
          --white: white;
          --black: black;
          --blue-1: #2F80ED;
          --blue-100: #eff1fc;
          --blue-200: #d0d4f7;
          --blue-300: #b1b8f2;
          --blue-400: #929bed;
          --blue-500: #6370e5;
          --blue-600: #454ea0;
          --blue-700: #323873;
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
          --font-family-semibold: Sofia Pro Semibold;
          --font-family-light: Sofia Pro Light;
  
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
          --margin-1: 3rem;
          --margin-2: 2rem;
          --margin-3: 1.5rem;
          --margin-4: 1rem;
          --margin-5: 0.5rem;
  
          /* SHADOWS */
          --shadow-1: 0px 4px 12px rgba(0, 0, 0, 0.1);
          --shadow-2: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
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
