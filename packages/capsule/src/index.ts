import { AppMetadata, WalletInit } from '@web3-onboard/common';
import Capsule, { Environment as CapsuleEnvironment, CapsuleEIP1193Provider } from '@usecapsule/web-sdk';
import type { CapsuleInitOptions } from './types';
import * as chains from 'viem/chains';
import { Chain } from '@wagmi/chains';
import { Chain as BlocknativeChain } from '@web3-onboard/common';

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

function convertChainIdToNumber(chainId: string | number): number {
    if (typeof chainId === 'number') {
        return chainId;
      }
      const hexRegex = /^[0-9a-fA-F]+$/;
      return hexRegex.test(chainId) ? parseInt(chainId, 16) : Number(chainId);
}

function validateOptions(options: CapsuleInitOptions, chains: BlocknativeChain[], appMetadata: AppMetadata | null): void {
  if (!(options.environment in CapsuleEnvironment)) {
      throw new Error(`Invalid environment. Must be one of the Environment enum values.`);
  }

  if (appMetadata == null) {
    throw new Error('No appMetadata passed into the Onboard object');
  }

  if (typeof appMetadata.name !== 'string' || appMetadata.name.trim() === '') {
      throw new Error('appName must be a non-empty string.');
  }

  if (!Array.isArray(chains) || chains.length === 0) {
      throw new Error('chains must be a non-empty array.');
  }
  if (chains.some(chain => typeof Number(chain.id) !== 'number')) {
      throw new Error('All elements in chains must be numbers.');
  }

  if (options.apiKey !== undefined && (typeof options.apiKey !== 'string' || options.apiKey.trim() === '')) {
      throw new Error('apiKey must be a non-empty string.');
  }
}

function capsule(options: CapsuleInitOptions): WalletInit {
    return () => {
        return {
            label: 'Capsule',
            getIcon: async () => (await import('./icon')).default,
            getInterface: async ({ chains, appMetadata }) => {
                validateOptions(options, chains, appMetadata);
                const capsule = new Capsule(options.environment, options.apiKey);
                const chainsMap = buildChainsMap();

                const providerOpts = {
                    capsule: capsule,
                    chainId: convertChainIdToNumber(chains[0].id).toString(),
                    appName: appMetadata?.name as string,
                    chains: getChainsByIds(chains.map(ch => convertChainIdToNumber(ch.id)), chainsMap),
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
