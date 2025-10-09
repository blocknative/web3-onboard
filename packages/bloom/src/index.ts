import { validateWCInitOptions } from './validation.js'
import type { WalletInit } from '@web3-onboard/common'
import walletConnect from './walletConnect.js'
import type { WalletConnectOptions } from './types.js'

function initBloom(options: WalletConnectOptions): WalletInit {
  if (!options) {
    throw new Error(
      `WalletConnect requires an initialization object to be passed - see the official docs for an example: https://web3onboard.thirdweb.com/docs/wallets/walletconnect`
    )
  }

  const error = validateWCInitOptions(options)
  if (error) {
    throw error
  }

  const wallet = {
    name: 'Bloom',
    protocol: 'bloom',
    downloadLink: 'https://bloomwallet.io/',
  }
  options.handleUri = (uri: string) => {
    const deeplink = `${wallet.protocol}://wallet-connect/wc?uri=${encodeURIComponent(uri)}`
    window.location.href = deeplink
    return Promise.resolve()
  }

  return walletConnect(wallet, options)
}

export default initBloom
