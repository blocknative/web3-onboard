import { ProviderRpcError, WalletInit } from '@web3-onboard/common'
import { createEIP1193Provider } from '@web3-onboard/common'
import { CustomWindow } from './types.js'
declare const window: CustomWindow

function mewWallet(): WalletInit {
  if (typeof window === 'undefined') return () => null
  return ({ device }) => {
    return device.type === 'mobile'
      ? {
          label: 'MEW wallet',
          getIcon: async () => (await import('./icon.js')).default,
          getInterface: async () => {
            const provider =
              window.hasOwnProperty('ethereum') && window.ethereum.isMEWwallet
            if (provider) {
              return {
                provider: createEIP1193Provider(window.ethereum, {
                  wallet_switchEthereumChain: async ({ params }) => {
                    if (device.os.name.toLowerCase() === 'ios') {
                      throw new ProviderRpcError({
                        message: 'MEW Wallet iOS only supports ETH network',
                        code: 4200
                      })
                    }
                    window.ethereum.setChainId(parseInt(params[0].chainId))
                    return null
                  }
                })
              }
            } else {
              window.open(
                'https://download.mewwallet.com?source=onboard',
                '_blank'
              )
              throw new Error(
                'Please Install MEW wallet and use within the MEW DApp browser'
              )
            }
          }
        }
      : null
  }
}

export default mewWallet
