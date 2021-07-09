import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import frameIcon from '../wallet-icons/icon-frame.png'
import frameIcon2x from '../wallet-icons/icon-frame@2x.png'

async function getProvider() {
  const injected = window.ethereum

  if (injected && (injected as any).isFrame) {
    return injected
  }

  const { default: ethProvider } = await import('eth-provider')
  return ethProvider('frame')
}

function frame(options: CommonWalletOptions): WalletModule {
  const { preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Frame',
    iconSrc: iconSrc || frameIcon,
    iconSrcSet: iconSrc || frameIcon2x,
    svg,
    wallet: async (helpers: Helpers) => {
      const { createModernProviderInterface } = helpers

      const provider = await getProvider()

      return {
        provider,
        interface: {
          ...createModernProviderInterface(provider),
          connect: () =>
            provider
              .request({
                method: 'eth_requestAccounts'
              })
              .catch((err: { message: string }) => {
                if (err.message.includes('Unexpected end of JSON input')) {
                  throw new Error('Frame is not running')
                }

                throw err
              }),
          disconnect: provider.close
        }
      }
    },
    type: 'injected', // native
    link: `https://frame.sh`,
    installMessage: extensionInstallMessage,
    desktop: true,
    mobile: false,
    preferred
  }
}

export default frame
