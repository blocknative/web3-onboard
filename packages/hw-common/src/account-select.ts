import { firstValueFrom, Subject, take } from 'rxjs'
import AccountSelect from './views/AccountSelect.svelte'
import { accounts$ } from './streams.js'
import { validateSelectAccountOptions } from './validation.js'

import type { SelectAccountOptions, Account } from './types.js'

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

const fontFamilyExternallyDefined = (): boolean => {
  if (
    document.body &&
    (getComputedStyle(document.body).getPropertyValue('--w3o-font-family') ||
      getComputedStyle(document.body).getPropertyValue(
        '--onboard-font-family-normal'
      ))
  )
    return true
  return false
}

const importInterFont = async (): Promise<void> => {
  const { InterVar } = await import('@web3-onboard/common')
  // Add Fonts to main page
  const styleEl = document.createElement('style')

  styleEl.innerHTML = `
    ${InterVar}
  `

  document.body.appendChild(styleEl)
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
  if (!fontFamilyExternallyDefined()) {
    importInterFont()
  }

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
        --font-family-normal: var(--w3o-font-family, Inter, sans-serif);
        --font-size-5: 1rem;
        --font-size-6: .875rem;
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

        /* THEMING */
        --background-color: var(--w3o-background-color, #FFF);
        --foreground-color: var(--w3o-foreground-color);
        --text-color: var(--w3o-text-color, inherit);
        --border-color: var(--w3o-border-color, var(--gray-200));
        --action-color: var(--w3o-action-color, var(--primary-500));
      }
    </style>
  `
  const containerElementQuery = selectAccountOptions.containerElement || 'body'

  const containerElement = document.querySelector(containerElementQuery)

  if (!containerElement) {
    throw new Error(
      `Element with query ${containerElementQuery} does not exist.`
    )
  }

  containerElement.appendChild(accountSelectDomElement)

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
