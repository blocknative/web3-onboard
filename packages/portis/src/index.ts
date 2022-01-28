import { createEIP1193Provider } from '@bn-onboard/common'
import { WalletInit, APIKey } from '@bn-onboard/common'

function portis(options: APIKey): WalletInit {
  const { apiKey } = options

  return () => {
    return {
      label: 'Portis',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ chains }) => {
        const { default: Portis } = await import('@portis/web3')

        const instance = new Portis(apiKey, {
          nodeUrl: chains[0].rpcUrl,
          chainId: chains[0].id
        })

        const portisProvider = instance.provider

        const provider = createEIP1193Provider(portisProvider, {
          eth_requestAccounts: portisProvider.enable,
          wallet_switchEthereumChain: async ({ params }) => {
            const chain = chains.find(({ id }) => id === params[0].chainId)
            if (!chain) throw new Error('chain must be set before switching')

            instance.changeNetwork({
              nodeUrl: chain.rpcUrl,
              chainId: chain.id
            })

            //@ts-ignore
            provider.emit('chainChanged', chain.id)

            return null
          }
        })

        return {
          provider,
          instance
        }
      }
    }
  }
}

export default portis
