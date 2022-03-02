import bowser from 'bowser'

import type {
  Device,
  DeviceBrowser,
  DeviceOS,
  DeviceType,
  ChainId
} from '@web3-onboard/common'

export const notNullish = <T>(value: T | null | undefined): value is T =>
  value != null

export function getDeviceInfo(): Device {
  const parsed = bowser.getParser(window.navigator.userAgent)
  const os = parsed.getOS()
  const browser = parsed.getBrowser()
  const { type } = parsed.getPlatform()

  return {
    type: type as DeviceType,
    os: os as DeviceOS,
    browser: browser as DeviceBrowser
  }
}

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
