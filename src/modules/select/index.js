import metamask from "./wallets/metamask"
import dapper from "./wallets/dapper"
import walletConnect from "./wallets/wallet-connect"
import coinbase from "./wallets/coinbase"
import trust from "./wallets/trust"
import portis from "./wallets/portis"
import fortmatic from "./wallets/fortmatic"
import squarelink from "./wallets/squarelink"

function defaults({
  heading,
  description,
  networkId,
  fortmaticInit,
  portisInit,
  squarelinkInit,
  walletConnectInit
}) {
  const desktopModules = [metamask(), dapper()]
  const mobileModules = [coinbase(), trust()]

  if (squarelinkInit) {
    desktopModules.push(squarelink({ ...squarelinkInit, networkId }))
    mobileModules.push(squarelink({ ...squarelinkInit, networkId }))
  }

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
  squarelink
}
