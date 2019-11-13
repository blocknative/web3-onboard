import connect from './connect'
import network from './network'
import balance from './balance'

import { validateReadyDefaultsOptions } from '../../validation'
import { ReadyDefaultsOptions, WalletReadyModule } from '../../interfaces'

function defaults(options: ReadyDefaultsOptions): WalletReadyModule[] {
  validateReadyDefaultsOptions(options)

  const { networkId, minimumBalance } = options

  return [connect(), network(networkId), balance(minimumBalance || '0')]
}

export default {
  defaults,
  connect,
  network,
  balance
}
