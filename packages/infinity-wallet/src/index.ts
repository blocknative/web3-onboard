import type { WalletInit, EIP1193Provider } from '@web3-onboard/common'
import { openInfinityWallet } from '@infinitywallet/infinity-connector';
import { CustomWindow } from './types.js'
declare const window: CustomWindow

interface InfinityWalletOptions {
  chainId?: number
}

function infinityWallet(options?: InfinityWalletOptions): WalletInit {
  if (typeof window === 'undefined') return () => null

  return () => {
    return {
      label: 'Infinity Wallet',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => {
        const ethereumInjectionExists = window.hasOwnProperty('ethereum')

        let provider: EIP1193Provider

        // check if Infinity Wallet is injected into window.ethereum
        if(ethereumInjectionExists && window['ethereum'].isInfinityWallet){
          provider = window['ethereum'];
          console.log('Infinity Wallet is connected and can be used with the DApp');
        } else {
          openInfinityWallet(window.location.href, options?.chainId);
          throw new Error('Opening Infinity Wallet! If not installed first download to use Infinity Wallet')
        }

        return {
          provider
        }
      }
    }
  }
}

export default infinityWallet
