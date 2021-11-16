import {
  CustomWindow,
  EIP1193Provider,
  InjectedWalletModule,
  InjectedNameSpace
} from '@bn-onboard/types'

import { ProviderIdentityFlag, ProviderLabel } from '@bn-onboard/types'
import { createEIP1193Provider } from '@bn-onboard/common'

declare const window: CustomWindow

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
      wallet_switchEthereumChain: null
    })

    provider.off = (event, func) => {}

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
    provider.addListener = (event, func) => {
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
    !!provider?.[ProviderIdentityFlag.Trust],
  getIcon: async () => (await import('./icons/trust')).default,
  getInterface: async () => ({
    provider: window.ethereum as EIP1193Provider
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
  getInterface: async () => ({
    provider: window.ethereum
  }),
  platforms: ['mobile']
}

const alphawallet: InjectedWalletModule = {
  label: ProviderLabel.AlphaWallet,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.AlphaWallet],
  getIcon: async () => (await import('./icons/alphawallet')).default,
  getInterface: async () => ({
    provider: window.ethereum
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
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.Bitpie],
  getIcon: async () => (await import('./icons/bitpie')).default,
  getInterface: async () => ({
    provider: window.ethereum
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
    provider: window.ethereum
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
    provider: window.ethereum
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
    provider: window.ethereum
  }),
  platforms: ['mobile']
}

const hyperpay: InjectedWalletModule = {
  label: ProviderLabel.HyperPay,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.HyperPay],
  getIcon: async () => (await import('./icons/hyperpay')).default,
  getInterface: async () => ({
    provider: window.ethereum
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
    provider: window.ethereum
  }),
  platforms: ['mobile']
}

const liquality: InjectedWalletModule = {
  label: ProviderLabel.Liquality,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.Liquality],
  getIcon: async () => (await import('./icons/liquality')).default,
  getInterface: async () => ({
    provider: window.ethereum
  }),
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
  getInterface: async () => ({
    provider: window.ethereum
  }),
  platforms: ['mobile']
}

const tokenpocket: InjectedWalletModule = {
  label: ProviderLabel.TokenPocket,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.TokenPocket],
  getIcon: async () => (await import('./icons/tokenpocket')).default,
  getInterface: async () => ({
    provider: window.ethereum
  }),
  platforms: ['all']
}

const tp: InjectedWalletModule = {
  label: ProviderLabel.TP,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.TP],
  getIcon: async () => (await import('./icons/tp')).default,
  getInterface: async () => ({
    provider: window.ethereum
  }),
  platforms: ['mobile']
}

const walletio: InjectedWalletModule = {
  label: ProviderLabel.WalletIo,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.WalletIo],
  getIcon: async () => (await import('./icons/walletio')).default,
  getInterface: async () => ({
    provider: window.ethereum
  }),
  platforms: ['mobile']
}

const xdefi: InjectedWalletModule = {
  label: ProviderLabel.XDEFI,
  injectedNamespace: InjectedNameSpace.Ethereum,
  checkProviderIdentity: ({ provider }) =>
    !!provider?.[ProviderIdentityFlag.XDEFI],
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
  walletio,
  xdefi
]

export default wallets
