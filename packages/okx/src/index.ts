import {
  type WalletInit,
  type EIP1193Provider,
  createDownloadMessage
} from '@web3-onboard/common'
import { createEIP1193Provider } from '@web3-onboard/common'

import { CustomWindow } from './types.js'

declare const window: CustomWindow

function okx(): WalletInit {
  if (typeof window === 'undefined') return () => null

  return ({ device }) => {
    return {
      label: 'OKX Wallet',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => {
        const okxwalletInjectionExists = window.hasOwnProperty('okxwallet')

        let provider: EIP1193Provider

        if (okxwalletInjectionExists) {
          provider = createEIP1193Provider(window['okxwallet'])
        } else {
          const downloadUrl =
            device.type === 'mobile'
              ? 'https://www.okx.com/download?deeplink=' +
                encodeURIComponent(
                  'okx://wallet/dapp/url?dappUrl=' +
                    encodeURIComponent(window.location.href)
                )
              : 'https://www.okx.com/download'
          throw new Error(createDownloadMessage('OKX Wallet', downloadUrl))
        }
        return {
          provider
        }
      },
      platforms: ['all']
    }
  }
}

export default okx
