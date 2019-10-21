import Fortmatic from "fortmatic"
import fortmaticIcon from "../wallet-icons/icon-fortmatic.svg"
import { networkName } from "../../../utilities"

function fortmatic(options) {
  if (!options || typeof options !== "object") {
    throw new Error(
      "An options object is required to initialize fortmatic module"
    )
  }

  const { apiKey, networkId } = options

  if (!apiKey || typeof apiKey !== "string") {
    throw new Error(
      "A apiKey of type string is required to initialize fortmatic module"
    )
  }

  if (!networkId || typeof networkId !== "number") {
    throw new Error(
      "A networkId of type number is required to initialize fortmatic module"
    )
  }

  return {
    name: "Fortmatic",
    iconSrc: fortmaticIcon,
    wallet: ({ BigNumber }) => {
      const instance = new Fortmatic(
        apiKey,
        networkId === 1 ? undefined : networkName(networkId)
      )
      const provider = instance.getProvider()

      return {
        provider,
        instance,
        interface: {
          name: "Fortmatic",
          connect: instance.user.login,
          address: {
            get: () => Promise.resolve(provider.account)
          },
          network: {
            get: () => Promise.resolve(networkId)
          },
          balance: {
            get: () =>
              provider.account &&
              instance.user.getBalances().then(res =>
                res[0]
                  ? BigNumber(res[0].crypto_amount)
                      .times(BigNumber("1000000000000000000"))
                      .toString(10)
                  : null
              )
          }
        }
      }
    }
  }
}

export default fortmatic
