import {
  formatEther,
  fromHex,
  hexToBigInt,
  numberToHex,
  parseEther
} from 'viem'
import type { Address, Chain } from './types.js'
import type { Chain as ViemChain } from 'viem'

export const isAddress = (address: string): address is Address => {
  return isAddress(address)
}

export const weiHexToEth = (wei: `0x${string}`): string => {
  const weiBigInt = hexToBigInt(wei)
  return formatEther(weiBigInt)
}

export const weiToEth = (wei: string): string => {
  if (!wei) return wei
  const weiBigInt = fromHex(wei as `0x${string}`, 'bigint')
  return formatEther(weiBigInt)
}

export const ethToWeiBigInt = (eth: string | number): bigint => {
  if (typeof eth !== 'string' && typeof eth !== 'number') {
    throw new Error('eth must be a string or number value')
  }

  const ethString = typeof eth === 'number' ? eth.toString() : eth

  return parseEther(ethString)
}

export const bigIntToHex = (value: bigint): string => {
  return numberToHex(value)
}

export const createDownloadMessage = (
  walletLabel: string,
  download?: string | (() => void)
): string => {
  if (!download) return `Please switch to ${walletLabel} to continue`
  if (typeof download === 'function') {
    return `Please <a href="#" onclick="${() =>
      download()}">install</a> or enable to ${walletLabel} to continue`
  } else {
    return `Please <a href="${download}" target="_blank">install</a> or enable to ${walletLabel} to continue`
  }
}

export const convertChainIdToNumber = (chainId: string | number): number => {
  if (typeof chainId === 'number') {
    return chainId
  }
  const hexRegex = /^[0-9a-fA-F]+$/
  return hexRegex.test(chainId) ? parseInt(chainId, 16) : Number(chainId)
}

export const chainIdToViemImport = async (
  w3oChain: Chain
): Promise<ViemChain | unknown> => {
  const viemChains = await import('viem/chains')
  const { id, label, token, publicRpcUrl, blockExplorerUrl, rpcUrl } = w3oChain
  switch (id) {
    case '0x89': {
      const { polygon } = viemChains
      return polygon
    }
    case '0xa': {
      const { optimism } = viemChains
      return optimism
    }
    case '0xa4b1': {
      const { arbitrum } = viemChains
      return arbitrum
    }
    case '0x144': {
      const { zkSync } = viemChains
      return zkSync
    }
    case '0x38': {
      const { bsc } = viemChains
      return bsc
    }
    case '0x1': {
      const { mainnet } = viemChains
      return mainnet
    }
    case '0xaa36a7': {
      const { sepolia } = viemChains
      return sepolia
    }
    case '0xfa': {
      const { fantom } = viemChains
      return fantom
    }
    case '0xa86a': {
      const { avalanche } = viemChains
      return avalanche
    }
    case '0xa4ec': {
      const { celo } = viemChains
      return celo
    }
    case '0x2105': {
      const { base } = viemChains
      return base
    }
    case '0x14a33': {
      const { baseGoerli } = viemChains
      return baseGoerli
    }
    case '0x64': {
      const { gnosis } = viemChains
      return gnosis
    }
    case '0x63564C40': {
      const { harmonyOne } = viemChains
      return harmonyOne
    }
    case '0x27bc86aa': {
      const { degen } = viemChains
      return degen
    }
    default: {
      const { extractChain, defineChain } = await import('viem')
      const nonNativeChain = extractChain({
        chains: Object.values(viemChains) as ViemChain[],
        id: fromHex(id as `0x${string}`, 'number')
      })
      if (nonNativeChain) return nonNativeChain

      return defineChain({
        id: fromHex(id as `0x${string}`, 'number'),
        name: label ?? '',
        nativeCurrency: {
          decimals: 18,
          name: token ?? '',
          symbol: token ?? ''
        },
        rpcUrls: {
          default: {
            http: [rpcUrl ?? '', publicRpcUrl ?? '']
          }
        },
        blockExplorers: {
          default: { name: 'Explorer', url: blockExplorerUrl ?? '' }
        }
      })
    }
  }
}