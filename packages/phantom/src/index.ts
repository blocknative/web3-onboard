import { WalletInit } from '@web3-onboard/common'

function phantom(): WalletInit {
  if (typeof window === 'undefined') return () => null
  return () => {
    return {
      label: 'Phantom',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => {
        if ('phantom' in window) {
          const anyWindow: any = window
          const provider = anyWindow.phantom?.ethereum

          if (provider && provider.isPhantom) {
            return { provider }
          }
        }
        window.open('https://phantom.app/download', '_blank')
        throw new Error('Please install Phantom before proceeding')
      },
      platforms: ['all']
    }
  }
}

export default phantom
