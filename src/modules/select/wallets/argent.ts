import {
  WalletConnectOptions,
  WalletModule,
} from '../../../interfaces'

import argentIcon from '../wallet-icons/icon-argent'

import walletConnect from './wallet-connect'

function argent(
  options: WalletConnectOptions & { networkId: number }
): WalletModule {
  return walletConnect({
    label: 'Argent',
    svg: argentIcon,
    ...options
  })
}

export default argent
