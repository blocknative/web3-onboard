import {
  WalletConnectOptions,
  WalletModule,
} from '../../../interfaces'

import gnosisSafeIcon from '../wallet-icons/icon-gnosis-safe'

import walletConnect from './wallet-connect'

function gnosisSafe(
  options: WalletConnectOptions & { networkId: number }
): WalletModule {
  return walletConnect({
    label: 'Gnosis Safe',
    svg: gnosisSafeIcon,
    ...options
  })
}

export default gnosisSafe
