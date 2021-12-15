import { fromEventPattern, Observable } from 'rxjs'
import { filter, takeUntil, take, share, switchMap } from 'rxjs/operators'
import partition from 'lodash.partition'
import { providers, utils } from 'ethers'

import type {
  ChainId,
  EIP1102Request,
  EIP1193Provider,
  ProviderAccounts,
  Chain,
  AccountsListener,
  ChainListener
} from '@bn-onboard/types'

import { disconnectWallet$ } from './streams'
import type { Account, Address, Balances, Ens, WalletState } from './types'
import { updateAccount, updateWallet } from './store/actions'
import { getRpcUrl, validEnsChain } from './utils'
import disconnect from './disconnect'
import { state } from './store'

export function requestAccounts(
  provider: EIP1193Provider
): Promise<ProviderAccounts> {
  const args = { method: 'eth_requestAccounts' } as EIP1102Request
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
  accountsChanged$.subscribe(([address]) => {
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
  })

  // also when accounts change update Balance and ENS
  accountsChanged$
    .pipe(
      switchMap(async ([address]) => {
        if (!address) return

        const { wallets, chains } = state.get()

        const { chain, accounts } = wallets.find(
          wallet => wallet.label === label
        )

        const rpcUrl = getRpcUrl(chain, chains)

        if (rpcUrl) {
          const ethersProvider = new providers.JsonRpcProvider(rpcUrl)

          const balanceProm = getBalance(
            ethersProvider,
            address,
            chains.find(({ id }) => id === chain)
          )

          const account = accounts.find(account => account.address === address)

          const ensProm = account.ens
            ? Promise.resolve(account.ens)
            : validEnsChain(chain)
            ? getEns(ethersProvider, address)
            : Promise.resolve(null)

          return Promise.all([Promise.resolve(address), balanceProm, ensProm])
        }
      })
    )
    .subscribe(([address, balance, ens]) => {
      updateAccount(label, address, { balance, ens })
    })

  const chainChanged$ = listenChainChanged({ provider, disconnected$ }).pipe(
    share()
  )

  // Update chain on wallet when chainId changed
  chainChanged$.subscribe(chainId => {
    const { wallets } = state.get()
    const { chain, accounts } = wallets.find(wallet => wallet.label === label)

    if (chainId === chain) return

    const resetAccounts = accounts.map(
      ({ address }) =>
        ({
          address,
          ens: null,
          balance: null
        } as Account)
    )

    updateWallet(label, { chain: chainId, accounts: resetAccounts })
  })

  // when chain changes get ens and balance for each account for wallet
  chainChanged$
    .pipe(
      switchMap(async chainId => {
        const { wallets, chains } = state.get()
        const { accounts } = wallets.find(wallet => wallet.label === label)
        const rpcUrl = getRpcUrl(chainId, chains)

        if (rpcUrl) {
          const ethersProvider = new providers.JsonRpcProvider(rpcUrl)

          return Promise.all(
            accounts.map(async ({ address }) => {
              const balanceProm = getBalance(
                ethersProvider,
                address,
                chains.find(({ id }) => id === chainId)
              )

              const ensProm = validEnsChain(chainId)
                ? getEns(ethersProvider, address)
                : Promise.resolve(null)

              const [balance, ens] = await Promise.all([balanceProm, ensProm])

              return {
                address,
                balance,
                ens
              }
            })
          )
        }
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
  ethersProvider: providers.JsonRpcProvider,
  address: Address
): Promise<Ens | null> {
  const name = await ethersProvider.lookupAddress(address)
  let ens = null

  if (name) {
    const resolver = await ethersProvider.getResolver(name)

    if (resolver) {
      const contentHash = await resolver.getContentHash()
      const getText = resolver.getText.bind(resolver)

      ens = {
        name,
        contentHash,
        getText
      }
    }
  }

  return ens
}

export async function getBalance(
  ethersProvider: providers.JsonRpcProvider,
  address: string,
  chain: Chain
): Promise<Balances | null> {
  const balanceWei = await ethersProvider.getBalance(address)

  return balanceWei
    ? { [chain.token || 'eth']: utils.formatEther(balanceWei) }
    : null
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
