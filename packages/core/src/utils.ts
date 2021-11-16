import bowser from 'bowser'

import type {
  ChainId,
  Device,
  DeviceBrowser,
  DeviceOS,
  DeviceType
} from '@onboard/types'
import type { Chain } from './types'

export const noop = (): void => {}

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

export function getRpcUrl(chain: string, chains: Chain[]): string | null {
  const { rpcUrl } =
    chains.find(({ id }) => parseInt(id) === parseInt(chain)) || {}

  return rpcUrl || null
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
