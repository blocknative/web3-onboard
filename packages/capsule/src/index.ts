import { WalletInit } from '@web3-onboard/common';
import Capsule, { Environment as CapsuleEnvironment, CapsuleEIP1193Provider } from '@usecapsule/web-sdk';
import type { CapsuleInitOptions } from './types.js';
import { Chain } from '@wagmi/chains';

type MaybeChain = Chain | null;

function getChainById(chainId: number): MaybeChain {
  const globalProperties = Object.getOwnPropertyNames(globalThis);

  for (const propName of globalProperties) {
    const possibleChain: any = (globalThis as any)[propName];
    if (possibleChain && possibleChain.id === chainId) {
      return possibleChain as Chain;
    }
  }

  return null;
}

function getChainsByIds(chainIds: number[]): Chain[] {
  return chainIds.map(id => getChainById(id)).filter(chain => chain != null) as Chain[];
}

function capsule(options: CapsuleInitOptions): WalletInit {
    return () => {
        return {
            label: 'Capsule',
            getIcon: async () => (await import('./icon.js')).default,
            getInterface: async () => {
                const capsule = new Capsule(options.environment, options.apiKey);
                const chains = getChainsByIds(options.chains);

                const providerOpts = {
                    capsule: capsule,
                    chainId: options.chainId.toString(),
                    appName: options.appName,
                    chains: chains,
                };
                const provider = new CapsuleEIP1193Provider(providerOpts);

                return {
                    instance: capsule,
                    provider: provider
                }
            },
        }
    }
}

export default capsule;
export { CapsuleEnvironment as Environment };
