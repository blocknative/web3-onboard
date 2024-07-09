import {
  type WalletInit,
  type EIP1193Provider,
  createDownloadMessage
} from '@web3-onboard/common'
import { createEIP1193Provider } from '@web3-onboard/common'

import { CustomWindow } from './types.js'

declare const window: CustomWindow

const gate = (): WalletInit => {
  if (typeof window === 'undefined') return () => null

  return ({ device }) => {
    return {
      label: 'Gate Wallet',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => {
        const gatewalletInjectionExists = window.hasOwnProperty('gatewallet')

        let provider: EIP1193Provider

        if (gatewalletInjectionExists) {
          provider = createEIP1193Provider(window['gatewallet'])
        } else {
          const downloadUrl =
            device.type === 'mobile'
              ? `https://gateio.onelink.me/DmA6/web3?dapp_url=${encodeURIComponent(window.location.href)}`
              : 'https://www.gate.io/mobileapp'
          throw new Error(createDownloadMessage('Gate Wallet', downloadUrl))
        }
        return {
          provider
        }
      },
      platforms: ['all']
    }
  }
}

export default gate
