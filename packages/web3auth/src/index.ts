import type {
  Chain,
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
    getInterface: async ({ EventEmitter, chains }) => {
      const { Web3Auth } = await import('@web3auth/web3auth')
      const { CHAIN_NAMESPACES, ADAPTER_EVENTS } = await import(
        '@web3auth/base'
      )
      const { createEIP1193Provider, ProviderRpcError, ProviderRpcErrorCode } =
        await import('@web3-onboard/common')

      const emitter = new EventEmitter()

      let [currentChain] = chains

      const getChainConfig = ({
        rpcUrl,
        namespace,
        id,
        token,
        label
      }: Chain) => ({
        chainConfig: {
          ticker: token,
          tickerName: label,
          chainId: id,
          rpcTarget: rpcUrl,
          chainNamespace:
            namespace === 'evm'
              ? CHAIN_NAMESPACES.EIP155
              : CHAIN_NAMESPACES.OTHER
        }
      })

      const web3authOptions = {
        ...options,
        ...getChainConfig(currentChain)
      }

      let web3auth = new Web3Auth(web3authOptions)

      const { modalConfig } = options || {}
      await web3auth.initModal(modalConfig)

      let provider: EIP1193Provider

      let web3AuthProvider = await web3auth.connect()

      function patchProvider(): EIP1193Provider {
        const patchedProvider = createEIP1193Provider(web3AuthProvider, {
          eth_selectAccounts: null,
          eth_requestAccounts: async ({ baseRequest }) => {
            try {
              const accounts = await baseRequest({
                method: 'eth_accounts'
              })
              return accounts as ProviderAccounts
            } catch (error) {
              console.error(error)
              throw new ProviderRpcError({
                code: ProviderRpcErrorCode.ACCOUNT_ACCESS_REJECTED,
                message: 'Account access rejected'
              })
            }
          },

          wallet_switchEthereumChain: async ({ params }) => {
            const chain = chains.find(({ id }) => id === params[0].chainId)
            if (!chain) throw new Error('Chain must be set before switching')
            currentChain = chain

            // re-instantiate instance with new network
            web3auth = new Web3Auth({
              ...web3authOptions,
              ...getChainConfig(currentChain)
            })

            await web3auth.initModal(modalConfig)

            web3AuthProvider = await web3auth.connect()

            emitter.emit('chainChanged', currentChain.id)

            patchProvider()

            return null
          }
        })

        if (!provider) {
          patchedProvider.on = emitter.on.bind(emitter)
          patchedProvider.disconnect = () => web3auth.logout()

          return patchedProvider
        } else {
          provider.request = patchedProvider.request.bind(patchedProvider)

          // @ts-ignore - bind old methods for backwards compat
          provider.send = patchedProvider.send.bind(patchedProvider)

          // @ts-ignore - bind old methods for backwards compat
          provider.sendAsync = patchedProvider.sendAsync.bind(patchedProvider)

          return provider
        }
      }

      provider = patchProvider()

      return {
        provider,
        instance: web3auth
      }
    }
  })
}

export default web3auth
