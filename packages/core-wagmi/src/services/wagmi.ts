import type {
  Config,
  ConnectReturnType,
  Connector,
  CreateConnectorFn
} from '@wagmi/core'
import { state } from '../store'
import { http, createConfig, createConnector, connect } from '@wagmi/core'
import { type Chain as ViemChain, type Transport, toHex, fromHex, RpcError, UserRejectedRequestError, ResourceUnavailableRpcError } from 'viem'
import {
  ProviderRpcErrorCode,
  type Chain,
  type EIP1193Provider
} from '@web3-onboard/common'
import { chainIdToViemImport } from '../utils'
import {
  addOrSwitchChain,
  getChainId,
  requestAccounts,
  switchChain
} from '../provider'
import EventEmitter from 'eventemitter3'
import { updateChain, updateWagmiConfig } from '../store/actions'
import disconnect from '../disconnect'

export let wagmiConfig: Config | undefined
const wagmiConnectorFn: Record<string, CreateConnectorFn> = {}
const createWalletId = (walletLabel: string): string =>
  walletLabel.replace(/\s/g, '') + 'Id'

export async function createWagmiConfig(
  walletLabel: string,
  provider: EIP1193Provider
): Promise<void> {
  if (!provider || !walletLabel) {
    throw new Error(
      'Provider and wallet label are required to initialize WAGMI'
    )
  }

  const latestWallet = await createWagmiConnector(walletLabel, provider)
  wagmiConnectorFn[createWalletId(walletLabel)] = latestWallet

  const connectors: CreateConnectorFn[] = [...Object.values(wagmiConnectorFn)]

  const transports: Record<ViemChain['id'], Transport> = {}
  console.log(1)
  const { chains } = state.get()
  const viemChains = (await Promise.all(
    chains.map(async (w3OChain: Chain) => {
      const { id } = w3OChain
      transports[fromHex(id as `0x${string}`, 'number')] = http()
      return (await chainIdToViemImport(w3OChain)) as ViemChain
    })
  )) as [ViemChain, ...ViemChain[]]
  console.log(2)

  try {
    wagmiConfig = createConfig({
      chains: [...viemChains],
      transports,
      multiInjectedProviderDiscovery: false,
      connectors
    })
    updateWagmiConfig(wagmiConfig)
    console.log(3)
  } catch (e) {
    console.error(
      `Failed to initialize Web3-Onboard WAGMI instance - Error: ${e}`
    )
  }
}

export async function createWagmiConnector(
  label: string,
  provider: EIP1193Provider
): Promise<CreateConnectorFn> {
  try {
    return createConnector(() => convertW3OToWagmiWallet(label, provider))
  } catch (e) {
    console.error('error creating connector', e)
  }
}

export async function connectWalletToWagmi(
  label: string,
  provider: EIP1193Provider
): Promise<ConnectReturnType<Config>> {
  console.log('connecting wallet to wagmi', label, provider)
  try {
    return await connect(wagmiConfig, {
      connector: convertW3OToWagmiWallet(label, provider)
    })
  } catch (e) {
    console.error('error connecting wallet to wagmi', e)
  }
}

const convertW3OToWagmiWallet = (
  label: string,
  provider: EIP1193Provider
): Connector =>
  ({
    name: label,
    id: createWalletId(label),
    connect: () => {
      try{
        let accounts: `0x${string}`[]
      requestAccounts(provider).then(acc => {
        accounts = acc
        console.log('accounts1', accounts)
        getChainId(provider).then(id => {
          console.log('chainId1', id, fromHex(id as `0x${string}`, 'number'), accounts)
          return {
            chainId: fromHex(id as `0x${string}`, 'number'),
            accounts: accounts as `0x${string}`[]
          }
        })
      })
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
      disconnect({ label })
      delete wagmiConnectorFn[createWalletId(label)]
      return provider.disconnect()
    },
    getAccounts: () =>
      requestAccounts(provider).then(acc => {
        return acc
      }),
    getChainId: () =>
      getChainId(provider).then(chainId => {
        console.log('chainId', chainId)
        return fromHex(chainId as `0x${string}`, 'number')
      }),
    getProvider: () => Promise.resolve(provider),
    isAuthorized: () =>
      requestAccounts(provider).then(accounts => {
        return !!accounts.length
      }),
    switchChain: ({ chainId }: { chainId: number }) => {
      const hexChainId = toHex(chainId)
      try {
        switchChain(provider, hexChainId).then(() => {
          return chainId
        })
      } catch (error) {
        const { code } = error as { code: number }
        if (
          code === ProviderRpcErrorCode.CHAIN_NOT_ADDED ||
          code === ProviderRpcErrorCode.UNRECOGNIZED_CHAIN_ID
        ) {
          const { chains } = state.get()

          // chain has not been added to wallet
          const targetChain = chains.find(({ id }) => id === hexChainId)
          updateChain(targetChain)

          // add chain to wallet
          addOrSwitchChain(provider, targetChain).then(id => {
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
      switchChain(provider, toHex(chainId))
    },
    onDisconnect: () => {
      disconnect({ label })
      delete wagmiConnectorFn[createWalletId(label)]
    },
    emitter: new EventEmitter()
  } as unknown as Connector)
