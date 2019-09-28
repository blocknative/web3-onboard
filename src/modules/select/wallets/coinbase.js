import { mobileWalletInstallMessage } from "../content"

function coinbase() {
  return {
    name: "Coinbase",
    iconSrc:
      "https://cdn-images-1.medium.com/max/1200/1*7ywNS48PnonfsvvMu1tTsA.png",
    wallet: ({ getProviderName, createLegacyProviderInterface }) => {
      const provider = window.web3 && window.web3.currentProvider

      return {
        provider,
        interface: provider
          ? getProviderName(provider) === "Coinbase" &&
            createLegacyProviderInterface(provider)
          : null
      }
    },
    link: "https://go.cb-w.com/",
    installMessage: mobileWalletInstallMessage
  }
}

export default coinbase
