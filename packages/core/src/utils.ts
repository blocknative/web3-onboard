import bowser from 'bowser'

import type {
  Device,
  DeviceBrowser,
  DeviceOS,
  DeviceType,
  ChainId
} from '@web3-onboard/common'

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
