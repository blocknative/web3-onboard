import { WalletInit } from '@web3-onboard/common';
import { VenlyProvider, VenlyProviderOptions, SECRET_TYPES } from '@venly/web3-provider';

function venly(options: VenlyProviderOptions): WalletInit {
  return () => {
    return {
      label: 'Venly',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ chains }) => {
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
