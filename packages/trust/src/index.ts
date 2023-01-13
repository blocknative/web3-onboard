import type { WalletInit, EIP1193Provider } from '@web3-onboard/common'
import { createEIP1193Provider } from '@web3-onboard/common'
import { CustomWindow } from './types.js'
declare const window: CustomWindow

function trust(): WalletInit {
  if (typeof window === 'undefined') return () => null

  return () => {
    return {
      label: 'Trust Wallet',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => {
        const trustExists =
          window.hasOwnProperty('trustwallet') && window.ethereum?.isTrust

        if (trustExists) {
          const enkryptProvider: EIP1193Provider = window.trustwallet
          const provider = createEIP1193Provider(enkryptProvider)

          return {
            provider
          }
        } else {
          window.open('https://trustwallet.com/browser-extension', '_blank')
          throw new Error('Please Install Trust to use this wallet')
        }
      }
    }
  }
}

export default trust
