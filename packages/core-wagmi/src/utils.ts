import bowser from 'bowser'
import { type Chain as ViemChain } from 'viem'

import type {
  Device,
  DeviceBrowser,
  DeviceOS,
  DeviceType,
  ChainId,
  Chain,
  ChainWithDecimalId,
  DeviceNotBrowser,
} from '@web3-onboard/common'

import {
  hourglass,
  gnosisIcon,
  checkmark,
  errorIcon,
  infoIcon,
  ethereumIcon,
  polygonIcon,
  binanceIcon,
  questionIcon,
  fantomIcon,
  optimismIcon,
  celoIcon,
  avalancheIcon,
  harmonyOneIcon,
  arbitrumIcon,
  baseIcon,
  degenIcon
} from './icons/index.js'

import type { ChainStyle, ConnectedChain, NotifyEventStyles } from './types.js'

export function getDevice(): Device | DeviceNotBrowser {
  if (typeof window !== 'undefined') {
    const parsed = bowser.getParser(window.navigator.userAgent)
    const os = parsed.getOS()
    const browser = parsed.getBrowser()
    const { type } = parsed.getPlatform()

    return {
      type: type as DeviceType,
      os: os as DeviceOS,
      browser: browser as DeviceBrowser
    }
  } else {
    return {
      type: null,
      os: null,
      browser: null
    }
  }
}

export const notNullish = <T>(value: T | null | undefined): value is T =>
  value != null

export function isSVG(str: string): boolean {
  return str.includes('<svg')
}

export function shortenAddress(add: string): string {
  return `${add.slice(0, 6)}…${add.slice(-4)}`
}

export function shortenDomain(domain: string): string {
  return domain.length > 11
    ? `${domain.slice(0, 4)}…${domain.slice(-6)}`
    : domain
}

export async function copyWalletAddress(text: string): Promise<void> {
  try {
    const copy = await navigator.clipboard.writeText(text)
    return copy
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

export const toHexString = (val: number | string): string =>
  typeof val === 'number' ? `0x${val.toString(16)}` : val

export function chainIdToHex(chains: (Chain | ChainWithDecimalId)[]): Chain[] {
  return chains.map(({ id, ...rest }) => {
    const hexId = toHexString(id)
    return { id: hexId, ...rest }
  })
}

export function gweiToWeiHex(gwei: number): string {
  return `0x${(gwei * 1e9).toString(16)}`
}

export const chainIdToLabel: Record<string, string> = {
  '0x1': 'Ethereum',
  '0xaa36a7': 'Sepolia',
  '0x38': 'Binance',
  '0x89': 'Polygon',
  '0xfa': 'Fantom',
  '0xa': 'OP Mainnet',
  '0x45': 'OP Kovan',
  '0xa86a': 'Avalanche',
  '0xa4ec': 'Celo',
  '0x2105': 'Base',
  '0x14a33': 'Base Goerli',
  '0x64': 'Gnosis',
  '0x63564C40': 'Harmony One',
  '0xa4b1': 'Arbitrum One',
  '0xa4ba': 'Arbitrum Nova',
  '0x27bc86aa': 'Degen'
}

export function validEnsChain(chainId: ChainId): string | null {
  // return L2s as Eth for ens resolution
  switch (chainId) {
    case '0x1':
    case '0x89': // Polygon
    case '0xa': //Optimism
    case '0xa4b1': // Arb
    case '0x144': // zksync
      return '0x1'
    case '0x5': // Goerli
      return chainId
    case '0xaa36a7': // Sepolia
      return chainId
    default:
      return null
  }
}

export const chainIdToViemENSImport = async (
  chainId: string
): Promise<ViemChain | null> => {
  switch (chainId) {
    case '0x89':
    case '0xa':
    case '0xa4b1':
    case '0x144':
    case '0x1': {
      const { mainnet } = await import('viem/chains')
      return mainnet
    }
    case '0xaa36a7': {
      const { sepolia } = await import('viem/chains')
      return sepolia
    }
    default:
      return null
  }
}
export const chainIdToViemImport = async (
  w3oChain: Chain
): Promise<ViemChain | unknown> => {
  const { id } = w3oChain
  switch (id) {
    case '0x89': {
      const { polygon } = await import('viem/chains')
      return polygon
    }
    case '0xa': {
      const { optimism } = await import('viem/chains')
      return optimism
    }
    case '0xa4b1': {
      const { arbitrum } = await import('viem/chains')
      return arbitrum
    }
    case '0x144': {
      const { zkSync } = await import('viem/chains')
      return zkSync
    }
    case '0x38': {
      const { bsc } = await import('viem/chains')
      return bsc
    }
    case '0x1': {
      const { mainnet } = await import('viem/chains')
      return mainnet
    }
    case '0xaa36a7': {
      const { sepolia } = await import('viem/chains')
      return sepolia
    }
    case '0xfa': {
      const { fantom } = await import('viem/chains')
      return fantom
    }
    case '0xa86a': {
      const { avalanche } = await import('viem/chains')
      return avalanche
    }
    case '0xa4ec': {
      const { celo } = await import('viem/chains')
      return celo
    }
    case '0x2105': {
      const { base } = await import('viem/chains')
      return base
    }
    case '0x14a33': {
      const { baseGoerli } = await import('viem/chains')
      return baseGoerli
    }
    case '0x64': {
      const { gnosis } = await import('viem/chains')
      return gnosis
    }
    case '0x63564C40': {
      const { harmonyOne } = await import('viem/chains')
      return harmonyOne
    }
    case '0x27bc86aa': {
      const { degen } = await import('viem/chains')
      return degen
    }
    default: {
      return createCustomViemChain(w3oChain)

    }
  }
}

async function createCustomViemChain(w3oChain: Chain): Promise<ViemChain> {
  const { id, label, token, publicRpcUrl, blockExplorerUrl, rpcUrl } = w3oChain
  const { defineChain } = await import('viem')

  return defineChain({
    id: parseInt(id, 16),
    name: label,
    nativeCurrency: {
      decimals: 18,
      name: token,
      symbol: token
    },
    rpcUrls: {
      default: {
        http: [rpcUrl, publicRpcUrl]
      }
    },
    blockExplorers: {
      default: { name: 'Explorer', url: blockExplorerUrl }
    }
  } as const satisfies ViemChain)
}

export const networkToChainId: Record<string, ChainId> = {
  main: '0x1',
  sepolia: '0xaa36a7',
  xdai: '0x64',
  'bsc-main': '0x38',
  'matic-main': '0x89',
  'fantom-main': '0xfa',
  'matic-mumbai': '0x80001',
  degen: '0x27bc86aa'
}

export const chainStyles: Record<string, ChainStyle> = {
  '0x1': {
    icon: ethereumIcon,
    color: '#627EEA'
  },
  '0xaa36a7': {
    icon: ethereumIcon,
    color: '#627EEA'
  },
  '0x38': {
    icon: binanceIcon,
    color: '#F3BA2F'
  },
  '0x89': {
    icon: polygonIcon,
    color: '#8247E5'
  },
  '0xfa': {
    icon: fantomIcon,
    color: '#1969FF'
  },
  '0xa': {
    icon: optimismIcon,
    color: '#FF0420'
  },
  '0x45': {
    icon: optimismIcon,
    color: '#FF0420'
  },
  '0xa86a': {
    icon: avalancheIcon,
    color: '#E84142'
  },
  '0xa4ec': {
    icon: celoIcon,
    color: '#FBCC5C'
  },
  '0x64': {
    icon: gnosisIcon,
    color: '#04795B'
  },
  '0x63564C40': {
    icon: harmonyOneIcon,
    color: '#ffffff'
  },
  '0xa4b1': {
    icon: arbitrumIcon,
    color: '#33394B'
  },
  '0xa4ba': {
    icon: arbitrumIcon,
    color: '#33394B'
  },
  '0x2105': {
    icon: baseIcon,
    color: '#0259F9'
  },
  '0x14a33': {
    icon: baseIcon,
    color: '#0259F9'
  },
  '0x80001': {
    icon: polygonIcon,
    color: '#8247E5'
  },
  '0x27bc86aa': {
    icon: degenIcon,
    color: '#a36dfe'
  }
}

export const unrecognizedChainStyle = { icon: questionIcon, color: '#33394B' }

export function getDefaultChainStyles(chainId: string): ChainStyle | undefined {
  return chainId ? chainStyles[chainId.toLowerCase()] : undefined
}

export function connectedToValidAppChain(
  walletConnectedChain: ConnectedChain,
  chains: Chain[]
): boolean {
  return !!chains.find(
    ({ id, namespace }) =>
      id === walletConnectedChain.id &&
      namespace === walletConnectedChain.namespace
  )
}

export const defaultNotifyEventStyles: Record<string, NotifyEventStyles> = {
  pending: {
    backgroundColor: 'var(--onboard-primary-700, var(--primary-700))',
    borderColor: '#6370E5',
    eventIcon: hourglass
  },
  success: {
    backgroundColor: '#052E17',
    borderColor: 'var(--onboard-success-300, var(--success-300))',
    eventIcon: checkmark
  },
  error: {
    backgroundColor: '#FDB1B11A',
    borderColor: 'var(--onboard-danger-300, var(--danger-300))',
    eventIcon: errorIcon
  },
  hint: {
    backgroundColor: 'var(--onboard-gray-500, var(--gray-500))',
    borderColor: 'var(--onboard-gray-500, var(--gray-500))',
    iconColor: 'var(--onboard-gray-100, var(--gray-100))',
    eventIcon: infoIcon
  }
}

export const wait = (time: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, time))

export function getLocalStore(key: string): string | null {
  try {
    const result = localStorage.getItem(key)
    return result
  } catch (error) {
    return null
  }
}

export function setLocalStore(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    return
  }
}

export function delLocalStore(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    return
  }
}

