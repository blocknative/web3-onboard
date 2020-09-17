import { WalletCheckModal, StateAndHelpers, Connect } from '../../interfaces'
import { usbIcon } from './icons'

interface DerivationPaths {
  [key: string]: Array<{ path?: string; label: string }>
}

const derivationPaths: DerivationPaths = {
  Ledger: [
    { path: `m/44'/60'/0'`, label: 'Ethereum' },
    { path: `m/44'/60'`, label: 'Ethereum Ledger Live' }
  ],
  Trezor: [{ path: `m/44'/60'/0'/0`, label: 'Ethereum' }],
  Lattice: [{ path: `m/44'/60'/0'/0`, label: 'Ethereum' }]
}

const styles = `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const baseStyles = `
  background: inherit;
  font-size: 0.889em;
  font-family: inherit;
  border-width: 1px;
  border-style: solid;
  border-color: inherit;
  border-radius: 40px;
  margin-top: 0.5rem;
  padding: 0.55em 1.4em;
  text-align: center;
  color: inherit;
  font-family: inherit;
  transition: background 150ms ease-in-out;
  line-height: 1.15;
`

const buttonStyles = `
  cursor: pointer;
`

const selectedStyles = `
  border: 1px solid #4a90e2;
`

const errorStyles = `
  border: 1px solid #e2504a;
`

const msgStyles = `
  display: block;
  font-size: 0.889em;
  font-family: inherit;
  color: inherit;
  margin-top: 0.5rem;
`

const errorMsgStyles = `
  color: #e2504a;
`

function derivationPath(
  options: {
    heading?: string
    description?: string
    icon?: string
  } = {}
) {
  const { heading, description, icon } = options

  const state = {
    completed: false,
    showCustomInput: false,
    dPath: '',
    loading: false,
    error: ''
  }

  const customInputHtmlString = (error?: string) => {
    return `
      <input 
        id="custom-derivation-input" 
        style="${baseStyles + selectedStyles + (error ? errorStyles : '')}" 
        type="text" 
        value="${state.dPath}"
        placeholder="custom derivation path" 
        onchange="window.handleCustomInput(this.value)" />
      `
  }

  function derivationSelectHtmlString(walletName: string) {
    return `
      <div id="derivation-select" style="${styles}">
        ${derivationPaths[walletName]
          .map((derivation: { path?: string; label: string }) => {
            const { path, label } = derivation
            return `
              <button style="${
                baseStyles +
                buttonStyles +
                (state.dPath === path && !state.showCustomInput
                  ? selectedStyles
                  : '')
              }" onclick="window.handleDerivationClick(this)" data-path="${path}">
                ${label} - ${path}
              </button>
            `
          })
          .join(' ')}
        ${
          state.showCustomInput
            ? customInputHtmlString(state.error)
            : `<button style="${
                baseStyles + buttonStyles
              }" onclick="window.handleDerivationClick(this)" data-path="custom">Custom Path</button>`
        }
        ${
          state.loading
            ? `<div class="bn-onboard-custom bn-onboard-loading" style="margin-top: 1rem;">
                <div class="bn-onboard-loading-first"></div>
                <div class="bn-onboard-loading-second"></div>
                <div class="bn-onboard-loading-third"></div>
              </div>
              <span style="${msgStyles}">Loading Accounts...</span>
              `
            : state.error
            ? `<span style="${msgStyles + errorMsgStyles}">${
                state.error
              }</span>`
            : ''
        }
      </div>
    `
  }

  function resetState() {
    state.completed = false
    state.showCustomInput = false
    state.dPath = ''
    state.loading = false
    state.error = ''
  }

  function checkModule(
    stateAndHelpers: StateAndHelpers
  ): WalletCheckModal | undefined {
    const { wallet } = stateAndHelpers

    if (wallet && wallet.type === 'hardware' && !state.completed) {
      const handleCustomInput = () => {
        const input = document.getElementById(
          'custom-derivation-input'
        ) as HTMLInputElement

        state.dPath = input && input.value
        state.error = ''
      }

      const handleDerivationClick = (button: any) => {
        const selectedPath = button.dataset.path

        if (selectedPath === 'custom') {
          state.showCustomInput = true

          setTimeout(() => {
            const input = document.getElementById('custom-derivation-input')
            input && input.focus()
          }, 100)
        } else {
          state.error = ''
          state.showCustomInput = false
          state.dPath = selectedPath
        }
      }

      const deleteWindowProperties = () => {
        delete (window as any).handleCustomInput
        delete (window as any).handleDerivationSelect
      }
      ;(window as any).handleCustomInput = handleCustomInput
      ;(window as any).handleDerivationClick = handleDerivationClick
      return {
        heading: heading || 'Hardware Wallet Connect',
        description:
          description ||
          `Make sure your ${wallet.name} is plugged in, ${
            wallet.name === 'Ledger' ? 'and the Ethereum app is open, ' : ''
          }then select a derivation path to connect your accounts:`,
        eventCode: 'derivationPath',
        html: derivationSelectHtmlString(wallet.name as string),
        button: {
          text: 'Connect',
          onclick: async () => {
            state.loading = true
            const path =
              state.dPath || derivationPaths[wallet.name as string][0].path
            try {
              const validPath = await wallet.provider.setPath(
                path,
                state.showCustomInput
              )

              if (!validPath) {
                state.error = `${path} is not a valid derivation path`
                state.loading = false
                return
              }
            } catch (error) {
              state.error = error
              state.loading = false
              return
            }

            state.error = ''

            if (wallet.connect) {
              ;(wallet.connect as Connect)()
                .then(() => {
                  deleteWindowProperties()
                  state.loading = false
                  state.completed = true
                })
                .catch(error => {
                  state.error = error.message
                  state.loading = false
                })
            }
          }
        },

        icon: icon || usbIcon
      }
    }
  }

  checkModule.reset = resetState

  return checkModule
}

export default derivationPath
