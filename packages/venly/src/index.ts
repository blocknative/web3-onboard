import { WalletInit } from '@web3-onboard/common'
import { createEIP1193Provider } from '@web3-onboard/common'

interface VenlyOptions {
  /**  @property {string} clientId - The Client ID used to connect with Venly. More information at https://docs.venly.io/widget/deep-dive/authentication#client-id */
  clientId: string
  /**  @property {string} environment - The environment to which you want to connect, possible values are 'staging' and 'production'. Defaults to 'production' */
  environment?: string
}

function venly(options: VenlyOptions): WalletInit {
  return () => {
    return {
      label: 'Venly',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ chains }) => {
        const { VenlyProvider, SECRET_TYPES } = await import('@venly/web3-provider')

        const chainId = +chains[0].id
        const chain = SECRET_TYPES[chainId]
        if (!chain) 
          throw Error('Chain not supported')

        const providerOptions = { ...options, secretType: chain.secretType }
        if (!options.environment) 
          providerOptions.environment = chain.env
        
        const instance = new VenlyProvider()

        const provider = createEIP1193Provider(await instance.createProvider(providerOptions), {
          wallet_switchEthereumChain: async ({ params }) => {
            const switchChain = SECRET_TYPES[+params[0].chainId]
            if (!switchChain) 
              throw Error('Chain not supported')
            else if(switchChain.env != providerOptions.environment)
              throw Error('Switching environments not supported')
            instance._provider.emit('chainChanged', params[0].chainId)
            
            const controller = instance.venlyController
            controller.options.secretType = switchChain.secretType
            controller.resetWallets()
            const accounts = await controller.getAccounts()            
            instance._provider.emit('accountsChanged', accounts)

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

export default venly
