import type { AppMetadata, EIP1193Provider, WalletInit } from '@web3-onboard/common'
import type { CapsuleInitOptions } from './types'
import type { Chain } from '@wagmi/chains'
import type { Chain as BlocknativeChain } from '@web3-onboard/common'
import { Environment as CapsuleEnvironment, OAuthMethod, Theme } from '@usecapsule/react-sdk'
import "@usecapsule/react-sdk/styles.css"

type ChainId = number
type ChainsMap = Map<ChainId, Chain>

async function buildChainsMap(): Promise<ChainsMap> {
  const chains = await import('viem/chains')
  const chainEntries = Object.entries(chains)
  const chainsMap: ChainsMap = new Map()

  for (const [, chainObject] of chainEntries) {
    if (chainObject && 'id' in chainObject) {
      chainsMap.set(chainObject.id, chainObject as Chain)
    }
  }

  return chainsMap
}

function getChainsByIds(chainIds: number[], chainsMap: ChainsMap): Chain[] {
  return chainIds.map(id => chainsMap.get(id)).filter((c): c is Chain => !!c)
}

function convertChainIdToNumber(chainId: string | number): number {
  if (typeof chainId === 'number') {
    return chainId
  }
  const hexRegex = /^[0-9a-fA-F]+$/
  return hexRegex.test(chainId) ? parseInt(chainId, 16) : Number(chainId)
}

function validateOptions(
  options: CapsuleInitOptions,
  chains: BlocknativeChain[],
  appMetadata: AppMetadata | null
): void {
  if (!(options.environment in CapsuleEnvironment)) {
    throw new Error(
      `Invalid environment. Must be one of the Environment enum values.`
    )
  }

  if (appMetadata == null) {
    throw new Error('No appMetadata passed into the Onboard object')
  }

  if (typeof appMetadata.name !== 'string' || appMetadata.name.trim() === '') {
    throw new Error('appName must be a non-empty string.')
  }

  if (!Array.isArray(chains) || chains.length === 0) {
    throw new Error('chains must be a non-empty array.')
  }
  if (chains.some(chain => typeof Number(chain.id) !== 'number')) {
    throw new Error('All elements in chains must be numbers.')
  }

  if (
    options.apiKey !== undefined &&
    (typeof options.apiKey !== 'string' || options.apiKey.trim() === '')
  ) {
    throw new Error('apiKey must be a non-empty string.')
  }
}

function capsule(options: CapsuleInitOptions): WalletInit {
  return () => {
    return {
      label: options.walletLabel || 'Capsule',
      getIcon:options.walletIcon || (async () => (await import('./icon')).default),
      getInterface: async ({ chains, appMetadata }) => {
        const { default: Capsule } = await import(
          '@usecapsule/react-sdk'
        )
        const { CapsuleEIP1193Provider } = await import(
          '@usecapsule/wagmi-v2-integration'
        )
        validateOptions(options, chains, appMetadata)
        const capsule = new Capsule(
          options.environment, 
          options.apiKey, 
          options.constructorOpts
        )
        const chainsMap = await buildChainsMap()

        const providerOpts = {
          capsule: capsule,
          chainId: convertChainIdToNumber(chains[0].id).toString(),
          appName: appMetadata?.name as string,
          chains: getChainsByIds(
            chains.map(ch => convertChainIdToNumber(ch.id)),
            chainsMap
          ),
          ...options.modalProps
        }
        const provider: EIP1193Provider = new CapsuleEIP1193Provider(providerOpts)

        provider.disconnect = () => { capsule.logout(); };

        return {
          instance: capsule,
          provider: provider
        }
      }
    }
  }
}

export default capsule
export { CapsuleEnvironment as Environment }
export { OAuthMethod, Theme }