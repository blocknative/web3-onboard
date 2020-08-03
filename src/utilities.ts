import bowser from 'bowser'
import BigNumber from 'bignumber.js'

import { WalletInterface } from './interfaces'

export function getNetwork(provider: any): Promise<number | any> {
  return new Promise((resolve, reject) => {
    const params = {
      jsonrpc: '2.0',
      method: 'net_version',
      params: [],
      id: 42
    }

    const callback = (e: any, res: any) => {
      e && reject(e)
      const result = res && res.result
      resolve(result && Number(result))
    }

    if (typeof provider.sendAsync === 'function') {
      provider.sendAsync(params, callback)
    } else if (typeof provider.send === 'function') {
      provider.send(params, callback)
    } else {
      resolve(null)
    }
  })
}

export function getAddress(provider: any): Promise<string | any> {
  return new Promise((resolve, reject) => {
    const params = {
      jsonrpc: '2.0',
      method: 'eth_accounts',
      params: [],
      id: 42
    }

    const callback = (e: any, res: any) => {
      e && reject(e)
      const result = res && res.result && res.result[0]
      resolve(result)
    }

    if (typeof provider.sendAsync === 'function') {
      provider.sendAsync(params, callback)
    } else if (typeof provider.send === 'function') {
      provider.send(params, callback)
    } else {
      resolve(null)
    }
  })
}

export function getBalance(
  provider: any,
  address?: string
): Promise<string | any> {
  return new Promise(async (resolve, reject) => {
    const currentAddress = address || (await getAddress(provider))

    if (!currentAddress) {
      resolve(null)
      return
    }

    const params = {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: [currentAddress, 'latest'],
      id: 42
    }

    const callback = (e: any, res: any) => {
      e && reject(e)
      const result = res && res.result
      resolve(result && new BigNumber(result).toString(10))
    }

    if (typeof provider.sendAsync === 'function') {
      provider.sendAsync(params, callback)
    } else if (typeof provider.send === 'function') {
      provider.send(params, callback)
    } else {
      resolve(null)
    }
  })
}

export function createModernProviderInterface(provider: any): WalletInterface {
  provider.autoRefreshOnNetworkChange = false

  const onFuncExists = typeof provider.on === 'function'

  return {
    address: onFuncExists
      ? {
          onChange: func => {
            // get the initial value
            getAddress(provider).then(func)
            provider.on('accountsChanged', (accounts: string[]) =>
              func(accounts && accounts[0])
            )
          }
        }
      : {
          get: () => getAddress(provider)
        },
    network: onFuncExists
      ? {
          onChange: (func: (val: string | number) => void) => {
            // get initial value
            getNetwork(provider).then(func)

            // networkChanged event is deprecated in MM, keep for wallets that may not have updated
            provider.on('networkChanged', (netId: string | number) =>
              func(netId && Number(netId))
            )

            // use new chainChanged event for network change
            provider.on('chainChanged', (netId: string | number) =>
              func(netId && Number(netId))
            )
          }
        }
      : { get: () => getNetwork(provider) },
    balance: {
      get: () => getBalance(provider)
    },
    connect: () =>
      new Promise(
        (resolve: () => void, reject: (err: { message: string }) => void) => {
          provider
            .enable()
            .then(resolve)
            .catch(() =>
              reject({
                message: 'This dapp needs access to your account information.'
              })
            )
        }
      ),
    name: getProviderName(provider)
  }
}

export function createLegacyProviderInterface(provider: any): WalletInterface {
  return {
    address: {
      get: () => getAddress(provider)
    },
    network: {
      get: () => getNetwork(provider)
    },
    balance: {
      get: () => getBalance(provider)
    },
    name: getProviderName(provider)
  }
}

export function getProviderName(provider: any): string | undefined {
  if (!provider) return

  if (provider.isTorus) {
    return 'Torus'
  }

  if (provider.isImToken) {
    return 'imToken'
  }

  if (provider.isDapper) {
    return 'Dapper'
  }

  if (provider.isWalletConnect) {
    return 'WalletConnect'
  }

  if (provider.isTrust) {
    return 'Trust'
  }

  if (provider.isCoinbaseWallet) {
    return 'Coinbase'
  }

  if (provider.isToshi) {
    return 'Toshi'
  }

  if (provider.isCipher) {
    return 'Cipher'
  }

  if (provider.isOpera) {
    return 'Opera'
  }

  if (provider.isStatus) {
    return 'Status'
  }

  if (provider.isMetaMask) {
    return 'MetaMask'
  }

  if (provider.host && provider.host.indexOf('localhost') !== -1) {
    return 'localhost'
  }
}

export function getDeviceInfo() {
  const browser = bowser.getParser(window.navigator.userAgent)
  const { name } = browser.getOS()
  const { type } = browser.getPlatform()

  return {
    isMobile: type ? type !== 'desktop' : window.innerWidth < 600,
    os: name
  }
}

export function networkName(id: number): string {
  switch (id) {
    case 1:
      return 'mainnet'
    case 3:
      return 'ropsten'
    case 4:
      return 'rinkeby'
    case 5:
      return 'goerli'
    case 42:
      return 'kovan'
    case 100:
      return 'xdai'
    default:
      return 'local'
  }
}

export function networkToId(network: string): number {
  switch (network) {
    case 'mainnet':
      return 1
    case 'ropsten':
      return 3
    case 'rinkeby':
      return 4
    case 'goerli':
      return 5
    case 'kovan':
      return 42
    case 'xdai':
      return 100
    default:
      return 0
  }
}

export function wait(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export function makeCancelable(promise: any) {
  let rejectFn: any

  const wrappedPromise: any = new Promise((resolve, reject) => {
    rejectFn = reject

    promise.then(resolve).catch(reject)
  })

  wrappedPromise.cancel = () => {
    rejectFn('canceled')
  }

  return wrappedPromise
}

export function isPromise(val: any): val is Promise<any> {
  if ((val as Promise<any>) instanceof Promise) {
    return true
  }
  return false
}

export function createInterval(func: any, interval: number) {
  const id = setInterval(func, interval)
  const status = { active: true }

  return {
    status,
    clear: () => {
      clearInterval(id)
      status.active = false
    }
  }
}

export function openLink(url: string) {
  window.open(url)
}
