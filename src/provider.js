export function createModernProviderInterface(provider) {
  provider.autoRefreshOnNetworkChange = false

  return {
    address: {
      onChange: func => {
        // give the initial value if it exists
        if (provider.selectedAddress) {
          func(provider.selectedAddress)
        }
        provider.on("accountsChanged", accounts => func(accounts[0]))
      }
    },
    network: {
      onChange: func => {
        // give the initial value if it exists
        if (provider.networkVersion) {
          func(provider.networkVersion)
        }
        provider.on("networkChanged", func)
      }
    },
    balance: {
      get: () =>
        new Promise(resolve => {
          if (!provider.selectedAddress) {
            resolve(null)
            return
          }

          provider.sendAsync(
            {
              method: "eth_getBalance",
              params: [provider.selectedAddress, "latest"],
              id: 1
            },
            (e, res) => {
              resolve(parseInt(res.result, 16))
            }
          )
        })
    },
    connect: provider.enable,
    name: getProviderName(provider)
  }
}

export function createLegacyProviderInterface(provider) {
  return {
    address: {
      get: () => Promise.resolve(provider._address)
    },
    network: {
      get: () => Promise.resolve(provider._chainId)
    },
    balance: {
      get: () =>
        new Promise(resolve => {
          provider.sendAsync(
            {
              method: "eth_getBalance",
              params: [provider._address, "latest"]
            },
            (e, res) => {
              resolve(parseInt(res.result, 16))
            }
          )
        })
    },
    name: getProviderName(provider)
  }
}

export function getProviderName(provider) {
  if (provider.isMetaMask) {
    return "metamask"
  }

  if (provider.isDapper) {
    return "dapper"
  }

  if (provider.currentProvider) {
    if (provider.currentProvider.isMetaMask) {
      return "metamask"
    }

    if (provider.currentProvider.isDapper) {
      return "dapper"
    }

    if (provider.currentProvider.isTrust) {
      return "trust"
    }

    if (provider.currentProvider.isCoinbaseWallet) {
      return "coinbase"
    }

    if (provider.currentProvider.isToshi) {
      return "toshi"
    }

    if (provider.currentProvider.isCipher) {
      return "cipher"
    }

    if (
      provider.currentProvider.host &&
      provider.currentProvider.host.indexOf("localhost") !== -1
    ) {
      return "localhost"
    }
  }
}
