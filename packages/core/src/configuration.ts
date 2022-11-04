import type { Configuration } from './types.js'
import { getDevice } from './utils.js'

export let configuration: Configuration = {
  svelteInstance: null,
  appMetadata: null,
  apiKey: null,
  apiSecretKey: null,
  device: getDevice(),
  initialWalletInit: [],
  gas: null,
  containerElements: { accountCenter: null },
  transactionPreview: null
}

export function updateConfiguration(update: Partial<Configuration>): void {
  configuration = { ...configuration, ...update }
}
