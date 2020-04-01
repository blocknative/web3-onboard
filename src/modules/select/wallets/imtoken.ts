import { mobileWalletInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import imTokenIcon from '../wallet-icons/icon-imtoken'

function imtoken(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'imToken',
    iconSrc,
    svg: svg || imTokenIcon,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, getBalance } = helpers

      const provider =
        (window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)

      return {
        provider,
        interface:
          provider && getProviderName(provider) === 'imToken'
            ? {
                address: {
                  get: () => Promise.resolve(provider.selectedAddress)
                },
                network: {
                  get: () => Promise.resolve(Number(provider.networkVersion))
                },
                balance: {
                  get: () => {
                    const params = {
                      jsonrpc: '2.0',
                      method: 'eth_getBalance',
                      params: [provider.selectedAddress, 'latest'],
                      id: 42
                    }

                    return provider.sendAsync(params).then((res: any) => {
                      console.log('balance result:', res)
                      return res
                    })
                  }
                },
                name: getProviderName(provider),
                connect: () => provider.enable()
              }
            : null
      }
    },
    type: 'injected',
    link: `imtokenv2://navigate?screen=DappView&url=${window.location.href}`,
    installMessage: mobileWalletInstallMessage,
    mobile: true,
    preferred
  }
}

export default imtoken
