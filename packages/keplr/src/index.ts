import {
  type WalletInit,
  type EIP1193Provider,
  createDownloadMessage
} from '@web3-onboard/common'
import { createEIP1193Provider } from '@web3-onboard/common'

import { CustomWindow } from './types.js'

declare const window: CustomWindow

function keplr(): WalletInit {
  if (typeof window === 'undefined') return () => null

  return () => {
    return {
      label: 'Keplr Wallet',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => {
        const keplrwalletInjectionExists = window.hasOwnProperty('keplr')

        let provider: EIP1193Provider

        if (keplrwalletInjectionExists) {
          provider = createEIP1193Provider(window['keplr'])
        } else {
          const downloadUrl = 'https://www.keplr.app/download'
          throw new Error(createDownloadMessage('keplr Wallet', downloadUrl))
        }
        return {
          provider
        }
      }
    }
  }
}

export default keplr
