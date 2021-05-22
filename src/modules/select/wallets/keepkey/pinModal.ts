import type { KeepKeyHDWallet } from '@shapeshiftoss/hdwallet-keepkey'
import { detach, insert, noop } from 'svelte/internal'

import Modal from '../../../../components/Modal.svelte'
import Button from '../../../../elements/Button.svelte'

const HANDLE_PIN_PRESS = 'handlePinPress'

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
const pinInput = `
<form class="pin-input-container">
  <input
    id="pin-input"
    placeholder="PIN"
    type="password"
    autocomplete="current-password"
  />
  <div class="del-button-wrapper">
  ${pinButton(-1, delButtonIcon, '38px', '38px')}
  </div>
</form>
`
const buttonColor = `#EBEBED`
const buttonDotColor = `#33394B`

const styles = `
  .pin-modal {
    max-width: 22rem;
    padding: 20px 10px;
  }
  #pin-pad {
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
    border: 1px solid ${buttonColor};
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
    background-color: ${buttonColor};
    transition: opacity 100ms ease-in;
  }
  .pin-button-bg:hover {
    opacity: .2;
  }
  .pin-button-dot {
    fill: ${buttonDotColor};
    position: absolute;
    pointer-events: none;
    z-index: 2;
  }
  .pin-input-container {
    display: flex;
    position: relative;
    align-items: center;
    margin: 15px 0;
  }
  #pin-input {
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
  #pin-input:hover, #pin-input:focus {
    opacity: 1;
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
  .unlock-button {
    height: 26px;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
  }
  
  /* Overrides the branding on the modal*/
  .pin-modal + .bn-branding { visibility: hidden !important; }
  #pin-pad .bn-onboard-prepare-button {
    width: 218px;
  }
`

export const renderPinModal = (wallet: KeepKeyHDWallet) => {
  const pinPadHTML = `
    <style>${styles}</style>
    <h2>Enter Your Pin</h2>
    <p>
      Use PIN layout shown on your device to find the location to press on this pin pad.
    </p>
    <div id="pin-pad" class="bn-onboard-custom">
      ${pinButtons}
      ${pinInput}
    </div>
  `

  const getPinInput = () =>
    document.getElementById('pin-input') as HTMLInputElement

  const handlePinPress = (value: number) => {
    const input = getPinInput()
    // A value of -1 signals a backspace e.g. we delete the last char from the input
    input.value = value === -1 ? input.value.slice(0, -1) : input.value + value
  }

  const deleteWindowProperties = () => {
    delete (window as any)[HANDLE_PIN_PRESS]
  }

  ;(window as any)[HANDLE_PIN_PRESS] = handlePinPress

  // Creates a modal component which gets mounted to the body and is passed the pin html into it's slot
  const div = document.createElement('div')
  div.innerHTML = pinPadHTML
  div.className = 'pin-modal'
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
  })

  // Creates a new Button component used to trigger sending the pin to Keepkey
  const pinPadEl = document.getElementById('pin-pad')
  if (pinPadEl) {
    const span = document.createElement('div')
    span.innerHTML = `Unlock`
    span.className = `unlock-button`
    new Button({
      target: pinPadEl,
      props: {
        onclick: async () => {
          const pin = getPinInput().value
          await wallet.sendPin(pin)
          pinModal.$destroy()
          deleteWindowProperties()
        },
        $$slots: createSlot(span),
        $$scope: {}
      }
    })
  }
}

/**
 * createSlot - creates the necessary object needed to pass
 * arbitrary html into a component's default slot
 * @param element The html element which is inserted into the components slot
 */
function createSlot(element: HTMLElement) {
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
