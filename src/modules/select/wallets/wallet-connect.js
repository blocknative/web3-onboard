import WalletConnectProvider from "@walletconnect/web3-provider"

import walletConnectIcon from "../wallet-icons/icon-walletconnect.svg"

function walletConnect(options) {
  if (!options || typeof options !== "object") {
    throw new Error(
      "A options object is required to initialize WalletConnect module"
    )
  }

  const { infuraKey } = options

  if (!infuraKey || typeof infuraKey !== "string") {
    throw new Error(
      "A infuraKey of type string is required to intialize WalletConnect module"
    )
  }

  return {
    name: "WalletConnect",
    iconSrc: walletConnectIcon,
    wallet: () => {
      const provider = new WalletConnectProvider({
        infuraId: infuraKey
      })

      provider.autoRefreshOnNetworkChange = false

      return {
        provider,
        interface: {
          name: "WalletConnect",
          connect: () =>
            new Promise((resolve, reject) => {
              provider
                .enable()
                .then(resolve)
                .catch(() =>
                  reject({
                    message:
                      "This dapp needs access to your account information."
                  })
                )
            }),
          disconnect: () => provider.close(),
          address: {
            onChange: func => {
              provider.send("eth_accounts").then(accounts => func(accounts[0]))
              provider.on("accountsChanged", accounts => func(accounts[0]))
            }
          },
          network: {
            onChange: func => {
              provider.send("eth_chainId").then(func)
              provider.on("chainChanged", func)
            }
          },
          balance: {
            get: () =>
              new Promise(resolve => {
                if (!provider.wc._accounts[0]) {
                  resolve(null)
                  return
                }

                provider.send("eth_getBalance", [
                  provider.wc._accounts[0],
                  "latest"
                ])
              })
          }
        }
      }
    }
  }
}

export default walletConnect
