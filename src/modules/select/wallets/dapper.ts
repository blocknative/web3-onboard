import { extensionInstallMessage } from "../content"
import { WalletModule, Helpers } from "../../../interfaces"

import dapperIcon from "../wallet-icons/icon-dapper.png"
import dapperIcon2x from "../wallet-icons/icon-dapper@2x.png"

function dapper(): WalletModule {
  return {
    name: "Dapper",
    iconSrc: dapperIcon,
    iconSrcSet: dapperIcon2x,
    wallet: (helpers: Helpers) => {
      const { getProviderName, BigNumber } = helpers
      const provider = (window as any).ethereum

      return {
        provider,
        interface:
          provider && getProviderName(provider) === "Dapper"
            ? {
                name: "Dapper",
                connect: provider.enable,
                address: {
                  get: () =>
                    Promise.resolve(provider.cachedResults.eth_coinbase.result)
                },
                network: {
                  get: () =>
                    Promise.resolve(provider.cachedResults.net_version.result)
                },
                balance: {
                  get: () =>
                    new Promise(resolve => {
                      if (!provider.cachedResults.eth_coinbase.result) {
                        resolve(null)
                        return
                      }

                      provider.sendAsync(
                        {
                          method: "eth_getBalance",
                          params: [
                            provider.cachedResults.eth_coinbase.result,
                            "latest"
                          ],
                          id: 1
                        },
                        (e: any, res: any) => {
                          resolve(BigNumber(res.result).toString(10))
                        }
                      )
                    })
                }
              }
            : null
      }
    },
    link: "https://www.meetdapper.com/",
    installMessage: extensionInstallMessage
  }
}

export default dapper
