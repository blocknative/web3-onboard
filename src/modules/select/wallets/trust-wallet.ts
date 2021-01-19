import {
  WalletConnectOptions,
  WalletModule,
} from '../../../interfaces'

import trustWalletIcon from '../wallet-icons/icon-trust-wallet'

import walletConnect from './wallet-connect'

function trustWallet(
  options: WalletConnectOptions & { networkId: number }
): WalletModule {
  return walletConnect({
    label: 'Trust Wallet',
    svg: trustWalletIcon,
    ...options
  })
}

export default trustWallet
