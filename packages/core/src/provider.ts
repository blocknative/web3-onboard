import { fromEventPattern, Observable } from 'rxjs'
import { filter, takeUntil, take, share, switchMap } from 'rxjs/operators'
import partition from 'lodash.partition'
import { utils, providers } from 'ethers'

import type {
  ChainId,
  EIP1102Request,
  EIP1193Provider,
  ProviderAccounts,
  Chain,
  AccountsListener,
  ChainListener,
  SelectAccountsRequest
} from '@web3-onboard/common'

import { disconnectWallet$ } from './streams'
import type { Account, Address, Balances, Ens, WalletState } from './types'
import { updateAccount, updateWallet } from './store/actions'
import { validEnsChain } from './utils'
import disconnect from './disconnect'
import { state } from './store'
import { internalState } from './internals'
import { getBlocknativeSdk } from './services'

export const ethersProviders: {
  [key: string]: providers.StaticJsonRpcProvider
} = {}

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

  // when account changed, set it to first account
  accountsChanged$.subscribe(async ([address]) => {
    // no address, then no account connected, so disconnect wallet
    // this could happen if user locks wallet,
    // or if disconnects app from wallet
    if (!address) {
      disconnect({ label })
      return
    }

    const { wallets } = state.get()
    const { accounts } = wallets.find(wallet => wallet.label === label)

    const [[existingAccount], restAccounts] = partition(
      accounts,
      account => account.address === address
    )

    // update accounts without ens and balance first
    updateWallet(label, {
      accounts: [
        existingAccount || { address: address, ens: null, balance: null },
        ...restAccounts
      ]
    })

    // if not existing account and notify, then subscribe to transaction events
    if (!internalState.notify.disabled && !existingAccount) {
      const sdk = await getBlocknativeSdk()

      if (sdk) {
        const wallet = state
          .get()
          .wallets.find(wallet => wallet.label === label)

        sdk.subscribe({
          id: address,
          chainId: wallet.chains[0].id,
          type: 'account'
        })
      }
    }
  })

  // also when accounts change, update Balance and ENS,
  accountsChanged$
    .pipe(
      switchMap(async ([address]) => {
        if (!address) return

        const { wallets, chains } = state.get()

        const { chains: walletChains, accounts } = wallets.find(
          wallet => wallet.label === label
        )

        const [connectedWalletChain] = walletChains

        const chain = chains.find(
          ({ namespace, id }) =>
            namespace === 'evm' && id === connectedWalletChain.id
        )

        const balanceProm = getBalance(address, chain)
        const account = accounts.find(account => account.address === address)

        const ensProm = account.ens
          ? Promise.resolve(account.ens)
          : validEnsChain(connectedWalletChain.id)
          ? getEns(address, chain)
          : Promise.resolve(null)

        return Promise.all([Promise.resolve(address), balanceProm, ensProm])
      })
    )
    .subscribe(res => {
      if (!res) return
      const [address, balance, ens] = res
      updateAccount(label, address, { balance, ens })
    })

  const chainChanged$ = listenChainChanged({ provider, disconnected$ }).pipe(
    share()
  )

  // Update chain on wallet when chainId changed
  chainChanged$.subscribe(async chainId => {
    const { wallets } = state.get()
    const { chains, accounts } = wallets.find(wallet => wallet.label === label)
    const [connectedWalletChain] = chains

    if (chainId === connectedWalletChain.id) return

    if (!internalState.notify.disabled) {
      const sdk = await getBlocknativeSdk()

      if (sdk) {
        const wallet = state
          .get()
          .wallets.find(wallet => wallet.label === label)

        // Unsubscribe
        wallet.accounts.forEach(({ address }) => {
          sdk.unsubscribe({
            id: address,
            chainId: wallet.chains[0].id
          })
        })

        // resubscribe for new chainId
        wallet.accounts.forEach(({ address }) => {
          sdk.subscribe({
            id: address,
            chainId: chainId,
            type: 'account'
          })
        })
      }
    }

    const resetAccounts = accounts.map(
      ({ address }) =>
        ({
          address,
          ens: null,
          balance: null
        } as Account)
    )

    updateWallet(label, {
      chains: [{ namespace: 'evm', id: chainId }],
      accounts: resetAccounts
    })
  })

  // when chain changes get ens and balance for each account for wallet
  chainChanged$
    .pipe(
      switchMap(async chainId => {
        const { wallets, chains } = state.get()
        const { accounts } = wallets.find(wallet => wallet.label === label)

        const chain = chains.find(
          ({ namespace, id }) => namespace === 'evm' && id === chainId
        )

        return Promise.all(
          accounts.map(async ({ address }) => {
            const balanceProm = getBalance(address, chain)

            const ensProm = validEnsChain(chainId)
              ? getEns(address, chain)
              : Promise.resolve(null)

            const [balance, ens] = await Promise.all([balanceProm, ensProm])

            return {
              address,
              balance,
              ens
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

  if (!ethersProviders[chain.rpcUrl]) {
    ethersProviders[chain.rpcUrl] = new providers.StaticJsonRpcProvider(
      chain.rpcUrl
    )
  }

  const provider = ethersProviders[chain.rpcUrl]

  try {
    const name = await provider.lookupAddress(address)
    let ens = null

    if (name) {
      const resolver = await provider.getResolver(name)

      if (resolver) {
        const [contentHash, avatar] = await Promise.all([
          resolver.getContentHash(),
          resolver.getAvatar()
        ])

        const getText = resolver.getText.bind(resolver)

        ens = {
          name,
          avatar,
          contentHash,
          getText
        }
      }
    }

    return ens
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getBalance(
  address: string,
  chain: Chain
): Promise<Balances | null> {
  // chain we don't recognize and don't have a rpcUrl for requests
  if (!chain) return null

  if (!ethersProviders[chain.rpcUrl]) {
    ethersProviders[chain.rpcUrl] = new providers.StaticJsonRpcProvider(
      chain.rpcUrl
    )
  }

  const provider = ethersProviders[chain.rpcUrl]

  try {
    const balanceWei = await provider.getBalance(address)

    return balanceWei
      ? { [chain.token || 'eth']: utils.formatEther(balanceWei) }
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
        rpcUrls: [chain.rpcUrl]
      }
    ]
  })
}
