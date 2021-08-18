import {
  MewConnectOptions,
  WalletModule,
  Helpers
} from '../../../interfaces'

import mewWalletIcon from '../wallet-icons/icon-mew-wallet.svg'

function mewConnect(
  options: MewConnectOptions & { networkId: number }
): WalletModule {
  const { infuraKey, preferred, iconSrc, networkId } =
    options
  const rpcUrl = `wss://mainnet.infura.io/ws/v3/${infuraKey}`;
  // if (networkId !== 1) {
  //   throw new Error(
  //     `MEW Wallet only supports Mainnet right now!`
  //   )
  // }

  if (!infuraKey) {
    throw new Error(
      `A "infuraKey" must be included in the MEW Connect initialization object`
    )
  }

  return {
    name: 'MEW Wallet',
    svg: mewWalletIcon,
    iconSrc: iconSrc,
    wallet: async (helpers: Helpers) => {
      // const createProvider = (await import('./providerEngine')).default
      const MEWConnectProvider = (await import(
        // eslint-disable-next-line
        // @ts-ignore
        '@myetherwallet/mewconnect-web-client'
      )).default
      const { resetWalletState, getBalance, getAddress, getNetwork } = helpers
      // const rpcUrl =
      //   rpc && rpc[networkId]
      //     ? rpc[networkId]
      //     : `https://${networkName(networkId)}.infura.io/v3/${infuraKey}`
      // const balanceProvider = createProvider({ rpcUrl })

      const mewConnect = new MEWConnectProvider()
      const provider = mewConnect.makeWeb3Provider(networkId, rpcUrl, true)
      provider.on('disconnected', () => {
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
              .catch(() =>
                reject({
                  message:
                    'This dapp needs access to your account information.'
                })
              )
          }),
          address: {
            get: () => getAddress(provider)
          },
          network: {
            get: () => getNetwork(provider)
          },
          balance: {
            get: () => getBalance(provider)
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
