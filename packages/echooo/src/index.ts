import type { WalletInit, EIP1193Provider } from '@web3-onboard/common'
import { CustomWindow } from './types.js'
declare const window: CustomWindow

function echooo(): WalletInit {
  if (typeof window === 'undefined') return () => null

  return () => {
    return {
      label: 'Echooo Wallet',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => {
        const ethereumInjectionExists = window.hasOwnProperty('ethereum')

        let provider: EIP1193Provider

        // check if echooo wallet is injected into window.ethereum
        if (ethereumInjectionExists && window['ethereum'].isEchooo) {
          provider = window['ethereum']
        } else if (window['echoooEth']) {
          // directly use the window.echoooEth injection
          provider = window['echoooEth']
        } else {
          // Echooo Wallet extension is not installed
          // send user to install page
          window.open('https://www.echooo.xyz', '_blank')
          throw new Error('Please Install Echooo Wallet to use this wallet')
        }

        return {
          provider
        }
      }
    }
  }
}

export default echooo
