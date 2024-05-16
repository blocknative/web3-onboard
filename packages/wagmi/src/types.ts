import { Config, ConnectReturnType, CreateConnectorFn } from '@wagmi/core'
import { Chain, EIP1193Provider, ProviderAccounts } from '@web3-onboard/common'
import type { ConnectParameters, connect as wagmiConnect } from '@wagmi/core'

export type WagmiInitOptions = {
  requestAccounts: (provider: EIP1193Provider) => Promise<ProviderAccounts>
  getChainId: (provider: EIP1193Provider) => Promise<string>
  disconnect: (options: { label: string }) => void
  switchChain: (
    provider: EIP1193Provider,
    hexChainId: string
  ) => Promise<number>
  updateChain: (chain: Chain) => void
  addOrSwitchChain: (provider: EIP1193Provider, chain: Chain) => Promise<string>
}

export type WagmiModuleAPI = {
  buildWagmiConfig: (
    chains: Chain[],
    walletData?: {
      label: string
      provider: EIP1193Provider
    }
  ) => Promise<Config>
  createWagmiConnector: (
    label: string,
    provider: EIP1193Provider
  ) => Promise<CreateConnectorFn>
  connectWalletToWagmi: (
    label: string,
    provider: EIP1193Provider
  ) => Promise<ConnectReturnType<Config>>
  wagmiConnect: (
    config: Config,
    parameters: ConnectParameters<Config>
  ) => Promise<ConnectReturnType<Config>>
}
