import type {
  WalletInit,
  SimpleEventEmitter,
  EIP1193Provider
} from '@web3-onboard/common'
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
        const enkryptExists = window.hasOwnProperty('enkrypt')

        if (enkryptExists) {
          const enkryptProvider: EIP1193Provider = window.enkrypt.providers
            .ethereum as EIP1193Provider
          const addListener: SimpleEventEmitter['on'] =
            enkryptProvider.on.bind(enkryptProvider)

          enkryptProvider.on = (event, func) => {
            addListener(event, func)
          }

          const provider = createEIP1193Provider(enkryptProvider)

          provider.removeListener = (event, func) => { }

          return {
            provider
          }
        } else {
          window.open('https://enkrypt.com', '_blank')
          throw new Error('Please Install Enkrypt to use this wallet')
        }
      }
    }
  }
}

export default enkrypt
