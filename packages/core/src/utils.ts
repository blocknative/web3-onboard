import bowser from 'bowser'

import type {
  Device,
  DeviceBrowser,
  DeviceOS,
  DeviceType,
  ChainId,
  Chain,
  WalletInit,
  WalletModule,
  ChainWithDecimalId
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

import type {
  ChainStyle,
  ConnectedChain,
  DeviceNotBrowser,
  NotifyEventStyles
} from './types.js'

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

export function validEnsChain(chainId: ChainId): ChainId | null {
  // return L2s as Eth for ens resolution
  switch (chainId) {
    case '0x1':
    case '0x89': // Polygon
    case '0xa': //Optimism
    case '0xa4b1': // Arb One
    case '0xa4ba': // Arb Nova
    case '0x144': // zksync
      return '0x1'
    case '0xaa36a7': // Sepolia
      return chainId
    default:
      return null
  }
}

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

export function initializeWalletModules(
  modules: WalletInit[],
  device: Device
): WalletModule[] {
  return modules.reduce((acc, walletInit) => {
    const initialized = walletInit({ device })

    if (initialized) {
      // injected wallets is an array of wallets
      acc.push(...(Array.isArray(initialized) ? initialized : [initialized]))
    }

    return acc
  }, [] as WalletModule[])
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
