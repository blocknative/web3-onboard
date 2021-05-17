import type { KeepKeyHDWallet } from '@shapeshiftoss/hdwallet-keepkey'
import { detach, insert, noop } from 'svelte/internal'

import Modal from '../../../../components/Modal.svelte'
import Button from '../../../../elements/Button.svelte'

const HANDLE_PIN_PRESS = 'handlePinPress'

const buttonStyles = `
  align-items: center;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  line-height: 1;
  font-size: 18px;
`

const pinButton = (
  value: number,
  slot?: string,
  width = '46px',
  height = '46px'
) => `
  <button
    id="pin-button-${value}"
    style="${buttonStyles} width: ${width}; height: ${height};"
    type="button"
    onclick="window.${HANDLE_PIN_PRESS}(${value})">
      ${
        slot ||
        `<svg viewBox="0 0 24 24" width="16" height="16">
        <circle cx="12" cy="12" r="10" fill="#555555"></circle>
      </svg>`
      }
  </button>
`
const pinPadStyles = `
  display: grid;
  grid-template-columns: repeat(3, 65px);
  grid-template-rows: repeat(3, 65px);
  align-items: center;
  justify-items: center;
`

const pinButtons = `
  <div style="${pinPadStyles}">
    ${[7, 8, 9, 4, 5, 6, 1, 2, 3].map(val => pinButton(val)).join('')}
  </div>
`

const pinInputStyles = `
  background: inherit;
  font-size: 0.889em;
  font-family: inherit;
  border-width: 1px;
  border-style: solid;
  border-color: inherit;
  border-radius: 4px;
  padding-left: 0.5rem;
  padding-right: 4.1rem;
  color: inherit;
  transition: background 150ms ease-in-out;
  height: 32px;
`

const pinInputContainerStyles = `
  margin: 15px 0;
  display: flex;
`

const pinInput = `
  <div style="${pinInputContainerStyles}">
    <form>
      <input
        id="pin-input"
        style="${pinInputStyles}"
        placeholder="PIN"
        type="password"
        autocomplete="current-password"
      />
    </form>
    <div style="margin-left: 5px">
      ${pinButton(-1, '❮', '36px', '36px')}
    </div>
  </div>
`
const pinPadContainerStyles = `
  align-items: center;
  display: flex;
  flex-flow: column;
  padding: 20px 10px;
`

export const renderPinModal = (wallet: KeepKeyHDWallet) => {
  const pinPadHTML = `
    <style>.bn-branding { visibility: hidden !important; }</style>
    <div id="pin-pad" style="${pinPadContainerStyles}" class="bn-onboard-custom">
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
    const span = document.createElement('span')
    span.innerHTML = `Unlock`
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
