import type { WalletInit } from '@web3-onboard/common'

function BloctoWallet(): WalletInit {
  if (typeof window === 'undefined') return () => null
  return () => {
    return {
      label: 'Blocto',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ chains }) => {
        const { default: BloctoSDK } = await import('@blocto/sdk')

        const { createEIP1193Provider } = await import('@web3-onboard/common')

        const [defaultChain] = chains

        const instance = new BloctoSDK({
          ethereum: {
            chainId: defaultChain.id,
            rpc: defaultChain.rpcUrl
          }
        })
        const bloctoProvider: any = instance.ethereum

        const provider = createEIP1193Provider(bloctoProvider, {
          eth_selectAccounts: null,
          wallet_switchEthereumChain: async ({ params, baseRequest }) => {
            const chain = chains.find(function (item) {
              return item.id === (params && params[0] && params[0].chainId)
            })
            if (!chain) throw new Error('chain must be set before switching')
            const providerRpcUrl = bloctoProvider?.rpc
            const chainUrl = chain.rpcUrl
            if (providerRpcUrl !== chainUrl) {
              await baseRequest({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: chain.id,
                    rpcUrls: [chainUrl]
                  }
                ]
              })
            }
            await baseRequest({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: chain.id }]
            })
            return null
          },
          eth_chainId: async ({ baseRequest }) => {
            const chainId = await baseRequest({ method: 'eth_chainId' })
            return `0x${parseInt(chainId).toString(16)}`
          }
        })

        provider.disconnect = () =>
          instance.ethereum
            ? instance.ethereum.request({ method: 'wallet_disconnect' })
            : null
        // patch the chainChanged event
        const on = bloctoProvider.on.bind(bloctoProvider)
        bloctoProvider.on = (
          event: string,
          listener: (arg0: string) => void
        ) => {
          on(event, (val: any) => {
            if (event === 'chainChanged') {
              listener(val)
              return
            }
            listener(val)
          })
          return bloctoProvider
        }
        return {
          provider,
          instance
        }
      }
    }
  }
}

export default BloctoWallet
