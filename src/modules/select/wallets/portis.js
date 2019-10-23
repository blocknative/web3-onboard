import Portis from "@portis/web3"

import { networkName } from "../../../utilities"
import { validateType } from "../../../validation"
import portisIcon from "../wallet-icons/icon-portis.svg"

function portis(options) {
  validateType({ name: "Portis options", value: options, type: "object" })

  const { apiKey, networkId } = options

  validateType({ name: "apiKey", value: apiKey, type: "string" })
  validateType({ name: "networkId", value: networkId, type: "number" })

  return {
    name: "Portis",
    iconSrc: portisIcon,
    wallet: ({ BigNumber }) => {
      const instance = new Portis(apiKey, networkName(networkId))
      const { provider } = instance

      return {
        provider,
        instance,
        interface: {
          name: "Portis",
          connect: provider.enable,
          disconnect: () => portis.logout(),
          address: {
            onChange: func => {
              instance.onLogin(address => {
                func(address)
                provider.address = address
              })
            }
          },
          network: {
            get: () => Promise.resolve(instance.config.network.chainId)
          },
          balance: {
            get: () =>
              new Promise(resolve => {
                // add setTimeout to put at the end of event loop to make sure address is available
                setTimeout(() => {
                  if (!provider.address) {
                    resolve(null)
                    return
                  }

                  provider.sendAsync(
                    {
                      method: "eth_getBalance",
                      params: [provider.address, "latest"],
                      id: 1
                    },
                    (e, res) => {
                      resolve(BigNumber(res.result).toString(10))
                    }
                  )
                }, 1)
              })
          }
        }
      }
    }
  }
}

export default portis
