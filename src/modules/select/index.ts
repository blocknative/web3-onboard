import metamask from './wallets/metamask'
import dapper from './wallets/dapper'
import walletConnect from './wallets/wallet-connect'
import coinbase from './wallets/coinbase'
import trust from './wallets/trust'
import portis from './wallets/portis'
import fortmatic from './wallets/fortmatic'
import authereum from './wallets/authereum'
// import squarelink from './wallets/squarelink'
import opera from './wallets/opera'
import operaTouch from './wallets/opera-touch'

import { validateSelectDefaultsOptions } from '../../validation'
import { SelectDefaultsOptions, WalletSelectModule } from '../../interfaces'

function defaults(options: SelectDefaultsOptions): WalletSelectModule {
  validateSelectDefaultsOptions(options)

  const {
    heading,
    description,
    networkId,
    fortmaticInit,
    portisInit,
    // squarelinkInit,
    walletConnectInit,
    preferredWallets
  } = options

  let desktopWallets = [metamask(), dapper(), opera()]
  let mobileWallets = [coinbase(), trust(), operaTouch()]

  if (portisInit) {
    desktopWallets.push(portis({ ...portisInit, networkId }))
    mobileWallets.push(portis({ ...portisInit, networkId }))
  }

  if (fortmaticInit) {
    desktopWallets.push(fortmatic({ ...fortmaticInit, networkId }))
    mobileWallets.push(fortmatic({ ...fortmaticInit, networkId }))
  }

  if (walletConnectInit) {
    desktopWallets.push(
      walletConnect({ infuraKey: walletConnectInit.infuraKey })
    )
    mobileWallets.push(
      walletConnect({ infuraKey: walletConnectInit.infuraKey })
    )
  }

  // if (squarelinkInit) {
  //   desktopWallets.push(squarelink({ ...squarelinkInit, networkId }))
  //   mobileWallets.push(squarelink({ ...squarelinkInit, networkId }))
  // }

  desktopWallets.push(authereum({ networkId }))
  mobileWallets.push(authereum({ networkId }))

  //set preferred wallets if provided
  if (preferredWallets) {
    desktopWallets = desktopWallets.map(wallet => {
      if (preferredWallets.includes(wallet.name)) {
        wallet.preferred = true
      }

      return wallet
    })

    mobileWallets = mobileWallets.map(wallet => {
      if (preferredWallets.includes(wallet.name)) {
        wallet.preferred = true
      }

      return wallet
    })
  }

  return {
    heading: heading || 'Select a Wallet',
    description:
      description ||
      'Please select the wallet that you would like to use with this dapp:',
    wallets: {
      mobile: mobileWallets,
      desktop: desktopWallets
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
  // squarelink,
  opera,
  operaTouch
}
