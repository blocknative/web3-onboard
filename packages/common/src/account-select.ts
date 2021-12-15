import { firstValueFrom, Subject, take } from 'rxjs'

import AccountSelect from './views/AccountSelect.svelte'
import { accounts$, displayModal$ } from './streams'
import { validateSelectAccountOptions } from './validation'
import { SofiaProRegular, SofiaProSemiBold, SofiaProLight } from './fonts'

import type { SelectAccountOptions, Account } from './types'

// eslint-disable-next-line max-len
const accountSelect = async (options: SelectAccountOptions): Promise<Account[]> => {
  if (options) {
    const error = validateSelectAccountOptions(options)
    if (error) {
      throw error
    }
  }

  if (!document.querySelector('account-select')) {
    mountAccountSelect(options, accounts$);
  }
  
  displayModal$.next(true)

  accounts$.pipe(take(1)).subscribe(() => {
    displayModal$.next(false)
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
        --white: white;
        --black: black;
        --blue-100: #eff1fc;
        --blue-200: #d0d4f7;
        --blue-300: #b1b8f2;
        --blue-500: #6370e5;
        --blue-600: #454ea0;
        --gray-100: #ebebed;
        --gray-200: #c2c4c9;
        --gray-300: #999ca5;
        --gray-500: #33394b;
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

        /* FONTS */
        --font-family-normal: Sofia Pro;
        --font-size-5: 1rem;
        --font-line-height-1: 24px;

        /* SPACING */
        --margin-4: 1rem;
        --margin-5: 0.5rem;

        /* MODAL POSITION */
        --top-1: 1rem;
        --right-1: 1rem;

        /* SHADOWS */
        --shadow-1: 0px 4px 12px rgba(0, 0, 0, 0.1);
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