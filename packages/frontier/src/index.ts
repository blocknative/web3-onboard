import type { WalletInit, EIP1193Provider } from '@web3-onboard/common'
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
          window.open('https://frontier.xyz/browser-extension', '_blank')
          throw new Error('Please Install Frontier to use this wallet')
        }

        return { provider }
      }
    }
  }
}

export default frontier
