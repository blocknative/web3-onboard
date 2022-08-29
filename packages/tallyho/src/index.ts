import type { WalletInit } from '@web3-onboard/common'
import {  createEIP1193Provider } from './eip1193'
import { CustomWindow } from './types.js'
declare const window: CustomWindow



function tallyHoWallet(): WalletInit {
  
   if (typeof window === 'undefined') return () => null
   console.log('trying provider')
   return () => {
    return  {
      label: 'Tally Ho Wallet',
      injectedNamespace: 'tally',
      checkProviderIdentity: ({ provider }: { provider: any} ) => {
        console.log('checkProviderIdentity', provider);
        console.log('isTally', provider.isTally);
        !!provider && !!provider['isTally'] },
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => ({
        provider: createEIP1193Provider(window.tally)
      }),
      platforms: ['desktop']
    }
  }
}

export default tallyHoWallet
