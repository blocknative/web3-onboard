import connect from "./connect"
import network from "./network"
import balance from "./balance"

import { validateDefaultsOptions } from "../../validation"

function defaults(options) {
  validateDefaultsOptions(options)

  const { networkId, minimumBalance } = options

  return [connect(), network(networkId), balance(minimumBalance || "0")]
}

export default {
  defaults,
  connect,
  network,
  balance
}
