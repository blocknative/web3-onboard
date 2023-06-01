import { WalletInit } from '@web3-onboard/common'

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
          throw new Error('Chain not supported')

        const providerOptions = { ...options, secretType: chain.secretType }
        if (!options.environment) 
          providerOptions.environment = chain.env
        
        const instance = new VenlyProvider()
        const provider = await instance.createProvider(providerOptions)

        return {
          provider,
          instance
        }
      }
    }
  }
}

export default venly
