import metamask from "./wallets/metamask"
import dapper from "./wallets/dapper"
import walletConnect from "./wallets/wallet-connect"
import coinbase from "./wallets/coinbase"
import trust from "./wallets/trust"
import portis from "./wallets/portis"
import fortmatic from "./wallets/fortmatic"
import authereum from "./wallets/authereum"
import squarelink from "./wallets/squarelink"

import { validateSelectDefaultsOptions } from "../../validation"
import { SelectDefaultsOptions, WalletSelectModule } from "../../interfaces"

function defaults(options: SelectDefaultsOptions): WalletSelectModule {
  validateSelectDefaultsOptions(options)

  const {
    heading,
    description,
    networkId,
    fortmaticInit,
    portisInit,
    squarelinkInit,
    walletConnectInit
  } = options

  const desktopModules = [metamask(), dapper()]
  const mobileModules = [coinbase(), trust()]

  if (portisInit) {
    desktopModules.push(portis({ ...portisInit, networkId }))
    mobileModules.push(portis({ ...portisInit, networkId }))
  }

  if (fortmaticInit) {
    desktopModules.push(fortmatic({ ...fortmaticInit, networkId }))
    mobileModules.push(fortmatic({ ...fortmaticInit, networkId }))
  }

  if (walletConnectInit) {
    desktopModules.push(
      walletConnect({ infuraKey: walletConnectInit.infuraKey })
    )
    mobileModules.push(
      walletConnect({ infuraKey: walletConnectInit.infuraKey })
    )
  }

  if (squarelinkInit) {
    desktopModules.push(squarelink({ ...squarelinkInit, networkId }))
    mobileModules.push(squarelink({ ...squarelinkInit, networkId }))
  }

  desktopModules.push(authereum({ networkId }))
  mobileModules.push(authereum({ networkId }))

  return {
    heading: heading || "Select a Wallet",
    description:
      description ||
      "Please select the wallet that you would like to use with this dapp:",
    wallets: {
      mobile: mobileModules,
      desktop: desktopModules
    }
  }
}

export default {
  defaults,
  metamask,
  dapper,
  walletConnect,
  coinbase,
  trust,
  portis,
  fortmatic,
  authereum,
  squarelink
}
