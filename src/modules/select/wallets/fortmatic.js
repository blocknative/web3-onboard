import Fortmatic from "fortmatic"
import { networkToId } from "../../../utilities"
import fortmaticIcon from "../wallet-icons/icon-fortmatic.svg"

function fortmatic(options) {
  if (!options || typeof options !== "object") {
    throw new Error(
      "An options object is required to initialize fortmatic module"
    )
  }

  const { apiKey, network } = options

  if (!apiKey || typeof apiKey !== "string") {
    throw new Error(
      "A apiKey of type string is required to initialize fortmatic module"
    )
  }

  if (!network || typeof network !== "string") {
    throw new Error(
      "A network of type string is required to initialize fortmatic module"
    )
  }

  return {
    name: "Fortmatic",
    iconSrc: fortmaticIcon,
    wallet: ({ BigNumber }) => {
      const fortmatic = new Fortmatic(apiKey, network)
      const provider = fortmatic.getProvider()

      return {
        provider,
        interface: {
          name: "Fortmatic",
          connect: fortmatic.user.login,
          address: {
            get: () => Promise.resolve(provider.account)
          },
          network: {
            get: () => Promise.resolve(networkToId(network))
          },
          balance: {
            get: () =>
              provider.account &&
              fortmatic.user.getBalances().then(res =>
                res[0]
                  ? BigNumber(res[0].crypto_amount)
                      .times(BigNumber("1000000000000000000"))
                      .toString()
                  : null
              )
          }
        }
      }
    }
  }
}

export default fortmatic
