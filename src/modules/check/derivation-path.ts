import { WalletCheckModal, StateAndHelpers } from '../../interfaces'

interface DerivationPaths {
  [key: string]: Array<{ path?: string; label: string }>
}

const derivationPaths: DerivationPaths = {
  Ledger: [
    { path: `m/44'/60'`, label: 'Ethereum' },
    { path: `m/44'/60'/0'`, label: 'Ethereum Legacy' }
  ],
  Trezor: [{ path: `m/44'/60'/0'/0`, label: 'Ethereum' }]
}

const styles = `
  display: flex;
  flex-direction: column;
`

// color: #4a90e2;

const baseStyles = `
  background: inherit;
  font-size: 0.889em;
  font-family: inherit;
  border: 1px solid #282828;
  border-radius: 40px;
  margin-top: 0.5rem;
  padding: 0.55em 1.4em;
  cursor: pointer;
  color: #282828;
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

const customInputHtmlString = `
  <input 
    id="custom-derivation-input" 
    style="${baseStyles + selectedStyles}" 
    type="text" 
    placeholder="custom derivation path" 
    onchange="window.handleCustomInput(this.value)" />
`

function derivationPath() {
  let state = {
    completed: false,
    showCustomInput: false,
    dPath: ''
  }

  function derivationSelectHtmlString(
    walletName: string,
    showCustomInput: boolean
  ) {
    return `
      <div id="derivation-select" style="${styles}">
        ${derivationPaths[walletName]
          .map((derivation: { path?: string; label: string }) => {
            const { path, label } = derivation
            return `
              <button style="${baseStyles +
                buttonStyles +
                (state.dPath === path
                  ? selectedStyles
                  : '')}" onclick="window.handleDerivationClick(this)" data-path="${path}">
                ${label} - ${path}
              </button>
            `
          })
          .join(' ')}
        ${
          showCustomInput
            ? customInputHtmlString
            : `<button style="${baseStyles +
                buttonStyles}" onclick="window.handleDerivationClick(this)" data-path="custom">Custom Path</button>`
        }
      </div>
    `
  }

  function resetState() {
    state.completed = false
    state.showCustomInput = false
    state.dPath = ''
  }

  function checkModule(
    stateAndHelpers: StateAndHelpers
  ): WalletCheckModal | undefined {
    const { wallet, address } = stateAndHelpers

    if (!address && wallet && wallet.type === 'hardware' && !state.completed) {
      const handleCustomInput = () => {
        const input = <HTMLInputElement>(
          document.getElementById('custom-derivation-input')
        )

        state.dPath = input && input.value
      }

      const handleDerivationClick = (button: any) => {
        const selectedPath = button.dataset.path

        if (selectedPath === 'custom') {
          state.showCustomInput = true
          state.dPath = ''
          setTimeout(() => {
            const input = document.getElementById('custom-derivation-input')
            input && input.focus()
          }, 100)
        } else {
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
        heading: 'Hardware Wallet Connect',
        description: `Please select a derivation path to connect your ${wallet.name} accounts, or select custom to input a custom path:`,
        eventCode: 'derivationPath',
        html: derivationSelectHtmlString(wallet.name, state.showCustomInput),
        button: {
          text: 'Connect',
          onclick: () => {
            wallet.provider.setPath(
              state.dPath || derivationPaths[wallet.name][0].path
            )
            wallet.connect &&
              wallet.connect().then(() => {
                // @TODO add path to local store

                deleteWindowProperties()
                state.completed = true
              })
          }
        },

        icon: `
        <svg height="14" viewBox="0 0 18 14" width="18" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="m10.29375 4.05351563c0-.04921875 0-.09140625 0-.13007813 0-1.0546875 0-2.109375 0-3.1640625 0-.43945312.3480469-.76992188.7804688-.7453125.2003906.01054688.3585937.10546875.4992187.24609375.5800781.58359375 1.1566406 1.16367188 1.7367187 1.74023438 1.4695313 1.46953125 2.9390625 2.93906249 4.4050782 4.40859375.1335937.13359375.2425781.27421875.2707031.46757812.0351562.20742188-.0246094.421875-.1652344.58007813-.0246094.028125-.0492187.05273437-.0738281.08085937-2.0601563 2.06367188-4.1203125 4.1238281-6.1804688 6.1875-.2109375.2109375-.4570312.3023438-.7453125.2179688-.2707031-.0808594-.4464843-.2707032-.5132812-.5484375-.0140625-.0738282-.0175781-.1441407-.0140625-.2179688 0-1.0335937 0-2.0707031 0-3.1042969 0-.0386719 0-.08085935 0-.13359372h-5.06953125c-.49570313 0-.80507813-.309375-.80507813-.80859375 0-1.42382813 0-2.84414063 0-4.26796875 0-.49570313.30585938-.8015625.8015625-.8015625h4.93593748z"/><path d="m5.69882812 13.978125h-4.01132812c-.928125 0-1.6875-.8753906-1.6875-1.9511719v-10.06171872c0-1.07578125.75585938-1.95117188 1.6875-1.95117188h4.01132812c.34101563 0 .61523438.31992188.61523438.71015625 0 .39023438-.27421875.71015625-.61523438.71015625h-4.01132812c-.253125 0-.45703125.23554688-.45703125.52734375v10.06171875c0 .2917969.20390625.5273437.45703125.5273437h4.01132812c.34101563 0 .61523438.3199219.61523438.7101563s-.27773438.7171875-.61523438.7171875z"/></g></svg>
        `
      }
    }
  }

  checkModule.reset = resetState

  return checkModule
}

export default derivationPath
