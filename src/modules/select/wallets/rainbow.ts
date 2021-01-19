import {
  WalletConnectOptions,
  WalletModule,
} from '../../../interfaces'

import rainbowIcon from '../wallet-icons/icon-rainbow.png'

import walletConnect from './wallet-connect'

function rainbow(
  options: WalletConnectOptions & { networkId: number }
): WalletModule {
  return walletConnect({
    label: 'Rainbow',
    svg: null,
    iconSrc: rainbowIcon,
    ...options
  })
}

export default rainbow
