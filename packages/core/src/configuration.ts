import type { Configuration } from './types'
import { getDevice } from './utils'

export let configuration: Configuration = {
  svelteInstance: null,
  appMetadata: null,
  apiKey: null,
  device: getDevice()
}

export function updateConfiguration(update: Partial<Configuration>): void {
  configuration = { ...configuration, ...update }
}
