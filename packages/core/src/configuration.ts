import type { Configuration } from './types.js'
import { getDevice } from './utils.js'

export let configuration: Configuration = {
  svelteInstance: null,
  appMetadata: null,
  apiKey: null,
  device: getDevice(),
  initialWalletInit: [],
  gas: null
}

export function updateConfiguration(update: Partial<Configuration>): void {
  configuration = { ...configuration, ...update }
}
