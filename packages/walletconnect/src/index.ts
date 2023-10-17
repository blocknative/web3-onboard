import { validateWCInitOptions } from './validation.js'
import type { WalletInit } from '@web3-onboard/common'
import walletConnect from './walletConnect.js'

import type { WalletConnectOptions } from 'types.js'

export const isHexString = (value: string | number) => {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false
  }

  return true
}

function initWalletConnect(options: WalletConnectOptions): WalletInit {
  if (!options) {
    throw new Error(
      `WalletConnect requires an initialization object to be passed - see the official docs for an example: https://onboard.blocknative.com/docs/wallets/walletconnect`
    )
  }
  if (options) {
    const error = validateWCInitOptions(options)

    if (error) {
      throw error
    }
  }
  return walletConnect(options)
}

export default initWalletConnect
