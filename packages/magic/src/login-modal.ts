import { firstValueFrom, Subject, take } from 'rxjs'
import LoginModal from './view/LoginModal.svelte'
import { loggedIn$ } from './streams'
import { SofiaProRegular, SofiaProLight } from '@web3-onboard/common'
import type { LoginOptions } from './types'

// eslint-disable-next-line max-len
const loginModal = async (options: LoginOptions): Promise<boolean> => {
  if (options) {
    const error = !options

    if (error) {
      throw error
    }
  }

  const app = mountLoginModal(options, loggedIn$)

  loggedIn$.pipe(take(1)).subscribe(() => {
    app.$destroy()
    const modalEl = document.body.querySelector('onboard-magic-login-modal')
    modalEl && document.body.removeChild(modalEl)
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

  if (!customElements.get('onboard-magic-login-modal')) {
    customElements.define('onboard-magic-login-modal', loginModalEl)
  }

  // Add Fonts to main page
  const styleEl = document.createElement('style')

  styleEl.innerHTML = `
    ${SofiaProRegular}
    ${SofiaProLight}
  `
  document.body.appendChild(styleEl)

  // add to DOM
  const loginModalDomElement = document.createElement(
    'onboard-magic-login-modal'
  )
  const target = loginModalDomElement.attachShadow({ mode: 'open' })

  loginModalDomElement.style.all = 'initial'

  target.innerHTML = `
    <style>
      :host {  
        /* COLORS */
        --white: white;
        --black: black;
        --primary-300: #b1b8f2;
        --primary-500: #6370e5;
        --gray-200: #c2c4c9;
        --gray-500: #33394b;
        --danger-500: #ff4f4f;

        /* FONTS */
        --font-family-normal: Sofia Pro;
        --font-family-light: Sofia Pro Light;
        --font-size-5: 1rem;
        --font-line-height-1: 24px;

        /* SPACING */
        --margin-4: 1rem;
        --margin-5: 0.5rem;

        /* MODAL POSITION */
        --login-modal-z-index: 25;
        --login-modal-top: unset;
        --login-modal-right: unset;
        --login-modal-bottom: unset;
        --login-modal-left: unset;
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
