import AccountSelect from './views/AccountSelect.svelte'
import type { SelectAccountOptions, Account } from './types'
import { firstValueFrom, Subject, take } from 'rxjs'

import { SofiaProRegular, SofiaProSemiBold, SofiaProLight } from './fonts'

// eslint-disable-next-line max-len
const accountSelect = async (options: SelectAccountOptions): Promise<Account[]> => {
  if (options) {
    // TODO handle validation
    const error = false
      // validateInitOptions(options)
    if (error) {
      throw error
    }
  }
  const accounts$ = new Subject<Account[]>()
  const svelteInstance = mountAccountSelect(options, accounts$)

  accounts$.pipe(take(1)).subscribe(() => {
    svelteInstance.$destroy()
  })

  return firstValueFrom(accounts$)
}

// eslint-disable-next-line max-len
const mountAccountSelect = (selectAccountOptions: SelectAccountOptions, accounts$: Subject<Account[]>) => {
  class AccountSelectEl extends HTMLElement {
    constructor() {
      super()
    }
  }

  customElements.define('account-select', AccountSelectEl)

  // Add Fonts to main page
  const styleEl = document.createElement('style')

  // TODO: Import fonts - extract into common?
  styleEl.innerHTML = `
    ${SofiaProRegular}
    ${SofiaProSemiBold}
    ${SofiaProLight}
  `
  document.body.appendChild(styleEl)

  // add to DOM
  const accountSelectDomElement = document.createElement('account-select')
  const target = accountSelectDomElement.attachShadow({ mode: 'open' })

  target.innerHTML = `
    <style>
      :host {  
        /* COLORS */
        --account-select-white: white;
        --account-select-black: black;
        --account-select-blue-1: #2F80ED;
        --account-select-blue-100: #eff1fc;
        --account-select-blue-200: #d0d4f7;
        --account-select-blue-300: #b1b8f2;
        --account-select-blue-400: #929bed;
        --account-select-blue-500: #6370e5;
        --account-select-blue-600: #454ea0;
        --account-select-blue-700: #323873;
        --account-select-gray-100: #ebebed;
        --account-select-gray-200: #c2c4c9;
        --account-select-gray-300: #999ca5;
        --account-select-gray-400: #707481;
        --account-select-gray-500: #33394b;
        --account-select-gray-600: #242835;
        --account-select-gray-700: #1a1d26;
        --account-select-success-100: #d1fae3;
        --account-select-success-200: #baf7d5;
        --account-select-success-300: #a4f4c6;
        --account-select-success-400: #8df2b8;
        --account-select-success-500: #5aec99;
        --account-select-success-600: #18ce66;
        --account-select-success-700: #129b4d;
        --account-select-danger-100: #ffe5e6;
        --account-select-danger-200: #ffcccc;
        --account-select-danger-300: #ffb3b3;
        --account-select-danger-400: #ff8080;
        --account-select-danger-500: #ff4f4f;
        --account-select-danger-600: #cc0000;
        --account-select-danger-700: #660000;
        --account-select-warning-100: #ffefcc;
        --account-select-warning-200: #ffe7b3;
        --account-select-warning-300: #ffd780;
        --account-select-warning-400: #ffc74c;
        --account-select-warning-500: #ffaf00;
        --account-select-warning-600: #cc8c00;
        --account-select-warning-700: #664600;

        /* FONTS */
        --account-select-font-family-normal: Sofia Pro;
        --account-select-font-family-semibold: Sofia Pro Semibold;
        --account-select-font-family-light: Sofia Pro Light;

        --account-select-font-size-1: 3rem;
        --account-select-font-size-2: 2.25rem;
        --account-select-font-size-3: 1.5rem;
        --account-select-font-size-4: 1.25rem;
        --account-select-font-size-5: 1rem;
        --account-select-font-size-6: .875rem;
        --account-select-font-size-7: .75rem;

        --account-select-font-line-height-1: 24px;
        --account-select-font-line-height-2: 20px;
        --account-select-font-line-height-3: 16px;
        --account-select-font-line-height-4: 12px;

        /* SPACING */
        --account-select-margin-1: 3rem;
        --account-select-margin-2: 2rem;
        --account-select-margin-3: 1.5rem;
        --account-select-margin-4: 1rem;
        --account-select-margin-5: 0.5rem;

        /* SHADOWS */
        --account-select-shadow-1: 0px 4px 12px rgba(0, 0, 0, 0.1);
        --account-select-shadow-2: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
      }

    </style>
  `

  document.body.appendChild(accountSelectDomElement)

  const app = new AccountSelect({
    target: target,
    props: {
      selectAccountOptions,
      accounts$
    }
  })

  return app
}

export default accountSelect