import bowser from 'bowser'

import type {
  Device,
  DeviceBrowser,
  DeviceOS,
  DeviceType,
  ChainId,
  Chain
} from '@web3-onboard/common'

import ethereumIcon from './icons/ethereum'
import polygonIcon from './icons/polygon'
import questionIcon from './icons/question'
import binanceIcon from './icons/binance'
import fantomIcon from './icons/fantom'

import type { ChainStyle, ConnectedChain } from './types'

const parsed = bowser.getParser(window.navigator.userAgent)
const os = parsed.getOS()
const browser = parsed.getBrowser()
const { type } = parsed.getPlatform()

export const device: Device = {
  type: type as DeviceType,
  os: os as DeviceOS,
  browser: browser as DeviceBrowser
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
  return ens.length > 13 ? `${ens.slice(0, 4)}...${ens.slice(-6)}` : ens
}

export const chainIdToLabel: Record<string, string> = {
  '0x1': 'Ethereum',
  '0x3': 'Ropsten',
  '0x4': 'Rinkeby',
  '0x5': 'Goerli',
  '0x2a': 'Kovan',
  '0x38': 'Binance',
  '0x89': 'Polygon',
  '0xfa': 'Fantom'
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
  }
}

export function getDefaultChainStyles(chainId: string): ChainStyle {
  return chainStyles[chainId] || { icon: questionIcon, color: '#33394B' }
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
