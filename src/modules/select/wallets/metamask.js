import { extensionInstallMessage } from "../content"

import metamaskIcon from "../wallet-icons/icon-metamask.png"
import metamaskIcon2x from "../wallet-icons/icon-metamask@2x.png"

function metamask() {
  return {
    name: "MetaMask",
    iconSrc: metamaskIcon,
    iconSrcSet: metamaskIcon2x,
    wallet: ({
      getProviderName,
      createModernProviderInterface,
      createLegacyProviderInterface
    }) => {
      const provider =
        window.ethereum || (window.web3 && window.web3.currentProvider)

      return {
        provider,
        interface: provider
          ? getProviderName(provider) === "MetaMask" &&
            typeof provider.enable === "function"
            ? createModernProviderInterface(provider)
            : createLegacyProviderInterface(provider)
          : null
      }
    },
    link: "https://metamask.io/",
    installMessage: extensionInstallMessage
  }
}

export default metamask
