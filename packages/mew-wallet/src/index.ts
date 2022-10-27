import type { WalletInit } from '@web3-onboard/common'
import { createEIP1193Provider } from '@web3-onboard/common'
import { CustomWindow } from './types.js'
import platform from 'platform';
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
                  const iosChains = ['0x1'];
                  const androidChains = ['0x1', '0x89', '0x38'];
                  const chains = platform.manufacturer.toLowerCase() === 'apple' ? iosChains : androidChains;
                  const supported = chains.find(id => id === params[0].chainId)
                  if (!supported) throw new Error("MEW Wallet doesn't support selected chain");
                  window.ethereum.setChainId(parseInt(supported));
                  return null;
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
