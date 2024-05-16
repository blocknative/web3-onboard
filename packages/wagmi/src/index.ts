import type {
  Config,
  ConnectReturnType,
  Connector,
  CreateConnectorFn
} from '@wagmi/core'
import type { WagmiInitOptions, WagmiModuleAPI } from 'types'
import { createConfig, createConnector } from '@wagmi/core'
import { createWagmiChains, createWalletId } from './utils'
import { connect as wagmiConnect } from '@wagmi/core'
import { validateWagmiInit } from './validation'
import EventEmitter from 'eventemitter3'
import {
  type Chain as ViemChain,
  type Transport,
  toHex,
  fromHex,
  RpcError,
  UserRejectedRequestError,
  ResourceUnavailableRpcError
} from 'viem'
import {
  ProviderRpcErrorCode,
  type Chain,
  type EIP1193Provider
} from '@web3-onboard/common'

export type {
  Config,
  ConnectReturnType,
  Connector,
  CreateConnectorFn,
  WagmiInitOptions,
  WagmiModuleAPI
}

const wagmiConnectorFn: Record<string, CreateConnectorFn> = {}
const transports: Record<ViemChain['id'], Transport> = {}
let chainsList: Chain[] | undefined
let wagmiConfig: Config | undefined
let providerMethods: WagmiInitOptions | undefined

function wagmiInit(initOptions: WagmiInitOptions): WagmiModuleAPI {
  if (initOptions) {
    const error = validateWagmiInit(initOptions)

    if (error) {
      throw error
    }
  }
  providerMethods = initOptions

  return {
    buildWagmiConfig,
    createWagmiConnector,
    connectWalletToWagmi,
    wagmiConnect
  }
}

async function buildWagmiConfig(
  chains?: Chain[],
  wallet?: {
    label: string
    provider: EIP1193Provider
  }
): Promise<Config> {
  if (wallet && (!wallet.provider || !wallet.label)) {
    throw new Error(
      'Provider and wallet label are required to initialize WAGMI with a new connector'
    )
  }
  chainsList = chains ?? chainsList
  try {
    if (wallet) {
      const { label, provider } = wallet
      const latestWallet = await createWagmiConnector(label, provider)
      wagmiConnectorFn[createWalletId(label)] = latestWallet
    }
    const connectors: CreateConnectorFn[] = [...Object.values(wagmiConnectorFn)]
    const viemChains = await createWagmiChains(chainsList, transports)

    wagmiConfig = createConfig({
      chains: [...viemChains],
      transports,
      multiInjectedProviderDiscovery: false,
      connectors
    })
    return wagmiConfig
  } catch (e) {
    console.error(
      `Failed to initialize Web3-Onboard WAGMI instance - Error: ${e}`
    )
  }
}

async function createWagmiConnector(
  label: string,
  provider: EIP1193Provider
): Promise<CreateConnectorFn> {
  try {
    return createConnector(() => convertW3OToWagmiWallet(label, provider))
  } catch (e) {
    console.error('error creating connector', e)
  }
}

async function connectWalletToWagmi(
  label: string,
  provider: EIP1193Provider
): Promise<ConnectReturnType<Config>> {
  try {
    return await wagmiConnect(wagmiConfig, {
      connector: convertW3OToWagmiWallet(label, provider)
    })
  } catch (e) {
    console.error('error connecting wallet to wagmi', e)
  }
}

async function disconnectWagmiWallet(label: string): Promise<void> {
  try {
    delete wagmiConnectorFn[createWalletId(label)]
    buildWagmiConfig()
  } catch (e) {
    console.error('error disconnecting wallet from wagmi', e)
  }
}

const convertW3OToWagmiWallet = (
  label: string,
  provider: EIP1193Provider
): Connector => {
  if (!providerMethods) {
    console.error('Required provider methods not defined for Wagmi Module API')
  }
  return {
    name: label,
    id: createWalletId(label),
    connect: ({ chainId }: { chainId: number }) => {
      try {
        return Promise.resolve(
          providerMethods.requestAccounts(provider).then(accounts => {
            const acc = accounts as `0x${string}`[]
            if (chainId) {
              return {
                chainId,
                accounts: acc
              }
            }

            return providerMethods.getChainId(provider).then(id => {
              return {
                chainId: fromHex(id as `0x${string}`, 'number'),
                accounts: acc
              }
            })
          })
        )
      } catch (err) {
        const error = err as RpcError
        if (error.code === UserRejectedRequestError.code)
          throw new UserRejectedRequestError(error)
        if (error.code === ResourceUnavailableRpcError.code)
          throw new ResourceUnavailableRpcError(error)
        throw error
      }
    },
    disconnect: () => {
      disconnectWagmiWallet(label)
      providerMethods.disconnect({ label })
    },
    getAccounts: () =>
      providerMethods.requestAccounts(provider).then(acc => {
        return acc
      }),
    getChainId: () =>
      providerMethods.getChainId(provider).then(chainId => {
        return fromHex(chainId as `0x${string}`, 'number')
      }),
    getProvider: () => Promise.resolve(provider),
    isAuthorized: () =>
      providerMethods.requestAccounts(provider).then(accounts => {
        return !!accounts.length
      }),
    switchChain: ({ chainId }: { chainId: number }) => {
      const hexChainId = toHex(chainId)
      try {
        providerMethods.switchChain(provider, hexChainId).then(() => {
          return chainId
        })
      } catch (error) {
        const { code } = error as { code: number }
        if (
          code === ProviderRpcErrorCode.CHAIN_NOT_ADDED ||
          code === ProviderRpcErrorCode.UNRECOGNIZED_CHAIN_ID
        ) {
          // chain has not been added to wallet
          const targetChain = chainsList.find(({ id }) => id === hexChainId)
          providerMethods.updateChain(targetChain)

          // add chain to wallet
          providerMethods.addOrSwitchChain(provider, targetChain).then(id => {
            return fromHex(id as `0x${string}`, 'number')
          })
        }
      }
    },

    onAccountsChanged: (accounts: string[]) => {
      // Disconnect if there are no accounts
      if (accounts.length === 0) provider.disconnect()
    },
    onChainChanged: (chainId: number) => {
      providerMethods.switchChain(provider, toHex(chainId))
    },
    onDisconnect: () => {
      disconnectWagmiWallet(label)
      providerMethods.disconnect({ label })
    },
    emitter: new EventEmitter()
  } as unknown as Connector
}

export default wagmiInit
