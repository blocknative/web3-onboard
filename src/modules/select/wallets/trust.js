import { mobileWalletInstallMessage } from "../content"

import trustIcon from "../wallet-icons/icon-trust.svg"

function trust() {
  return {
    name: "Trust",
    iconSrc: trustIcon,
    wallet: ({ getProviderName, createLegacyProviderInterface }) => {
      const provider = window.web3 && window.web3.currentProvider

      return {
        provider,
        interface: provider
          ? getProviderName(provider) === "Trust" &&
            createLegacyProviderInterface(provider)
          : null
      }
    },
    link: `https://links.trustwalletapp.com/a/key_live_lfvIpVeI9TFWxPCqwU8rZnogFqhnzs4D?&event=openURL&url=${window.location.href}`,
    installMessage: mobileWalletInstallMessage
  }
}

export default trust
