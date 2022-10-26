import type {
  WalletInit,
  SimpleEventEmitter,
  ChainListener,
  ChainId,
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
            // intercept chainChanged event and format string
            if (event === 'chainChanged') {
              addListener(event, (chainId: ChainId) => {
                const cb = func as ChainListener
                cb(`0x${parseInt(chainId as string).toString(16)}`)
              })
            } else {
              addListener(event, func)
            }
          }

          const provider = createEIP1193Provider(enkryptProvider, {
            eth_chainId: ({ baseRequest }) =>
              baseRequest({ method: 'eth_chainId' }).then(
                id => `0x${parseInt(id as string).toString(16)}`
              )
          })

          provider.removeListener = (event, func) => {}

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
