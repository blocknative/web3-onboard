import bowser from "bowser"
import BigNumber from "bignumber.js"

import {
  QuerablePromise,
  WalletInterface,
  CancelablePromise
} from "./interfaces"

export function createModernProviderInterface(provider: any): WalletInterface {
  provider.autoRefreshOnNetworkChange = false

  return {
    address: {
      get: () => {
        return Promise.resolve(provider.selectedAddress || null)
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
      onChange: (func: (val: string | number) => void) => {
        // give the initial value if it exists
        if (provider.networkVersion) {
          func(provider.networkVersion)
        }
        provider.on("networkChanged", func)
      }
    },
    balance: {
      get: () =>
        new Promise((resolve: (val: any) => void) => {
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
            (e: any, res: any) => {
              resolve(new BigNumber(res.result).toString(10))
            }
          )
        })
    },
    connect: () =>
      new Promise(
        (resolve: () => void, reject: (err: { message: string }) => void) => {
          provider
            .enable()
            .then(resolve)
            .catch(() =>
              reject({
                message: "This dapp needs access to your account information."
              })
            )
        }
      ),
    name: getProviderName(provider) || "unknown"
  }
}

export function createLegacyProviderInterface(provider: any): WalletInterface {
  return {
    address: {
      get: () => Promise.resolve(provider._address || provider.address)
    },
    network: {
      get: () => Promise.resolve(provider._chainId || provider.chainId)
    },
    balance: {
      get: () =>
        new Promise((resolve: (val: string | number | null) => void) => {
          provider.sendAsync(
            {
              method: "eth_getBalance",
              params: [provider._address, "latest"]
            },
            (e: any, res: any) => {
              resolve(new BigNumber(res.result).toString(10))
            }
          )
        })
    },
    name: getProviderName(provider) || "unknown"
  }
}

export function getProviderName(provider: any): string | undefined {
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

export function isMobileDevice() {
  const browser = bowser.getParser(window.navigator.userAgent)
  const { type } = browser.getPlatform()

  return type !== "desktop"
}

export function networkName(id: number): string {
  switch (id) {
    case 1:
      return "mainnet"
    case 3:
      return "ropsten"
    case 4:
      return "rinkeby"
    case 5:
      return "goerli"
    case 42:
      return "kovan"
    default:
      return "local"
  }
}

export function networkToId(network: string): number {
  switch (network) {
    case "mainnet":
      return 1
    case "ropsten":
      return 3
    case "rinkeby":
      return 4
    case "goerli":
      return 5
    case "kovan":
      return 42
    default:
      return 0
  }
}

export function wait(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export function makeQuerablePromise(
  promise: CancelablePromise
): QuerablePromise {
  let isResolved = false
  let isRejected = false

  promise.then(
    function(v: any) {
      isResolved = true
      return v
    },
    function(e: any) {
      isRejected = true
      throw e
    }
  )
  promise.isFulfilled = function() {
    return isResolved || isRejected
  }
  promise.isResolved = function() {
    return isResolved
  }
  promise.isRejected = function() {
    return isRejected
  }
  return promise
}
