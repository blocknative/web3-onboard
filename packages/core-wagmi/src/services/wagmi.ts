import type {
  Config,
  ConnectReturnType,
  Connector,
  CreateConnectorFn
} from '@wagmi/core'
import { state } from '../store'
import { http, createConfig, createConnector, connect } from '@wagmi/core'
import { type Chain as ViemChain, type Transport } from 'viem'
import type { Chain, EIP1193Provider, WalletModule } from '@web3-onboard/common'
import { chainIdToViemImport } from '../utils'
import { addOrSwitchChain, getChainId, requestAccounts } from '../provider'
import EventEmitter from 'eventemitter3'
import { updateWagmiConfig } from '../store/actions'

export let wagmiConfig: Config | undefined

export async function initializeWAGMI(
  walletModules: WalletModule[]
): Promise<void> {
  const { chains, appMetadata } = state.get()
  const connectors = await walletModules.reduce(async (acc, wallet) => {
    const result = await acc
    const { label, getInterface } = wallet
    try {
      console.log(label, wallet)
      const provider = await getInterface({
        chains,
        EventEmitter,
        appMetadata
      })
      if (provider) {
        console.log(label, provider)
        const wagmiConnector = await createWagmiConnector(
          label,
          provider.provider
        )
        result.push(wagmiConnector)
      }
    } catch (e) {
      console.warn(`Error creating wagmi connector for wallet: ${wallet.label} 
      - Wallet may not be installed or available to the browser. Error: ${e}`)
    }
    return result
  }, Promise.resolve([]))

  const transports: Record<ViemChain['id'], Transport> = {}

  const viemChains = (await Promise.all(
    chains.map(async (w3OChain: Chain) => {
      const { id } = w3OChain
      transports[parseInt(id, 16)] = http()
      return (await chainIdToViemImport(w3OChain)) as ViemChain
    })
  )) as [ViemChain, ...ViemChain[]]

  try {
    wagmiConfig = createConfig({
      chains: [...viemChains],
      transports,
      multiInjectedProviderDiscovery: false,
      connectors: await Promise.all(connectors) // Await the connectors array
    })
    updateWagmiConfig(wagmiConfig)
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
    return createConnector(() =>
        ({
          name: label,
          id: label.split(' ').join(),
          connect: () =>
            Promise.all([requestAccounts(provider), getChainId(provider)]).then(
              ([accounts, chainId]) => {
                return {
                  chainId: parseInt(chainId, 16),
                  accounts: accounts as `0x${string}`[]
                }
              }
            ),
          disconnect: () => Promise.resolve(provider.disconnect()),
          getAccounts: () =>
            requestAccounts(provider).then(acc => {
              return acc
            }),
          getChainId: () =>
            getChainId(provider).then(chainId => {
              console.log('chainId', chainId)
              return parseInt(chainId, 16)
            }),
          getProvider: () => Promise.resolve(provider),
          isAuthorized: () =>
            requestAccounts(provider).then(accounts => {
              console.log('accounts', accounts)
              return !!accounts.length
            }),
          switchChain: ({ chainId }: { chainId: number }) => {
            try {
              return addOrSwitchChain(provider, chainId.toString(16)).then(
                id => {
                  getChainId(provider).then(chainId => {
                    console.log('chainId', chainId)
                    return parseInt(chainId, 16)
                  })
                }
              )
            } catch (error) {
              console.log('error switching chain', error)
            }
          },

          onAccountsChanged: (accounts: string[]) => {
            // Disconnect if there are no accounts
            if (accounts.length === 0) provider.disconnect()
          },
          onChainChanged: () => {},
          onDisconnect: () => {},
          emitter: new EventEmitter()
        } as unknown as Connector)
    )
  } catch (e) {
    console.error('error creating connector', e)
  }
}

export async function connectWalletToWagmi(
  label: string,
  provider: EIP1193Provider
): Promise<ConnectReturnType<Config>> {
  try {
    return await connect(wagmiConfig, {
      connector: {
        name: label,
        id: label.split(' ').join(),
        connect: () =>
          Promise.all([requestAccounts(provider), getChainId(provider)]).then(
            ([accounts, chainId]) => {
              return {
                chainId: parseInt(chainId, 16),
                accounts: accounts as `0x${string}`[]
              }
            }
          ),
        disconnect: () => Promise.resolve(provider.disconnect()),
        getAccounts: () =>
          requestAccounts(provider).then(acc => {
            return acc
          }),
        getChainId: () =>
          getChainId(provider).then(chainId => {
            console.log('chainId', chainId)
            return parseInt(chainId, 16)
          }),
        getProvider: () => Promise.resolve(provider),
        isAuthorized: () =>
          requestAccounts(provider).then(accounts => {
            console.log('accounts', accounts)
            return !!accounts.length
          }),
        switchChain: ({ chainId }: { chainId: number }) => {
          try {
            return addOrSwitchChain(provider, chainId.toString(16)).then(id => {
              getChainId(provider).then(chainId => {
                console.log('chainId', chainId)
                return parseInt(chainId, 16)
              })
            })
          } catch (error) {
            console.log('error switching chain', error)
          }
        },

        onAccountsChanged: (accounts: string[]) => {
          // Disconnect if there are no accounts
          if (accounts.length === 0) provider.disconnect()
        },
        onChainChanged: () => {},
        onDisconnect: () => {},
        emitter: new EventEmitter()
      } as unknown as Connector
    })
  } catch (e) {
    console.error('error connecting wallet to wagmi', e)
  }
}
