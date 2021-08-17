import {
  MewConnectOptions,
  WalletModule,
  Helpers
} from '../../../interfaces'

import mewWalletIcon from '../wallet-icons/icon-mew-wallet.svg'

function mewConnect(
  options: MewConnectOptions & { networkId: number }
): WalletModule {
  const { infuraKey, rpc, preferred, label, iconSrc, svg, networkId } =
    options

  if (!infuraKey) {
    if (!rpc || !rpc[networkId]) {
      throw new Error(
        `A "infuraKey" or a "rpc" object with a parameter of ${networkId} must be included in the MEW Connect initialization object`
      )
    }
  }

  return {
    name: label || 'MEW Wallet',
    svg: svg || mewWalletIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      // const createProvider = (await import('./providerEngine')).default
      const { default: MEWConnectProvider } = await import(
        // eslint-disable-next-line
        // @ts-ignore
        '@myetherwallet/mewconnect-web-client'
      )
      const { resetWalletState, networkName, getBalance, getAddress, getNetwork } = helpers
      const rpcUrl =
        rpc && rpc[networkId]
          ? rpc[networkId]
          : `https://${networkName(networkId)}.infura.io/v3/${infuraKey}`
      // const balanceProvider = createProvider({ rpcUrl })

      if (infuraKey && rpc) {
        throw new Error(
          'MEW Wallet requires  an Infura ID or a custom RPC object but not both.'
        )
      }

      const mewConnect = new MEWConnectProvider()
      const provider = mewConnect.makeWeb3Provider(rpc.chainId, rpcUrl, true)
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
