import { mobileWalletInstallMessage } from "../content"
import trustIcon from "../wallet-icons/icon-trust.svg"
import { WalletModule, Helpers } from "../../../interfaces"

function trust(): WalletModule {
  return {
    name: "Trust",
    iconSrc: trustIcon,
    wallet: (helpers: Helpers) => {
      const { getProviderName, createLegacyProviderInterface } = helpers
      const provider =
        (window as any).web3 && (window as any).web3.currentProvider

      return {
        provider,
        interface:
          provider && getProviderName(provider) === "Trust"
            ? createLegacyProviderInterface(provider)
            : null
      }
    },
    link: `https://links.trustwalletapp.com/a/key_live_lfvIpVeI9TFWxPCqwU8rZnogFqhnzs4D?&event=openURL&url=${window.location.href}`,
    installMessage: mobileWalletInstallMessage
  }
}

export default trust
