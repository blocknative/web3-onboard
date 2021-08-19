import {
  MewConnectOptions,
  WalletModule,
  Helpers
} from '../../../interfaces'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import MEWWallet from '@myetherwallet/mewconnect-web-client';
import mewWalletIcon from '../wallet-icons/icon-mew-wallet'

function mewConnect(
  options: MewConnectOptions & { networkId: number }
): WalletModule {
  const { rpcUrl, iconSrc, networkId, preferred } =
    options

  return {
    name: 'MEW Wallet',
    svg: mewWalletIcon,
    iconSrc: iconSrc || mewWalletIcon,
    wallet: async (helpers: Helpers) => {
      const { resetWalletState, getBalance, getAddress, getNetwork } = helpers
      const mewConnect = new MEWWallet.Provider({
        windowClosedError: true,
        chainId: networkId,
        rpcUrl
      })
      const provider = mewConnect.makeWeb3Provider()
      if (mewConnect.isConnected) {
        mewConnect.disconnect();
        resetWalletState({ disconnected: true, walletName: 'MEW Wallet' })
      }
      mewConnect.on('popupWindowClosed', () => {
        resetWalletState({ disconnected: true, walletName: 'MEW Wallet' })
      })
      return {
        provider,
        interface: {
          name: 'MEW Wallet',
          connect: () => new Promise((resolve, reject) => {
            provider
              .enable()
              .then(resolve)
              .catch(() => {
                resetWalletState()
                reject({
                  message:
                    'This dapp needs access to your account information.'
                })
              })
          }),
          address: {
            get: () => getAddress(provider)
          },
          network: {
            get: () => getNetwork(provider)
          },
          balance: {
            get: () => getBalance(provider)
          },
          disconnect: () => {
            mewConnect.disconnect()
          }
        }
      }
    },
    type: 'sdk',
    desktop: true,
    preferred

  }
}

export default mewConnect
