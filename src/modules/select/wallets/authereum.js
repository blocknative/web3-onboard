import Authereum from "authereum"
import authereumIcon from "../wallet-icons/authereum.png"

import { networkName } from "../../../utilities"

function authereum(options) {
  if (!options || typeof options !== "object") {
    throw new Error(
      "An options object is required to initialize fortmatic module"
    )
  }

  const { networkId } = options

  if (!networkId || typeof networkId !== "number") {
    throw new Error(
      "A networkId of type number is required to initialize fortmatic module"
    )
  }

  return {
    name: "Authereum",
    iconSrc: authereumIcon,
    wallet: () => {
      const authereum = new Authereum({
        networkName: networkName(networkId),
        disableNotifications: true
      })

      const provider = authereum.getProvider()

      return {
        provider,
        interface: {
          name: "Authereum",
          connect: () => provider.enable(),
          disconnect: () => authereum.logout(),
          loading: () =>
            new Promise(resolve => {
              authereum.on("openPopup", resolve)
            }),
          address: {
            get: () => authereum.getAccountAddress()
          },
          network: {
            get: () => Promise.resolve(networkId)
          },
          balance: {
            get: async () => {
              const loggedIn = await authereum.isAuthenticated()
              return loggedIn && authereum.getBalance()
            }
          }
        }
      }
    }
  }
}

export default authereum
