export as namespace onboard

interface onboardApi {
  walletSelect: (autoSelectWallet?: string) => any
  walletReady: () => any
  config: configOptions
  getState: () => any
}

interface configOptions {
  darkMode: boolean
}

interface selectDefaultsOptions {
  heading?: string
  description?: string
  networkId: number
  fortmaticInit?: any
  portisInit?: any
  walletConnectInit?: any
}

interface select {
  defaults: (options: selectDefaultsOptions) => any
  metamask: () => any
  dapper: () => any
  walletConnect: (options: { infuraKey: string }) => any
  coinbase: () => any
  trust: () => any
  portis: (options: { apiKey: string; network: string }) => any
  fortmatic: (options: { apiKey: string; network: string }) => any
}

interface ready {
  defaults: (options: { networkId: number; minimumBalance: string }) => any
  connect: () => any
  network: (correctNetwork: number) => any
  balance: (minimumBalance: string) => any
}

export function init(initialization: initializationObject): onboardApi

export namespace modules {
  let select: select
  let ready: ready
}

interface wallet {
  provider: any
  name: string
}

interface subscriptions {
  address: (address: string) => void
  network: (network: number) => void
  balance: (balance: string) => void
  wallet: (wallet: wallet) => void
}

interface modulesInit {
  walletSelect: any
  walletReady: any
}

interface initializationObject {
  networkId: number
  dappId: string
  subscriptions?: subscriptions
  modules: modulesInit
}
