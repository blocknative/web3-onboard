import type {
  AppMetadata,
  EIP1193Provider,
  WalletInit
} from '@web3-onboard/common'
import type { ParaInitOptions } from './types'
import type { Chain } from '@wagmi/chains'
import type { Chain as BlocknativeChain } from '@web3-onboard/common'
import {
  Environment as ParaEnvironment,
  OAuthMethod,
  Theme
} from '@getpara/react-sdk'
import '@getpara/react-sdk/styles.css'
import { http, HttpTransport } from 'viem'

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
  options: ParaInitOptions,
  chains: BlocknativeChain[],
  appMetadata: AppMetadata | null
): void {
  if (!(options.environment in ParaEnvironment)) {
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

function para(options: ParaInitOptions): WalletInit {
  return () => {
    return {
      label: options.walletLabel || 'Para',
      getIcon:
        options.walletIcon || (async () => (await import('./icon')).default),
      getInterface: async ({ chains, appMetadata }) => {
        const { default: Para } = await import('@getpara/react-sdk')
        const { ParaEIP1193Provider } = await import(
          '@getpara/wagmi-v2-integration'
        )
        validateOptions(options, chains, appMetadata)
        const para = new Para(
          options.environment,
          options.apiKey,
          options.constructorOpts
        )
        const chainsMap = await buildChainsMap()

        const transports: Record<string, HttpTransport> = {}

        chains.forEach(c => {
          transports[convertChainIdToNumber(c.id)] = http()
        })

        const providerOpts = {
          para: para,
          chainId: convertChainIdToNumber(chains[0].id).toString(),
          appName: appMetadata?.name as string,
          chains: getChainsByIds(
            chains.map(ch => convertChainIdToNumber(ch.id)),
            chainsMap
          ),
          transports: transports,
          ...options.modalProps
        }
        const provider: EIP1193Provider = new ParaEIP1193Provider(providerOpts)

        provider.disconnect = () => {
          para.logout()
        }

        return {
          instance: para,
          provider: provider
        }
      }
    }
  }
}

export default para
export { ParaEnvironment as Environment }
export { OAuthMethod, Theme }
