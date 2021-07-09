import type { KeepKeyHDWallet } from '@shapeshiftoss/hdwallet-keepkey'
import { detach, insert, noop, SvelteComponentDev } from 'svelte/internal'

import Modal from '../../../../components/Modal.svelte'
import Button from '../../../../elements/Button.svelte'

const HANDLE_PIN_PRESS = 'handlePinPress'
const BUTTON_COLOR = `#EBEBED`
const BUTTON_DOT_COLOR = `#33394B`

export enum ModalType {
  Pin,
  Passphrase
}

interface Slot {
  (): {
    c: () => void
    m: (target: any, anchor: any) => void
    d: (detaching: any) => void
    l: () => void
  }
}

interface Slots {
  default: Slot[]
}

const pinButton = (
  value: number,
  slot?: string,
  width = '64px',
  height = '64px'
) => `
  <button
    class="pin-button"
    style="width: ${width}; height: ${height};"
    type="button"
    onclick="window.${HANDLE_PIN_PRESS}(${value})">
      ${
        slot ||
        `<svg class="pin-button-dot" viewBox="0 0 18 18" width="18" height="18">
          <circle cx="9" cy="9" r="9" ></circle>
        </svg>`
      }
      <div class="pin-button-bg">
  </button>
`

const pinButtons = `
  <div class="pin-pad-buttons">
    ${[7, 8, 9, 4, 5, 6, 1, 2, 3].map(val => pinButton(val)).join('')}
  </div>
`

const delButtonIcon = `<svg class="del-button-icon" viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi" aria-hidden="true"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>`

const pinPhraseInput = (modalType: ModalType) => `
<form id="pin-phrase-form" class="pin-phrase-input-container">
  <input
    id="pin-phrase-input"
    placeholder="${modalType === ModalType.Pin ? 'PIN' : ''}"
    type="password"
    autocomplete="current-password"
  />
  ${
    modalType === ModalType.Pin
      ? ` <div class="del-button-wrapper">
            ${pinButton(-1, delButtonIcon, '38px', '38px')}
          </div>`
      : ''
  }
</form>
`

// Contains styles used by both the pin entry modal and the passphrase entry modal
const baseStyles = `
  .keepkey-modal {
    max-width: 22rem;
    padding: 20px 10px;
  }
  .pin-phrase-input-container {
    display: flex;
    position: relative;
    align-items: center;
    margin: 20px 0;
    width: 100%;
  }
  #pin-phrase-input {
    background: inherit;
    font-size: 0.889em;
    font-family: inherit;
    border-width: 1px;
    border-style: solid;
    border-color: #242835;
    border-radius: 4px;
    padding-left: 0.5rem;
    padding-right: 4.1rem;
    transition: opacity 150ms ease-in-out;
    height: 42px;
    width: 100%;
    opacity: 0.6;
    outline: none;
  }
  #pin-phrase-input:hover, #pin-phrase-input:focus {
    opacity: 1;
  }
  .unlock-button {
    height: 26px;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
  }
  
  /* Overrides the branding on the modal*/
  .keepkey-modal + .bn-branding { visibility: hidden !important; }
  .keepkey-modal .bn-onboard-prepare-button {
    width: 100%;
  }
`

const pinModalStyles = `
  #entry {
    align-items: center;
    display: flex;
    flex-flow: column;
    padding: 20px;
  }
  .pin-pad-buttons {
    display: grid;
    grid-template-columns: repeat(3, 75px);
    grid-template-rows: repeat(3, 75px);
    align-items: center;
    justify-items: center;
    margin-bottom: 15px;
  }
  .pin-button {
    align-items: center;
    border-radius: 6px;
    border: 1px solid ${BUTTON_COLOR};
    cursor: pointer;
    display: flex;
    justify-content: center;
    font-size: 18px;
    overflow: hidden;
    padding: 0;
    background-color: unset;
    overflow: hidden;
  }
  .pin-button-bg {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    background-color: ${BUTTON_COLOR};
    transition: opacity 100ms ease-in;
  }
  .pin-button-bg:hover {
    opacity: .2;
  }
  .pin-button-dot {
    fill: ${BUTTON_DOT_COLOR};
    position: absolute;
    pointer-events: none;
    z-index: 2;
  }
  .del-button-wrapper {
    position: absolute;
    height: 42px;
    width: 42px;
    right: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .del-button-wrapper > .pin-button {
    border: none;
  }
  .del-button-icon {
    position: absolute;
    width: 20px;
    z-index: 2;
    pointer-events: none;
  }
  .del-button-icon + div {
    opacity: .5;
  }
  .del-button-icon + div:hover {
    opacity: 1;
  }
`

const passphraseModalStyles = `
  .keepkey-modal {
    padding: 40px 30px;
  }
`

const pinHTML = `
    <style>${baseStyles}${pinModalStyles}</style>
    <h2>Enter Your Pin</h2>
    <p>
      Use PIN layout shown on your device to find the location to press on this pin pad.
    </p>
    <div id="entry" class="bn-onboard-custom">
      ${pinButtons}
      ${pinPhraseInput(ModalType.Pin)}
    </div>
  `

const passphraseHTML = `
  <style>${baseStyles}${passphraseModalStyles}</style>
  <h2 style="margin-bottom: 35px">Enter Your Passphrase</h2>
  <div id="entry" class="bn-onboard-custom">
    ${pinPhraseInput(ModalType.Passphrase)}
  </div>
`

export const renderModal = (wallet: KeepKeyHDWallet, modalType: ModalType) => {
  const modalHtml = modalType === ModalType.Pin ? pinHTML : passphraseHTML

  const getInput = () =>
    document.getElementById('pin-phrase-input') as HTMLInputElement

  const deleteWindowProperties = () => {
    delete (window as any)[HANDLE_PIN_PRESS]
  }

  if (modalType === ModalType.Pin) {
    ;(window as any)[HANDLE_PIN_PRESS] = (value: number) => {
      const input = getInput()
      // A value of -1 signals a backspace e.g. we delete the last char from the input
      input.value =
        value === -1 ? input.value.slice(0, -1) : input.value + value
    }
  }

  // Creates a modal component which gets mounted to the body and is passed the pin html into it's slot
  const div = document.createElement('div')
  div.innerHTML = modalHtml
  div.className = 'keepkey-modal'
  const pinModal = new Modal({
    target: document.body,
    props: {
      closeModal: () => {
        // Cancels any action that the keepkey wallet may be doing
        wallet.cancel()
        deleteWindowProperties()
        pinModal.$destroy()
      },
      $$slots: createSlot(div),
      $$scope: {}
    }
  } as SvelteComponentDev['new'])

  // Submits the pin or passphrase to the Keepkey device
  const submit = async () => {
    const value = getInput().value
    modalType === ModalType.Pin
      ? await wallet.sendPin(value)
      : await wallet.sendPassphrase(value)
    pinModal.$destroy()
  }

  document.getElementById('pin-phrase-form')?.addEventListener('submit', e => {
    e.preventDefault()
    submit()
  })

  // Creates a new Button component used to trigger sending the pin to Keepkey
  const entryEl = document.getElementById('entry')
  if (entryEl) {
    const span = document.createElement('span')
    span.innerHTML = `Unlock`
    span.className = `unlock-button`
    new Button({
      target: entryEl,
      props: {
        onclick: async () => {
          submit()
          deleteWindowProperties()
        },
        $$slots: createSlot(span),
        $$scope: {}
      }
    } as SvelteComponentDev['new'])
  }
}

/**
 * createSlot - creates the necessary object needed to pass
 * arbitrary html into a component's default slot
 * @param element The html element which is inserted into the components slot
 */
function createSlot(element: HTMLElement): Slots {
  return {
    default: [
      function () {
        return {
          c: noop,
          m: function mount(target: any, anchor: any) {
            insert(target, element, anchor)
          },
          d: function destroy(detaching: any) {
            if (detaching) {
              detach(element)
            }
          },
          l: noop
        }
      }
    ]
  }
}
