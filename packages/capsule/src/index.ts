import { WalletInit } from '@web3-onboard/common';
import Capsule, { Environment as CapsuleEnvironment, CapsuleEIP1193Provider } from '@usecapsule/web-sdk';
import type { CapsuleInitOptions } from './types.js';
import * as chains from '@wagmi/chains';
import { Chain } from '@wagmi/chains';

type ChainId = number;
type ChainsMap = Map<ChainId, Chain>;

function buildChainsMap(): ChainsMap {
  const chainEntries = Object.entries(chains);
  const chainsMap: ChainsMap = new Map();

  for (const [chainName, chainObject] of chainEntries) {
    if (chainObject && 'id' in chainObject) {
      chainsMap.set(chainObject.id, chainObject as Chain);
    }
  }

  return chainsMap;
}

function getChainsByIds(chainIds: number[], chainsMap: ChainsMap): Chain[] {
  return chainIds.map(id => chainsMap.get(id)).filter((c): c is Chain => !!c);
}

function capsule(options: CapsuleInitOptions): WalletInit {
    return () => {
        return {
            label: 'Capsule',
            getIcon: async () => (await import('./icon.js')).default,
            getInterface: async () => {
                const capsule = new Capsule(options.environment, options.apiKey);
                const chainsMap = buildChainsMap();

                const providerOpts = {
                    capsule: capsule,
                    chainId: options.chainId.toString(),
                    appName: options.appName,
                    chains: getChainsByIds(options.chains, chainsMap),
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
