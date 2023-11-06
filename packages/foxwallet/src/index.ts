import type { WalletInit, EIP1193Provider } from '@web3-onboard/common'

function foxwallet(): WalletInit {
  if (typeof window === 'undefined') return () => null

  return () => {
    return {
      label: 'FoxWallet',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => {
        const ethereumInjectionExists = window.hasOwnProperty('ethereum')

        let provider: EIP1193Provider

        // check if foxwallet is injected into window.ethereum
        if (ethereumInjectionExists && window['ethereum'].isTrust) {
          provider = window['ethereum']
        } else if (window['foxwallet']) {
          // directly use the window.foxwallet injection
          provider = window['foxwallet']
        } else {
          // FoxWallet is not installed
          // send user to install page
          window.open('https://foxwallet.com/download', '_blank')
          throw new Error('Please Install FoxWallet to use this wallet')
        }

        return {
          provider
        }
      }
    }
  }
}

export default foxwallet
