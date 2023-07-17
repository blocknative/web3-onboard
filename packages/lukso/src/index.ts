import { WalletInit, createEIP1193Provider } from '@web3-onboard/common'

function lukso(): WalletInit {
  if (typeof window === 'undefined') return () => null
  return () => {
    return {
      label: 'Lukso',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => {
        if ('ethereum' in window) {
          const anyWindow: any = window

          if (
            'ethereum' in anyWindow &&
            anyWindow.ethereum.isUniversalProfileExtension
          ) {
            return {
              provider: createEIP1193Provider(anyWindow.ethereum)
            }
          }
        }
        if ('lukso' in window) {
          const anyWindow: any = window

          return {
            provider: createEIP1193Provider(anyWindow.lukso)
          }
        }
        window.open('https://lukso.network', '_blank')
        throw new Error(
          'Please install Lukso Universal Profile before proceeding'
        )
      },
      platforms: ['all']
    }
  }
}

export default lukso
