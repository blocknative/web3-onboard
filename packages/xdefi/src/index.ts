import type { WalletInit } from '@web3-onboard/common'
import { createEIP1193Provider } from '@web3-onboard/common'
import { CustomWindow } from './types.js'
declare const window: CustomWindow

function XDEFIWallet(): WalletInit {
  if (typeof window === 'undefined') return () => null
  return () => {
    return {
      label: 'XDEFI Wallet',
      injectedNamespace: 'xfi',
      checkProviderIdentity: ({ provider }: { provider: any }) => {
        !!provider && !!provider['isXDEFI']
      },
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => {
        let provider
        if (window.xfi && window.xfi.ethereum) {
          provider = window.xfi.ethereum
        }
        if (!provider) {
          const newWindow = window.open(
            'https://install.xdefi.io/?utm_source=web3Onboard&utm_medium=organic&utm_campaign=xdefi.io&utm_id=xdefi.io',
            '_blank',
            'noopener noreferrer'
          )
          if (newWindow) newWindow.opener = null
          throw new Error('Please install XDEFI Wallet to use this wallet')
        } else {
          return { provider: createEIP1193Provider(window.xfi.ethereum) }
        }
      },
      platforms: ['desktop']
    }
  }
}

export default XDEFIWallet
