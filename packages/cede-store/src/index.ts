import { detectCedeProvider } from '@cedelabs/providers'
import type { WalletInit } from '@web3-onboard/common'
import { createEIP1193Provider } from '@web3-onboard/common'
import { CustomWindow } from './types'
declare const window: CustomWindow

function cedeStoreWallet(): WalletInit {
  if (typeof window === 'undefined') return () => null
  return () => ({
    label: 'cede.store',
    injectedNamespace: 'cede',
    checkProviderIdentity: () => (window as CustomWindow).cede,
    getIcon: async () => (await import('./icon.js')).default,
    getInterface: async () => {
      const provider: any = await detectCedeProvider()
      if (!provider) {
        window.open('https://cede.store', '_blank')
        throw new Error('Please, install cede.store to use this wallet')
      }

      // handle disconnect
      provider.once('lock', () => {
        provider.emit('accountsChanged', [])
      })

      return Promise.resolve({
        provider: createEIP1193Provider(window.cede, {
          eth_requestAccounts: async ({ baseRequest }) => {
            const accounts = (await baseRequest({
              method: 'connect'
            })) as any[]

            if (!accounts.length) {
              return []
            }

            const activeVault = accounts.find(account => account.isActive)

            return [activeVault?.name || accounts[0].name] as string[]
          },
          eth_chainId: () => Promise.resolve('0x1'), // cede.store doesn't support chains, but we have to provide a value to complete the connection
          wallet_switchEthereumChain: null,
          wallet_addEthereumChain: null,
          eth_getBalance: null,
          eth_selectAccounts: null
        })
      })
    },
    platforms: ['desktop']
  })
}
export default cedeStoreWallet
