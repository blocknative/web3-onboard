import Portis from "@portis/web3"

import portisIcon from "../wallet-icons/icon-portis.svg"

function portis(options) {
  if (!options || typeof options !== "object") {
    throw new Error("An options object is required to initialize portis module")
  }

  const { apiKey, network } = options

  if (!apiKey || typeof apiKey !== "string") {
    throw new Error(
      "A apiKey of type string is required to initialize portis module"
    )
  }

  if (!network || typeof network !== "string") {
    throw new Error(
      "A network of type string is required to initialize portis module"
    )
  }

  return {
    name: "Portis",
    iconSrc: portisIcon,
    wallet: ({ BigNumber }) => {
      const portis = new Portis(apiKey, network)
      const { provider } = portis

      return {
        provider,
        interface: {
          name: "Portis",
          connect: provider.enable,
          address: {
            onChange: func => {
              portis.onLogin(address => {
                func(address)
                provider.address = address
              })
            }
          },
          network: {
            get: () => Promise.resolve(portis.config.network.chainId)
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
                      resolve(BigNumber(res.result).toString())
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
