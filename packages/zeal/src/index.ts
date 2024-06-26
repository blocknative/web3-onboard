import type { WalletInit } from '@web3-onboard/common'
import type { ExternalProvider } from '@ethersproject/providers'
import {
  createDownloadMessage,
  createEIP1193Provider
} from '@web3-onboard/common'

declare const window: Window & { zeal: ExternalProvider & { isZeal: boolean } }

function zealWallet(): WalletInit {
  if (typeof window === 'undefined') return () => null

  return () => ({
    label: 'Zeal',
    injectedNamespace: 'zeal',
    checkProviderIdentity: ({ provider }: { provider: any }) => {
      !!provider && !!provider['isZeal']
    },
    getIcon: async () => (await import('./icon.js')).default,
    getInterface: async () => {
      if (
        window.hasOwnProperty('zeal') &&
        'isZeal' in window.zeal &&
        window.zeal.isZeal
      ) {
        return {
          provider: createEIP1193Provider(window.zeal)
        }
      } else {
        throw new Error(createDownloadMessage('Zeal', 'https://www.zeal.app/'))
      }
    },
    platforms: ['desktop']
  })
}

export default zealWallet
