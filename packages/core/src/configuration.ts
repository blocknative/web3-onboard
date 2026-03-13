import type { Configuration } from './types.js'
import { getDevice } from './utils.js'

export let configuration: Configuration = {
  svelteInstance: null,
  device: getDevice(),
  initialWalletInit: [],
  gas: undefined,
  containerElements: { accountCenter: undefined, connectModal: undefined },
  unstoppableResolution: undefined,
  wagmi: undefined
}

export function updateConfiguration(update: Partial<Configuration>): void {
  configuration = { ...configuration, ...update }
}
