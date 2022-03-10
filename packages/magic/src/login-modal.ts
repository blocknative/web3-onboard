import { firstValueFrom, Subject, take } from 'rxjs'
import LoginModal from './view/LoginModal.svelte'
import { loggedIn$ } from './streams'
import { SofiaProRegular, SofiaProSemiBold, SofiaProLight } from '@web3-onboard/common'
import type { LoginOptions } from './types'

// eslint-disable-next-line max-len
const loginModal = async (
  options: LoginOptions
): Promise<boolean> => {
  if (options) {
    const error = !options

    if (error) {
      throw error
    }
  }

  const app = mountLoginModal(options, loggedIn$)

  loggedIn$.pipe(take(1)).subscribe(() => {
    app.$destroy()
  })

  return firstValueFrom(loggedIn$)
}

// eslint-disable-next-line max-len
const mountLoginModal = (
  loginOptions: LoginOptions,
  loggedIn$: Subject<boolean>
) => {
  class loginModalEl extends HTMLElement {
    constructor() {
      super()
    }
  }

  if (!customElements.get('login-modal')) {
    customElements.define('login-modal', loginModalEl)
  }

  // Add Fonts to main page
  const styleEl = document.createElement('style')

  styleEl.innerHTML = `
    ${SofiaProRegular}
    ${SofiaProSemiBold}
    ${SofiaProLight}
  `
  document.body.appendChild(styleEl)

  // add to DOM
  const loginModalDomElement = document.createElement('login-modal')
  const target = loginModalDomElement.attachShadow({ mode: 'open' })

  loginModalDomElement.style.all = 'initial'

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
        --top-1: 1rem;
        --right-1: 1rem;

        /* SHADOWS */
        --shadow-1: 0px 4px 12px rgba(0, 0, 0, 0.1);
      }

    </style>
  `

  document.body.appendChild(loginModalDomElement)

  const app = new LoginModal({
    target: target,
    props: {
      loginOptions,
      loggedIn$
    }
  })

  return app
}

export default loginModal
