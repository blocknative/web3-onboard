import {
  CustomWindow,
  EIP1193Provider,
  InjectedWalletModule,
  InjectedNameSpace
} from '@bn-onboard/types'

import { ProviderIdentityFlag, ProviderLabel } from '@bn-onboard/types'
import { createEIP1193Provider } from '@bn-onboard/common'

declare const window: CustomWindow

const UNSUPPORTED_METHOD = null

const metamask: InjectedWalletModule = {
  label: ProviderLabel.MetaMask,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.MetaMask],
  getIcon: async () => (await import('./icons/metamask')).default,
  getInterface: async () => ({
    provider: window.ethereum as EIP1193Provider
  }),
  platforms: ['all']
}

const brave: InjectedWalletModule = {
  label: ProviderLabel.Brave,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!(navigator as any).brave && !!provider?._web3Ref,
  getIcon: async () => (await import('./icons/brave')).default,
  getInterface: async () => {
    const provider = window.ethereum
    provider.removeListener = (event, listener) => {}
    return {
      provider
    }
  },
  platforms: ['all']
}

const binance: InjectedWalletModule = {
  label: ProviderLabel.Binance,
  injectedNamespace: InjectedNameSpace.Binance,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.Binance],
  getIcon: async () => (await import('./icons/binance')).default,
  getInterface: async () => {
    // We add this to the BinanceChain provider as there is currently
    // no way to determine if the wallet is unlocked
    if (window?.BinanceChain) {
      window.BinanceChain.isUnlocked = false
    }

    const provider = createEIP1193Provider(window.BinanceChain, {
      // If the wallet is unlocked then we don't need to patch this request
      ...(!window.BinanceChain.isUnlocked && {
        eth_accounts: () => Promise.resolve([])
      }),
      eth_requestAccounts: request =>
        request({ method: 'eth_requestAccounts' }).then(accts => {
          window.BinanceChain.isUnlocked = true
          return accts
        }),
      eth_chainId: request =>
        request({ method: 'eth_chainId' }).then(
          id => `0x${parseInt(id).toString(16)}`
        ),
      // Unsupported method -- will throw error
      wallet_switchEthereumChain: UNSUPPORTED_METHOD
    })

    provider.removeListener = (event, func) => {}

    return {
      provider
    }
  },
  platforms: ['desktop']
}

const coinbase: InjectedWalletModule = {
  label: ProviderLabel.Coinbase,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.Coinbase],
  getIcon: async () => (await import('./icons/coinbase')).default,
  getInterface: async () => {
    const provider = window.ethereum as EIP1193Provider
    const addListener = provider.on.bind(provider)
    provider.on = (event, func) => {
      if (event === 'chainChanged') {
        addListener(event, chainId => {
          // @ts-ignore
          func(`0x${parseInt(chainId).toString(16)}`)
        })
      }
    }

    return { provider }
  },
  platforms: ['all']
}

const detected: InjectedWalletModule = {
  label: ProviderLabel.Detected,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.Detected],
  getIcon: async () => (await import('./icons/detected')).default,
  getInterface: async () => ({
    provider: window.ethereum as EIP1193Provider
  }),
  platforms: ['all']
}

const trust: InjectedWalletModule = {
  label: ProviderLabel.Trust,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.Trust] &&
    !provider?.[ProviderIdentityFlag.TokenPocket],

  getIcon: async () => (await import('./icons/trust')).default,
  getInterface: async () => ({
    provider: createEIP1193Provider(window.ethereum, {
      wallet_switchEthereumChain: UNSUPPORTED_METHOD
    })
  }),
  platforms: ['mobile']
}

const opera: InjectedWalletModule = {
  label: ProviderLabel.Opera,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ device }) => device.browser.name === 'Opera',
  getIcon: async () => (await import('./icons/opera')).default,
  getInterface: async () => ({
    provider: createEIP1193Provider(window.ethereum, {
      eth_requestAccounts: async request => request({ method: 'eth_accounts' })
    })
  }),
  platforms: ['all']
}

const status: InjectedWalletModule = {
  label: ProviderLabel.Status,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.Status],
  getIcon: async () => (await import('./icons/status')).default,
  getInterface: async () => {
    const provider = window.ethereum

    return {
      provider
    }
  },
  platforms: ['mobile']
}

const alphawallet: InjectedWalletModule = {
  label: ProviderLabel.AlphaWallet,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.AlphaWallet],
  getIcon: async () => (await import('./icons/alphawallet')).default,
  getInterface: async () => ({
    provider: createEIP1193Provider(window.ethereum, {
      wallet_switchEthereumChain: UNSUPPORTED_METHOD
    })
  }),
  platforms: ['mobile']
}

const atoken: InjectedWalletModule = {
  label: ProviderLabel.AToken,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.AToken],
  getIcon: async () => (await import('./icons/atoken')).default,
  getInterface: async () => ({
    provider: window.ethereum
  }),
  platforms: ['mobile']
}

const bitpie: InjectedWalletModule = {
  label: ProviderLabel.Bitpie,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: () => !!(window as any).Bitpie,
  getIcon: async () => (await import('./icons/bitpie')).default,
  getInterface: async () => ({
    provider: createEIP1193Provider(window.ethereum, {
      wallet_switchEthereumChain: UNSUPPORTED_METHOD
    })
  }),
  platforms: ['mobile']
}

const blankwallet: InjectedWalletModule = {
  label: ProviderLabel.BlankWallet,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.BlankWallet],
  getIcon: async () => (await import('./icons/blankwallet')).default,
  getInterface: async () => ({
    provider: createEIP1193Provider(window.ethereum, {
      wallet_switchEthereumChain: UNSUPPORTED_METHOD
    })
  }),
  platforms: ['desktop']
}

const dcent: InjectedWalletModule = {
  label: ProviderLabel.Dcent,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.Dcent],
  getIcon: async () => (await import('./icons/dcent')).default,
  getInterface: async () => ({
    provider: createEIP1193Provider(window.ethereum, {
      wallet_switchEthereumChain: UNSUPPORTED_METHOD
    })
  }),
  platforms: ['mobile']
}

const frame: InjectedWalletModule = {
  label: ProviderLabel.Frame,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.Frame],
  getIcon: async () => (await import('./icons/frame')).default,
  getInterface: async () => ({
    provider: window.ethereum
  }),
  platforms: ['desktop']
}

const huobiwallet: InjectedWalletModule = {
  label: ProviderLabel.HuobiWallet,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.HuobiWallet],
  getIcon: async () => (await import('./icons/huobiwallet')).default,
  getInterface: async () => ({
    provider: createEIP1193Provider(window.ethereum, {
      wallet_switchEthereumChain: UNSUPPORTED_METHOD
    })
  }),
  platforms: ['mobile']
}

const hyperpay: InjectedWalletModule = {
  label: ProviderLabel.HyperPay,
  injectedNamespace: InjectedNameSpace.Ethereum,
  // Note: The property `hiWallet` is as of now the only known way of identifying hyperpay
  // wallet as it is a direct clone of metamask. `checkProviderIdentity` implementation is subject to
  // future changes
  checkProviderIdentity: () => !!(window as any).hiWallet,
  getIcon: async () => (await import('./icons/hyperpay')).default,
  getInterface: async () => ({
    provider: createEIP1193Provider(window.ethereum, {
      wallet_switchEthereumChain: UNSUPPORTED_METHOD
    })
  }),
  platforms: ['mobile']
}

const imtoken: InjectedWalletModule = {
  label: ProviderLabel.ImToken,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.ImToken],
  getIcon: async () => (await import('./icons/imtoken')).default,
  getInterface: async () => ({
    provider: createEIP1193Provider(window.ethereum, {
      wallet_switchEthereumChain: UNSUPPORTED_METHOD
    })
  }),
  platforms: ['mobile']
}

const liquality: InjectedWalletModule = {
  label: ProviderLabel.Liquality,
  injectedNamespace: InjectedNameSpace.Arbitrum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.Liquality],
  getIcon: async () => (await import('./icons/liquality')).default,
  getInterface: async () => {
    const provider = window[InjectedNameSpace.Arbitrum]
    provider.removeListener = (event, func) => {}
    return { provider }
  },
  platforms: ['desktop']
}

const meetone: InjectedWalletModule = {
  label: ProviderLabel.MeetOne,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    provider?.[ProviderIdentityFlag.MeetOne] === 'MEETONE',
  getIcon: async () => (await import('./icons/meetone')).default,
  getInterface: async () => ({
    provider: window.ethereum
  }),
  platforms: ['mobile']
}

const mykey: InjectedWalletModule = {
  label: ProviderLabel.MyKey,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.MyKey],
  getIcon: async () => (await import('./icons/mykey')).default,
  getInterface: async () => ({
    provider: window.ethereum
  }),
  platforms: ['mobile']
}

const ownbit: InjectedWalletModule = {
  label: ProviderLabel.OwnBit,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.OwnBit],
  getIcon: async () => (await import('./icons/ownbit')).default,
  getInterface: async () => {
    const provider = createEIP1193Provider(window.ethereum, {
      eth_chainId: request =>
        request({ method: 'eth_chainId' }).then(
          id => `0x${parseInt(id).toString(16)}`
        ),
      wallet_switchEthereumChain: UNSUPPORTED_METHOD
    })
    provider.removeListener = (event, listener) => {}
    provider.on = (event, listener) => {}
    return { provider }
  },
  platforms: ['mobile']
}

const tokenpocket: InjectedWalletModule = {
  label: ProviderLabel.TokenPocket,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.TokenPocket] &&
    !provider?.[ProviderIdentityFlag.TP],
  getIcon: async () => (await import('./icons/tokenpocket')).default,
  getInterface: async ({ EventEmitter }) => {
    const emitter = new EventEmitter()

    const provider = createEIP1193Provider(window.ethereum, {
      wallet_switchEthereumChain: (request, params) => {
        emitter.emit('chainChanged', params?.[0]?.chainId)
        return request({
          method: 'wallet_switchEthereumChain',
          params
        })
      }
    })

    provider.on = emitter.on.bind(emitter)

    return {
      provider
    }
  },
  platforms: ['all']
}

const tp: InjectedWalletModule = {
  label: ProviderLabel.TP,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.TP],
  getIcon: async () => (await import('./icons/tp')).default,
  getInterface: async () => ({
    provider: createEIP1193Provider(window.ethereum, {
      wallet_switchEthereumChain: UNSUPPORTED_METHOD
    })
  }),
  platforms: ['mobile']
}

const xdefi: InjectedWalletModule = {
  label: ProviderLabel.XDEFI,
  injectedNamespace: InjectedNameSpace.XFI,
  checkProviderIdentity: ({ provider }) =>
    provider?.ethereum?.[ProviderIdentityFlag.XDEFI],
  getIcon: async () => (await import('./icons/xdefi')).default,
  getInterface: async () => ({
    provider: (window as any)?.xfi?.ethereum
  }),
  platforms: ['all']
}

const wallets = [
  metamask,
  binance,
  coinbase,
  detected,
  trust,
  opera,
  status,
  alphawallet,
  atoken,
  bitpie,
  blankwallet,
  brave,
  dcent,
  frame,
  huobiwallet,
  hyperpay,
  imtoken,
  liquality,
  meetone,
  mykey,
  ownbit,
  tokenpocket,
  tp,
  xdefi
]

export default wallets
