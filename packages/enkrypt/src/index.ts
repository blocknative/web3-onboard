import type { WalletInit } from '@web3-onboard/common'
import { createEIP1193Provider } from '@web3-onboard/common'
import { CustomWindow } from './types.js'
declare const window: CustomWindow

function enkrypt(): WalletInit {
  if (typeof window === 'undefined') return () => null
  return () => {
    return {
      label: 'Enkrypt',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => {
        const provider = window.hasOwnProperty('enkrypt')
        if (provider) {
          return { provider: createEIP1193Provider(window.enkrypt.providers.ethereum) }
        } else {
          window.open('https://enkrypt.com', '_blank')
          throw new Error('Please Install Enkrypt to use this wallet')
        }
      }
    }
  }
}

export default enkrypt
