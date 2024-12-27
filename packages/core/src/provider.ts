import { fromEventPattern, type Observable } from 'rxjs'
import { filter, takeUntil, take, share, switchMap } from 'rxjs/operators'
import partition from 'lodash.partition'
import { isAddress, weiHexToEth } from '@web3-onboard/common'
import { disconnectWallet$ } from './streams.js'
import { updateAccount, updateWallet } from './store/actions.js'
import { chainIdToViemENSImport, validEnsChain } from './utils.js'
import disconnect from './disconnect.js'
import { state } from './store/index.js'
import { configuration } from './configuration.js'
import { updateSecondaryTokens } from './update-balances'

import type { Uns } from '@web3-onboard/unstoppable-resolution'
import {
  type PublicClient,
  type GetEnsTextReturnType,
  isHex,
  toHex
} from 'viem'
import type {
  Address,
  ChainId,
  EIP1102Request,
  EIP1193Provider,
  ProviderAccounts,
  Chain,
  AccountsListener,
  ChainListener,
  SelectAccountsRequest
} from '@web3-onboard/common'

import type {
  Account,
  Balances,
  Ens,
  WalletPermission,
  WalletState
} from './types.js'

export const viemProviders: {
  [key: string]: PublicClient
} = {}

async function getProvider(chain: Chain): Promise<PublicClient | null> {
  if (!chain) return null

  if (!viemProviders[chain.rpcUrl as string]) {
    const viemChain = await chainIdToViemENSImport(chain.id)
    if (!viemChain) return null

    const { createPublicClient, http } = await import('viem')
    const publicProvider = createPublicClient({
      chain: viemChain,
      transport: http()
    })
    viemProviders[chain.rpcUrl as string] = publicProvider as PublicClient
  }

  return viemProviders[chain.rpcUrl as string]
}

export function requestAccounts(
  provider: EIP1193Provider
): Promise<ProviderAccounts> {
  const args = { method: 'eth_requestAccounts' } as EIP1102Request
  return provider.request(args)
}

export function selectAccounts(
  provider: EIP1193Provider
): Promise<ProviderAccounts> {
  const args = { method: 'eth_selectAccounts' } as SelectAccountsRequest
  return provider.request(args)
}

export function getChainId(provider: EIP1193Provider): Promise<string> {
  return provider.request({ method: 'eth_chainId' }) as Promise<string>
}

export function listenAccountsChanged(args: {
  provider: EIP1193Provider
  disconnected$: Observable<string>
}): Observable<ProviderAccounts> {
  const { provider, disconnected$ } = args

  const addHandler = (handler: AccountsListener) => {
    provider.on('accountsChanged', handler)
  }

  const removeHandler = (handler: AccountsListener) => {
    provider.removeListener('accountsChanged', handler)
  }

  return fromEventPattern<ProviderAccounts>(addHandler, removeHandler).pipe(
    takeUntil(disconnected$)
  )
}

export function listenChainChanged(args: {
  provider: EIP1193Provider
  disconnected$: Observable<string>
}): Observable<ChainId> {
  const { provider, disconnected$ } = args
  const addHandler = (handler: ChainListener) => {
    provider.on('chainChanged', handler)
  }

  const removeHandler = (handler: ChainListener) => {
    provider.removeListener('chainChanged', handler)
  }

  return fromEventPattern<ChainId>(addHandler, removeHandler).pipe(
    takeUntil(disconnected$)
  )
}

export function trackWallet(
  provider: EIP1193Provider,
  label: WalletState['label']
): void {
  const disconnected$ = disconnectWallet$.pipe(
    filter(wallet => wallet === label),
    take(1)
  )

  const accountsChanged$ = listenAccountsChanged({
    provider,
    disconnected$
  }).pipe(share())

  // when account changed, set it to first account and subscribe to events
  accountsChanged$.subscribe(async ([address]) => {
    // sync accounts with internal state
    // in the case of an account has been manually disconnected
    try {
      await syncWalletConnectedAccounts(label)
    } catch (error) {
      console.warn(
        'Web3Onboard: Error whilst trying to sync connected accounts:',
        error
      )
    }

    // no address, then no account connected, so disconnect wallet
    // this could happen if user locks wallet,
    // or if disconnects app from wallet
    if (!address) {
      disconnect({ label })
      return
    }

    const { wallets } = state.get()
    const wallet = wallets.find(wallet => wallet.label === label)
    const accounts = wallet ? wallet.accounts : []

    const [[existingAccount], restAccounts] = partition(
      accounts,
      account => account.address === address
    )

    // update accounts without ens/uns and balance first
    updateWallet(label, {
      accounts: [
        existingAccount || {
          address: address as Address,
          ens: null,
          uns: null,
          balance: null
        },
        ...restAccounts
      ]
    })
  })

  // also when accounts change, update Balance and ENS/UNS
  accountsChanged$
    .pipe(
      switchMap(async ([address]) => {
        if (!address) return

        const { wallets, chains } = state.get()

        const primaryWallet = wallets.find(wallet => wallet.label === label)
        if (!primaryWallet) return // Add null check for primaryWallet

        const { chains: walletChains, accounts } = primaryWallet

        const [connectedWalletChain] = walletChains

        const chain = chains.find(
          ({ namespace, id }) =>
            namespace === 'evm' && id === connectedWalletChain.id
        )
        if (!chain) return

        const balanceProm = getBalance(address, chain)
        const secondaryTokenBal = updateSecondaryTokens(address, chain)
        const account = accounts.find(account => account.address === address)

        const ensChain = chains.find(
          ({ id }) => id === validEnsChain(connectedWalletChain.id)
        )

        const ensProm =
          account && account.ens
            ? Promise.resolve(account.ens)
            : ensChain
            ? getEns(address, ensChain)
            : Promise.resolve(null)

        const unsProm =
          account && account.uns
            ? Promise.resolve(account.uns)
            : ensChain
            ? getUns(address, ensChain)
            : Promise.resolve(null)

        return Promise.all([
          Promise.resolve(address),
          balanceProm,
          ensProm,
          unsProm,
          secondaryTokenBal
        ])
      })
    )
    .subscribe(res => {
      if (!res) return
      const [address, balance, ens, uns, secondaryTokens] = res
      updateAccount(label, address, { balance, ens, uns, secondaryTokens })
    })

  const chainChanged$ = listenChainChanged({ provider, disconnected$ }).pipe(
    share()
  )

  // Update chain on wallet when chainId changed
  chainChanged$.subscribe(async chainId => {
    const { wallets } = state.get()
    const wallet = wallets.find(wallet => wallet.label === label)
    if (!wallet) return // Add null check for wallet
    const { chains, accounts } = wallet
    const [connectedWalletChain] = chains
    if (!isHex(chainId)) {
      chainId = toHex(chainId)
    }
    if (chainId === connectedWalletChain.id) return

    const resetAccounts = accounts.map(
      ({ address }) =>
        ({
          address,
          ens: null,
          uns: null,
          balance: null
        } as Account)
    )

    updateWallet(label, {
      chains: [{ namespace: 'evm', id: chainId }],
      accounts: resetAccounts
    })
  })

  // when chain changes get ens/uns and balance for each account for wallet
  chainChanged$
    .pipe(
      switchMap(async chainId => {
        const { wallets, chains } = state.get()
        const primaryWallet = wallets.find(wallet => wallet.label === label)
        const accounts = primaryWallet?.accounts || []
        if (!isHex(chainId)) {
          chainId = toHex(chainId)
        }
        const chain = chains.find(
          ({ namespace, id }) => namespace === 'evm' && id === chainId
        )
        if (!chain) return Promise.resolve(null)

        return Promise.all(
          accounts.map(async ({ address }) => {
            const balanceProm = getBalance(address, chain)

            const secondaryTokenBal = updateSecondaryTokens(address, chain)
            const ensChain = chains.find(
              ({ id }) => id === validEnsChain(chainId)
            )

            const ensProm = ensChain
              ? getEns(address, ensChain)
              : Promise.resolve(null)

            const unsProm = ensChain
              ? getUns(address, ensChain)
              : Promise.resolve(null)

            const [balance, ens, uns, secondaryTokens] = await Promise.all([
              balanceProm,
              ensProm,
              unsProm,
              secondaryTokenBal
            ])

            return {
              address,
              balance,
              ens,
              uns,
              secondaryTokens
            }
          })
        )
      })
    )
    .subscribe(updatedAccounts => {
      updatedAccounts && updateWallet(label, { accounts: updatedAccounts })
    })

  disconnected$.subscribe(() => {
    provider.disconnect && provider.disconnect()
  })
}

export async function getEns(
  address: Address,
  chain: Chain
): Promise<Ens | null> {
  // chain we don't recognize and don't have a rpcUrl for requests
  if (!chain) return null

  const provider = await getProvider(chain)
  if (!provider) return null

  try {
    const name = await provider.getEnsName({
      address
    })
    let ens = null

    if (name) {
      const { labelhash, normalize } = await import('viem/ens')
      const normalizedName = normalize(name)

      const ensResolver = await provider.getEnsResolver({
        name: normalizedName
      })
      const avatar = await provider.getEnsAvatar({
        name: normalizedName
      })
      const contentHash = labelhash(normalizedName)
      const getText = async (key: string): Promise<GetEnsTextReturnType> => {
        return await provider.getEnsText({
          name,
          key
        })
      }

      ens = {
        name,
        avatar,
        contentHash,
        ensResolver,
        getText
      }
    }

    return ens
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getUns(
  address: Address,
  chain: Chain
): Promise<Uns | null> {
  const { unstoppableResolution } = configuration

  // check if address is valid ETH address before attempting to resolve
  // chain we don't recognize and don't have a rpcUrl for requests
  if (!unstoppableResolution || !isAddress(address) || !chain) return null

  try {
    return await unstoppableResolution(address)
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getBalance(
  address: Address,
  chain: Chain
): Promise<Balances | null> {
  // chain we don't recognize and don't have a rpcUrl for requests
  if (!chain) return null

  const { wallets } = state.get()

  try {
    const wallet = wallets.find(wallet => !!wallet.provider)
    if (!wallet) return null
    const provider = wallet.provider
    const balanceHex = (await provider.request({
      method: 'eth_getBalance',
      params: [address, 'latest']
    })) as `0x${string}`
    return balanceHex
      ? { [chain.token || 'eth']: weiHexToEth(balanceHex) }
      : null
  } catch (error) {
    console.error(error)
    return null
  }
}

export function switchChain(
  provider: EIP1193Provider,
  chainId: ChainId
): Promise<unknown> {
  return provider.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId }]
  })
}

export function addNewChain(
  provider: EIP1193Provider,
  chain: Chain
): Promise<unknown> {
  return provider.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: chain.id,
        chainName: chain.label,
        nativeCurrency: {
          name: chain.label,
          symbol: chain.token,
          decimals: 18
        },
        rpcUrls: [chain.publicRpcUrl || chain.rpcUrl],
        blockExplorerUrls: chain.blockExplorerUrl
          ? [chain.blockExplorerUrl]
          : null
      }
    ]
  })
}

export function updateChainRPC(
  provider: EIP1193Provider,
  chain: Chain,
  rpcUrl: string
): Promise<unknown> {
  return provider.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: chain.id,
        chainName: chain.label,
        nativeCurrency: {
          name: chain.label,
          symbol: chain.token,
          decimals: 18
        },
        rpcUrls: [rpcUrl],
        blockExplorerUrls: chain.blockExplorerUrl
          ? [chain.blockExplorerUrl]
          : undefined
      }
    ]
  })
}

export async function getPermissions(
  provider: EIP1193Provider
): Promise<WalletPermission[]> {
  try {
    const permissions = (await provider.request({
      method: 'wallet_getPermissions'
    })) as WalletPermission[]

    return Array.isArray(permissions) ? permissions : []
  } catch (error) {
    return []
  }
}

export async function syncWalletConnectedAccounts(
  label: WalletState['label']
): Promise<void> {
  const wallet = state.get().wallets.find(wallet => wallet.label === label)
  if (!wallet) return
  const permissions = await getPermissions(wallet.provider)
  const accountsPermissions = permissions.find(
    ({ parentCapability }) => parentCapability === 'eth_accounts'
  )

  if (accountsPermissions) {
    const { value: connectedAccounts } = accountsPermissions.caveats.find(
      ({ type }) => type === 'restrictReturnedAccounts'
    ) || { value: null }

    if (connectedAccounts) {
      const syncedAccounts = wallet.accounts.filter(({ address }) =>
        connectedAccounts.includes(address)
      )

      updateWallet(wallet.label, { ...wallet, accounts: syncedAccounts })
    }
  }
}

export const addOrSwitchChain = async (
  provider: EIP1193Provider,
  chain: Chain
): Promise<string | undefined> => {
  try {
    const { id } = chain
    await addNewChain(provider, chain)
    await switchChain(provider, id)
    return id
  } catch (error) {
    return undefined
  }
}

export const wagmiProviderMethods = (): {
  addOrSwitchChain: (
    provider: EIP1193Provider,
    chain: Chain
  ) => Promise<string | undefined>
  getChainId: (provider: EIP1193Provider) => Promise<string>
  requestAccounts: (provider: EIP1193Provider) => Promise<ProviderAccounts>
  switchChain: (provider: EIP1193Provider, chainId: ChainId) => Promise<unknown>
} => ({
  addOrSwitchChain,
  getChainId,
  requestAccounts,
  switchChain
})
