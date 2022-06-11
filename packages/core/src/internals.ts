import type { InternalState } from './types'
import { getDevice } from './utils'

export const internalState: InternalState = {
  svelteInstance: null,
  appMetadata: null,
  device: getDevice()
}
