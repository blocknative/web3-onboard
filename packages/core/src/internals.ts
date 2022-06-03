import type { InternalState } from './types'
import { getDevice } from './utils'

// All state that gets set once and does not get updated
// and does not need to be exposed
export const internalState: InternalState = {
  svelteInstance: null,
  appMetadata: null,
  apiKey: null,
  notify: {
    disabled: false,
    customizer: () => {}
  },
  device: getDevice()
}
