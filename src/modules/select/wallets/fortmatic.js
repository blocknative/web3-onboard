import Fortmatic from "fortmatic"
import fortmaticIcon from "../wallet-icons/icon-fortmatic.svg"
import { networkName } from "../../../utilities"
import { validateType } from "../../../validation"

function fortmatic(options) {
  validateType({ name: "Fortmatic options", value: options, type: "object" })

  const { apiKey, networkId } = options

  validateType({ name: "apiKey", value: apiKey, type: "string" })
  validateType({ name: "networkId", value: networkId, type: "number" })

  return {
    name: "Fortmatic",
    iconSrc: fortmaticIcon,
    wallet: ({ BigNumber }) => {
      const fortmatic = new Fortmatic(
        apiKey,
        networkId === 1 ? undefined : networkName(networkId)
      )
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
            get: () => Promise.resolve(networkId)
          },
          balance: {
            get: () =>
              provider.account &&
              fortmatic.user.getBalances().then(res =>
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
