import type { WalletInit } from '@web3-onboard/common'
import { createEIP1193Provider } from '@web3-onboard/common'
import { CustomWindow } from './types.js'
import detectEthereumProvider from 'tallyho-detect-provider'
import TallyHoOnboarding from 'tallyho-onboarding'
declare const window: CustomWindow

function tahoWallet(): WalletInit {
  if (typeof window === 'undefined') return () => null
  return () => {
    return {
      label: 'Taho',
      injectedNamespace: 'tally',
      checkProviderIdentity: ({ provider }: { provider: any }) => {
        !!provider && !!provider['isTally']
      },
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => {
        const provider = await detectEthereumProvider({ mustBeTallyHo: true })
        if (!provider) {
          const onboarding = new TallyHoOnboarding()
          onboarding.startOnboarding()
          throw new Error('Please install Taho to use this wallet')
        } else {
          return { provider: createEIP1193Provider(window.tally) }
        }
      },
      platforms: ['desktop']
    }
  }
}

export default tahoWallet
