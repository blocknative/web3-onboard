import type { WalletInit, EIP1193Provider } from '@web3-onboard/common'

import { CustomWindow } from './types.js'
declare const window: CustomWindow

function trust(): WalletInit {
  if (typeof window === 'undefined') return () => null

  return () => {
    return {
      label: 'OKX Wallet',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => {
        let provider: EIP1193Provider

        if (window.okxwallet) {
          // directly use the window.okxwallet injection
          provider = window.okxwallet
        } else {
          // OKX wallet extension is not installed
          // send user to install page
          window.open('https://okx.com/download', '_blank')
          throw new Error('Please Install OKX wallet to use this wallet')
        }

        return {
          provider
        }
      },
      platforms: ['all']
    }
  }
}

export default trust
