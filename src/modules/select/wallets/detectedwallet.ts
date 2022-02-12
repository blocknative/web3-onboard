import { extensionInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'
import injectedIcon from '../wallet-icons/icon-detected-wallet'

function injected(options: CommonWalletOptions): WalletModule {
  const { preferred, label, svg } = options

  const provider =
    (window as any).ethereum ||
    ((window as any).web3 && (window as any).web3.currentProvider)

  const name =
    label ||
    Object.keys(provider || {})
      .find(
        key =>
          key.startsWith('is') &&
          !key.includes('MetaMask') &&
          !key.includes('Connected')
      )
      ?.split('is')[1] ||
    'Detected Wallet'

  return {
    name,
    svg: svg || injectedIcon,
    wallet: async (helpers: Helpers) => {
      const {
        getProviderName,
        createModernProviderInterface,
        createLegacyProviderInterface
      } = helpers

      return {
        provider,
        interface:
          provider && getProviderName(provider) === undefined
            ? typeof provider.enable === 'function'
              ? createModernProviderInterface(provider)
              : createLegacyProviderInterface(provider)
            : null
      }
    },
    type: 'injected',
    installMessage: extensionInstallMessage,
    desktop: true,
    mobile: true,
    preferred
  }
}

export default injected
