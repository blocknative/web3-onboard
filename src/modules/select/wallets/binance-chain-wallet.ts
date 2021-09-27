import { CommonWalletOptions, Helpers, WalletModule } from '../../../interfaces'
import { extensionInstallMessage, mobileWalletInstallMessage } from '../content'
import { binanceChainWalletLogo } from '../wallet-icons/icon-binance-chain-wallet'

function binanceChainWallet(
  options: CommonWalletOptions & { isMobile: boolean }
): WalletModule {
  const { preferred, label, iconSrc, svg, isMobile } = options

  return {
    name: label || 'Binance Chain Wallet',
    iconSrc: iconSrc || binanceChainWalletLogo,
    iconSrcSet: iconSrc || binanceChainWalletLogo,
    svg: svg || binanceChainWalletLogo,
    wallet: async (helpers: Helpers) => {
      const { createModernProviderInterface } = helpers

      // Ref: https://binance-wallet.gitbook.io/binance-chain-extension-wallet
      const provider = (window as any).BinanceChain

      // The following code is necessary as when polling BSC wallet for a balance causes it to
      // relaunch the login prompt indefinitely

      let providerInterface = null
      let address: string | number | null | undefined

      if (provider) {
        providerInterface = createModernProviderInterface(provider)

        if (providerInterface.balance.get) {
          if (providerInterface.address.get) {
            // Save and override the address `get` method
            // Enables us to save the address used below to determine when to get the balance
            // We only want to get the balance after we get the address
            const addressGet = providerInterface.address.get
            providerInterface.address.get = async () => {
              address = await addressGet()
              return address
            }
          } else if (providerInterface.address.onChange) {
            // Intercept the onChange event to save the address internally
            providerInterface.address.onChange(updatedAddress => {
              address = updatedAddress
            })
          }
          // Save and override the balance `get` method -- only call the original method
          // if we have an address from BSC
          const balanceGet = providerInterface.balance.get
          providerInterface.balance.get = () => {
            return address ? balanceGet() : Promise.resolve(null)
          }
        }
      }

      return {
        provider,
        interface: providerInterface
      }
    },
    type: 'injected',
    link: 'https://docs.binance.org/smart-chain/wallet/binance.html#download-link',
    installMessage: isMobile
      ? mobileWalletInstallMessage
      : extensionInstallMessage,
    desktop: true,
    mobile: false,
    preferred
  }
}

export default binanceChainWallet
