export function createModernProviderInterface(provider) {
  provider.autoRefreshOnNetworkChange = false

  return {
    address: {
      get: async () => {
        const unlocked = await provider._metamask.isUnlocked()
        const enabled = provider._metamask.isEnabled()

        return unlocked && enabled
          ? Promise.resolve(provider.selectedAddress)
          : Promise.resolve(undefined)
      }

      // METAMASK BUG NEEDS TO BE FIXED FOR CHROME: https://github.com/MetaMask/metamask-extension/issues/7101
      // onChange: func => {
      //   // give the initial value if it exists
      //   if (provider.selectedAddress) {
      //     func(provider.selectedAddress)
      //   }
      //   provider.on("accountsChanged", accounts => func(accounts[0]))
      // }
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
              resolve(String(parseInt(res.result, 16)))
            }
          )
        })
    },
    connect: () =>
      new Promise((resolve, reject) => {
        provider
          .enable()
          .then(resolve)
          .catch(() =>
            reject({
              message: "This dapp needs access to your account information."
            })
          )
      }),
    name: getProviderName(provider)
  }
}

export function createLegacyProviderInterface(provider) {
  return {
    address: {
      get: () => Promise.resolve(provider._address || provider.address)
    },
    network: {
      get: () => Promise.resolve(provider._chainId || provider.chainId)
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
              resolve(String(parseInt(res.result, 16)))
            }
          )
        })
    },
    name: getProviderName(provider)
  }
}

export function getProviderName(provider) {
  if (!provider) return

  if (provider.isMetaMask) {
    return "MetaMask"
  }

  if (provider.isDapper) {
    return "Dapper"
  }

  if (provider.isWalletConnect) {
    return "WalletConnect"
  }

  if (provider.isTrust) {
    return "Trust"
  }

  if (provider.isCoinbaseWallet) {
    return "Coinbase"
  }

  if (provider.isToshi) {
    return "Toshi"
  }

  if (provider.isCipher) {
    return "Cipher"
  }

  if (provider.host && provider.host.indexOf("localhost") !== -1) {
    return "localhost"
  }
}
