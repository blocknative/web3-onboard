import connect from "./connect"
import network from "./network"
import balance from "./balance"

function init(options) {
  if (!options || typeof options !== "object") {
    throw new Error("initModules must be called with a valid option object")
  }

  const { networkId, minimumBalance } = options

  if (!networkId || typeof networkId !== "number") {
    throw new Error(
      "initModules must be called with a property of networkId that is of type Number"
    )
  }

  return [connect(), network(networkId), balance(minimumBalance || "0")]
}

export default {
  init,
  connect,
  network,
  balance
}
