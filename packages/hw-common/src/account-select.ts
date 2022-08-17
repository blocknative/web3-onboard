import { firstValueFrom, Subject, take } from 'rxjs'
import { SofiaProRegular, SofiaProLight } from '@web3-onboard/common'
import AccountSelect from './views/AccountSelect.svelte'
import { accounts$ } from './streams'
import { validateSelectAccountOptions } from './validation'

import type { SelectAccountOptions, Account } from './types'

// eslint-disable-next-line max-len
const accountSelect = async (
  options: SelectAccountOptions
): Promise<Account[]> => {
  if (options) {
    const error = validateSelectAccountOptions(options)

    if (error) {
      throw error
    }
  }

  const app = mountAccountSelect(options, accounts$)

  accounts$.pipe(take(1)).subscribe(() => {
    app.$destroy()
  })

  return firstValueFrom(accounts$)
}

// eslint-disable-next-line max-len
const mountAccountSelect = (
  selectAccountOptions: SelectAccountOptions,
  accounts$: Subject<Account[]>
) => {
  class AccountSelectEl extends HTMLElement {
    constructor() {
      super()
    }
  }

  if (!customElements.get('account-select')) {
    customElements.define('account-select', AccountSelectEl)
  }

  // Add Fonts to main page
  const styleEl = document.createElement('style')

  styleEl.innerHTML = `
    ${SofiaProRegular}
    ${SofiaProLight}
  `
  document.body.appendChild(styleEl)

  // add to DOM
  const accountSelectDomElement = document.createElement('account-select')
  const target = accountSelectDomElement.attachShadow({ mode: 'open' })

  accountSelectDomElement.style.all = 'initial'

  target.innerHTML = `
    <style>
      :host {  
        /* COLORS */
        --white: white;
        --black: black;
        --primary-100: #eff1fc;
        --primary-200: #d0d4f7;
        --primary-300: #b1b8f2;
        --primary-500: #6370e5;
        --primary-600: #454ea0;
        --gray-100: #ebebed;
        --gray-200: #c2c4c9;
        --gray-300: #999ca5;
        --gray-500: #33394b;
        --gray-700: #1a1d26;
        --danger-500: #ff4f4f;

        /* FONTS */
        --font-family-normal: Sofia Pro;
        --font-family-light: Sofia Pro Light;
        --font-size-5: 1rem;
        --font-size-7: .75rem;
        --font-line-height-1: 24px;

        /* SPACING */
        --margin-4: 1rem;
        --margin-5: 0.5rem;

        /* MODAL POSITION */
        --account-select-modal-z-index: 20;
        --account-select-modal-top: unset;
        --account-select-modal-right: unset;
        --account-select-modal-bottom: unset;
        --account-select-modal-left: unset;

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
