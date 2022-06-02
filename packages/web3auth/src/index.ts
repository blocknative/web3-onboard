import type {
  Account,
  EIP1193Provider,
  ProviderAccounts,
  WalletInit
} from '@web3-onboard/common'

import type { ModalConfig, Web3AuthOptions } from '@web3auth/web3auth'
import type { CustomChainConfig, CONNECTED_EVENT_DATA } from '@web3auth/base'

type Web3AuthModuleOptions = Omit<Web3AuthOptions, 'chainConfig'> & {
  chainConfig?: Partial<CustomChainConfig> &
    Pick<CustomChainConfig, 'chainNamespace'>
  modalConfig?: Record<string, ModalConfig> | undefined
}

function web3auth(options: Web3AuthModuleOptions): WalletInit {
  return () => ({
    label: 'Web3Auth',
    getIcon: async () => (await import('./icon.js')).default,
    getInterface: async ({ chains }) => {
      const { Web3Auth } = await import('@web3auth/web3auth')
      const { CHAIN_NAMESPACES, ADAPTER_EVENTS } = await import(
        '@web3auth/base'
      )
      const { createEIP1193Provider, ProviderRpcError, ProviderRpcErrorCode } =
        await import('@web3-onboard/common')
      console.log('getInterface')
      const [chain] = chains
      chain.namespace

      const web3auth = new Web3Auth({
        chainConfig: {
          chainNamespace:
            chain.namespace === 'evm'
              ? CHAIN_NAMESPACES.EIP155
              : CHAIN_NAMESPACES.OTHER
        },
        ...options
      })

      web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: CONNECTED_EVENT_DATA) => {
        console.log('connected to wallet', data)
        // web3auth.provider will be available here after user is connected
      })

      
      let provider: EIP1193Provider

      const { modalConfig } = options || {}
      await web3auth.initModal(modalConfig)


      const web3AuthProvider = await web3auth.connect()

      provider = createEIP1193Provider(web3AuthProvider, {
        eth_selectAccounts: null,
        eth_requestAccounts: async () => {
          try {
            console.log('web3AuthProvider', { web3AuthProvider })
            const accounts = await web3AuthProvider?.request({
              method: 'eth_accounts'
            })
            console.log({ accounts })
            return accounts as ProviderAccounts
          } catch (error) {
            console.error(error)
            throw new ProviderRpcError({
              code: ProviderRpcErrorCode.ACCOUNT_ACCESS_REJECTED,
              message: 'Account access rejected'
            })
          }
        }
      })

      provider.disconnect = () => web3auth.logout()

      return {
        provider,
        instance: web3auth
      }
    }
  })
}

export default web3auth
