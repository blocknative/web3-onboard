import Squarelink from "squarelink"

import { networkName, networkToId } from "../../../utilities"
import sqlkIcon from "../wallet-icons/icon-squarelink.svg"

function squarelink(options) {
  if (!options || typeof options !== "object") {
    throw new Error(
      "An options object is required to initialize squarelink module"
    )
  }

  const { apiKey, networkId } = options

  if (!apiKey || typeof apiKey !== "string") {
    throw new Error(
      "A apiKey of type string is required to initialize squarelink module"
    )
  }

  if (!networkId || typeof networkId !== "number") {
    throw new Error(
      "A network of type number is required to initialize squarelink module"
    )
  }

  return {
    name: "Squarelink",
    iconSrc: sqlkIcon,
    wallet: ({ BigNumber }) => {
      const instance = new Squarelink(apiKey, networkName(networkId), {
        useSync: true
      })

      const provider = instance.getProviderSync()

      return {
        provider,
        instance,
        interface: {
          name: "Squarelink",
          connect: provider.enable,
          address: {
            get: () => Promise.resolve(instance.accounts[0])
          },
          network: {
            get: () => Promise.resolve(networkToId(instance.network))
          },
          balance: {
            get: () =>
              new Promise(resolve => {
                if (!instance.accounts.length) {
                  resolve(null)
                  return
                }

                provider.sendAsync(
                  {
                    method: "eth_getBalance",
                    params: [instance.accounts[0], "latest"],
                    id: 1
                  },
                  (e, res) => {
                    resolve(BigNumber(res.result).toString(10))
                  }
                )
              })
          }
        }
      }
    }
  }
}

export default squarelink
