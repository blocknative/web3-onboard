import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'
import injectedIcon from '../wallet-icons/icon-lattice'

function injected(options: CommonWalletOptions): WalletModule {
  const { preferred, label, svg } = options

  return {
    name: label || 'Injected',
    svg: svg || injectedIcon,
    wallet: async (helpers: Helpers) => {
      const { getProviderName, createModernProviderInterface } = helpers

      const provider =
        (window as any).ethereum ||
        ((window as any).web3 && (window as any).web3.currentProvider)

      return {
        provider,
        interface:
          provider && getProviderName(provider) === undefined
            ? createModernProviderInterface(provider)
            : null
      }
    },
    type: 'injected',
    installMessage: extensionInstallMessage,
    desktop: true,
    mobile: false,
    preferred
  }
}

export default injected
