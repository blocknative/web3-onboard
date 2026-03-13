import {
  type WalletInit,
  type EIP1193Provider,
  createDownloadMessage
} from '@web3-onboard/common'
import { CustomWindow } from './types.js'
declare const window: CustomWindow

function frontier(): WalletInit {
  if (typeof window === 'undefined') return () => null

  return () => {
    return {
      label: 'Frontier',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => {
        const { createEIP1193Provider } = await import('@web3-onboard/common')
        const ethereumInjectionExists = window.hasOwnProperty('ethereum')

        let provider: EIP1193Provider

        // check if frontier is injected into window.ethereum
        if (ethereumInjectionExists && window['ethereum'].isFrontier) {
          provider = createEIP1193Provider(window['ethereum'])
        } else if (window['frontier']) {
          // directly use the window.frontier injection
          provider = createEIP1193Provider(window['frontier']['ethereum'])
        } else {
          // frontier extension is not installed
          // send user to install page
          throw new Error(
            createDownloadMessage(
              'Frontier',
              'https://frontier.xyz/browser-extension'
            )
          )
        }

        return { provider }
      }
    }
  }
}

export default frontier
