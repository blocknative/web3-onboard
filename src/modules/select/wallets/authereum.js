import Authereum from "authereum"
import authereumIcon from "../wallet-icons/authereum.png"

import { networkToId } from "../../../utilities"

function authereum(options) {
  if (!options || typeof options !== "object") {
    throw new Error(
      "An options object is required to initialize fortmatic module"
    )
  }

  const { network } = options

  if (!network || typeof network !== "string") {
    throw new Error(
      "A network of type string is required to initialize fortmatic module"
    )
  }

  return {
    name: "Authereum",
    iconSrc: authereumIcon,
    wallet: () => {
      const authereum = new Authereum(network)
      const provider = authereum.getProvider()

      return {
        provider,
        interface: {
          name: "Authereum",
          connect: () => provider.enable(),
          loading: () =>
            new Promise(resolve => {
              authereum.on("openPopup", resolve)
            }),
          address: {
            get: () => authereum.getAccountAddress()
          },
          network: {
            get: () => Promise.resolve(networkToId(network))
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
