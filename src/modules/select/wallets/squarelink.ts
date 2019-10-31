import Squarelink from "squarelink"

import { networkName, networkToId } from "../../../utilities"
import { validateType } from "../../../validation"
import sqlkIcon from "../wallet-icons/icon-squarelink.svg"
import { SdkWalletOptions, WalletModule, Helpers } from "../../../interfaces"

function squarelink(options: SdkWalletOptions): WalletModule {
  validateType({ name: "Squarelink Options", value: options, type: "object" })

  const { apiKey, networkId } = options

  validateType({ name: "apiKey", value: apiKey, type: "string" })
  validateType({ name: "networkId", value: networkId, type: "number" })

  return {
    name: "Squarelink",
    iconSrc: sqlkIcon,
    wallet: (helpers: Helpers) => {
      const { BigNumber } = helpers

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
                  (e: any, res: any) => {
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
