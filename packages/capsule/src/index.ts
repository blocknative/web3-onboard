import { WalletInit } from '@web3-onboard/common';
import Capsule, { Environment as CapsuleEnvironment, CapsuleEIP1193Provider } from '@usecapsule/web-sdk';
import type { CapsuleInitOptions } from './types';
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

function validateOptions(options: CapsuleInitOptions): void {
  if (!(options.environment in CapsuleEnvironment)) {
      throw new Error(`Invalid environment. Must be one of the Environment enum values.`);
  }

  if (typeof options.appName !== 'string' || options.appName.trim() === '') {
      throw new Error('appName must be a non-empty string.');
  }

  if (!Array.isArray(options.chainIds) || options.chainIds.length === 0) {
      throw new Error('chains must be a non-empty array.');
  }
  if (options.chainIds.some(chain => typeof chain !== 'number')) {
      throw new Error('All elements in chains must be numbers.');
  }

  if (!options.chainIds.includes(options.initialChainId)) {
      throw new Error('chainId must be contained within the chains array.');
  }

  if (options.apiKey !== undefined && (typeof options.apiKey !== 'string' || options.apiKey.trim() === '')) {
      throw new Error('apiKey must be a non-empty string.');
  }
}

function capsule(options: CapsuleInitOptions): WalletInit {
    validateOptions(options);
    return () => {
        return {
            label: 'Capsule',
            getIcon: async () => (await import('./icon')).default,
            getInterface: async () => {
                const capsule = new Capsule(options.environment, options.apiKey);
                const chainsMap = buildChainsMap();

                const providerOpts = {
                    capsule: capsule,
                    chainId: options.initialChainId.toString(),
                    appName: options.appName,
                    chains: getChainsByIds(options.chainIds, chainsMap),
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
