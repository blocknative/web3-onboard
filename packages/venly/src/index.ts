import { WalletInit } from '@web3-onboard/common';

interface VenlyProviderOptions {
  clientId: string
  secretType?: any
  environment?: string
}

function venly(options: VenlyProviderOptions): WalletInit {
  return () => {
    return {
      label: 'Venly',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ chains }) => {
        const { VenlyProvider, SECRET_TYPES } = await import('@venly/web3-provider');
        if (!options.secretType) {
          const chainId = +chains[0].id;
          const chain = SECRET_TYPES[chainId];
          if (!chain) throw Error('Chain not supported');
          options.secretType = chain.secretType;
          options.environment = chain.env;
        }
        
        const instance = new VenlyProvider();
        const provider = await instance.createProvider(options);

        return {
          provider,
          instance
        }
      }
    }
  }
}

export default venly
