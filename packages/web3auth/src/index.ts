import type { WalletInit } from '@web3-onboard/common'

import type { ModalConfig, Web3AuthOptions } from '@web3auth/web3auth'

function web3auth(
  options: Web3AuthOptions & {
    modalConfig?: Record<string, ModalConfig> | undefined
  }
): WalletInit {
  return () => ({
    label: 'Web3Auth',
    getIcon: async () => (await import('./icon.js')).default,
    getInterface: async () => {
      const { Web3Auth } = await import('@web3auth/web3auth')
      const { createEIP1193Provider } = await import('@web3-onboard/common')

      const web3auth = new Web3Auth(options)

      const web3AuthProvider = web3auth.provider

      await web3auth.initModal({ ...options })

      const provider = createEIP1193Provider(web3AuthProvider)

      provider.disconnect = () => web3auth.logout()

      return {
        provider,
        instance: web3auth
      }
    }
  })
}
