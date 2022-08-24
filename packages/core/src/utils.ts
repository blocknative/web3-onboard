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

import ethereumIcon from './icons/ethereum.js'
import polygonIcon from './icons/polygon.js'
import questionIcon from './icons/question.js'
import binanceIcon from './icons/binance.js'
import fantomIcon from './icons/fantom.js'
import optimismIcon from './icons/optimism.js'
import avalancheIcon from './icons/avalanche.js'
import celoIcon from './icons/celo.js'
import gnosisIcon from './icons/gnosis.js'
import harmonyOneIcon from './icons/harmony-one.js'
import arbitrumIcon from './icons/arbitrum.js'

import hourglass from './icons/hourglass.js'
import checkmark from './icons/checkmark.js'
import error from './icons/error.js'
import info from './icons/info.js'

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

export function validEnsChain(chainId: ChainId): boolean {
  switch (chainId) {
    case '0x1':
    case '0x3':
    case '0x4':
    case '0x5':
      return true
    default:
      return false
  }
}

export function isSVG(str: string): boolean {
  return str.includes('<svg')
}

export function shortenAddress(add: string): string {
  return `${add.slice(0, 6)}...${add.slice(-4)}`
}

export function shortenEns(ens: string): string {
  return ens.length > 11 ? `${ens.slice(0, 4)}...${ens.slice(-6)}` : ens
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

export function chainIdToHex(chains: Chain[] | ChainWithDecimalId[]): Chain[] {
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
  '0x3': 'Ropsten',
  '0x4': 'Rinkeby',
  '0x5': 'Goerli',
  '0x2a': 'Kovan',
  '0x38': 'Binance',
  '0x89': 'Polygon',
  '0xfa': 'Fantom',
  '0xa': 'Optimism',
  '0x45': 'Optimism Kovan',
  '0xa86a': 'Avalanche',
  '0xa4ec': 'Celo',
  '0x64': 'Gnosis',
  '0x63564C40': 'Harmony One',
  '0xa4b1': 'Arbitrum'
}

export const networkToChainId: Record<string, ChainId> = {
  main: '0x1',
  ropsten: '0x3',
  rinkeby: '0x4',
  goerli: '0x5',
  kovan: '0x2a',
  xdai: '0x64',
  'bsc-main': '0x38',
  'matic-main': '0x89',
  'fantom-main': '0xfa',
  'matic-mumbai': '0x80001'
}

export const chainStyles: Record<string, ChainStyle> = {
  '0x1': {
    icon: ethereumIcon,
    color: '#627EEA'
  },
  '0x3': {
    icon: ethereumIcon,
    color: '#627EEA'
  },
  '0x4': {
    icon: ethereumIcon,
    color: '#627EEA'
  },
  '0x5': {
    icon: ethereumIcon,
    color: '#627EEA'
  },
  '0x2a': {
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
    eventIcon: error
  },
  hint: {
    backgroundColor: 'var(--onboard-gray-500, var(--gray-500))',
    borderColor: 'var(--onboard-gray-500, var(--gray-500))',
    iconColor: 'var(--onboard-gray-100, var(--gray-100))',
    eventIcon: info
  }
}

export const wait = (time: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, time))
