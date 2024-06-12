import {
  WalletInit,
  createDownloadMessage,
  createEIP1193Provider
} from '@web3-onboard/common'

function phantom(): WalletInit {
  if (typeof window === 'undefined') return () => null
  return () => {
    return {
      label: 'Phantom',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => {
        if ('phantom' in window) {
          const anyWindow: any = window

          if (
            'phantom' in anyWindow &&
            'ethereum' in anyWindow.phantom &&
            anyWindow.phantom.ethereum.isPhantom
          ) {
            return {
              provider: createEIP1193Provider(anyWindow.phantom.ethereum)
            }
          }
        }
        throw new Error(
          createDownloadMessage('Phantom', 'https://phantom.app/download')
        )
      },
      platforms: ['all']
    }
  }
}

export default phantom
