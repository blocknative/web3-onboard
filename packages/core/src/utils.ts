import bowser from 'bowser'

import type {
  Device,
  DeviceBrowser,
  DeviceOS,
  DeviceType
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

export function validEnsChain(reference: string): boolean {
  switch (parseInt(reference)) {
    case 1:
    case 3:
    case 4:
    case 5:
      return true
    default:
      return false
  }
}

export function isUrl(str: string): boolean {
  let url

  try {
    url = new URL(str)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}
