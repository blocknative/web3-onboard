import { fromEvent, fromEventPattern, Observable } from 'rxjs'
import { filter, takeUntil, withLatestFrom } from 'rxjs/operators'
import partition from 'lodash.partition'

import type {
  ChainId,
  EIP1102Request,
  EIP1193Provider,
  ProviderAccounts,
  Chain,
  AccountsListener,
  ChainListener
} from '@bn-onboard/types'

import { disconnectWallet$, wallets$ } from './streams'

import type { Address, Balances, Ens, WalletState } from './types'
import { updateWallet } from './store/actions'
import { providers, utils } from 'ethers'
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

export function accountsChanged(
  provider: EIP1193Provider,
  label: WalletState['label']
): Observable<ProviderAccounts> {
  const disconnected$ = disconnectWallet$.pipe(
    filter(wallet => wallet === label)
  )

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

export function chainChanged(
  provider: EIP1193Provider,
  label: WalletState['label']
): Observable<ChainId> {
  const disconnected$ = disconnectWallet$.pipe(
    filter(wallet => wallet === label)
  )

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
  accountsChanged(provider, label)
    .pipe(withLatestFrom(wallets$))
    .subscribe({
      complete: () =>
        console.log('Removing accountsChanged listener for wallet:', label),
      next: async ([[address], wallets]) => {
        const { accounts, chain } = wallets.find(
          wallet => wallet.label === label
        ) as WalletState

        const [[existingAccount], restAccounts] = partition(
          accounts,
          account => account.address === address
        )

        // no address, then no account connected, so disconnect wallet
        if (!address) {
          disconnect({ label })
          return
        }

        let account

        if (!existingAccount) {
          // update accounts without ens and balance first
          updateWallet(label, {
            accounts: [
              { address: address, ens: null, balance: null },
              ...restAccounts
            ]
          })

          const rpcUrl = getRpcUrl(chain, state.get().chains)

          if (!rpcUrl) {
            console.warn('A chain with rpcUrl is required for requests')

            account = {
              address: address,
              ens: null,
              balance: null
            }
          } else {
            const ethersProvider = new providers.JsonRpcProvider(rpcUrl)
            const { chainId } = await ethersProvider.getNetwork()

            const balanceProm = getBalance(ethersProvider, address)
            const ensProm = validEnsChain(chainId.toString(16))
              ? getEns(ethersProvider, address)
              : Promise.resolve(null)

            const [balance, ens] = await Promise.all([balanceProm, ensProm])

            account = {
              address,
              balance,
              ens
            }
          }
        }

        const updatedOrderedAccounts = [
          existingAccount || account,
          ...restAccounts
        ]

        updateWallet(label, { accounts: updatedOrderedAccounts })
      }
    })

  chainChanged(provider, label)
    .pipe(withLatestFrom(wallets$))
    .subscribe({
      complete: () =>
        console.log('Removing chainChanged listener for wallet:', label),
      next: async ([chainId, wallets]) => {
        const { accounts } = wallets.find(
          wallet => wallet.label === label
        ) as WalletState

        const resetAccounts = accounts.map(({ address }) => ({
          address,
          ens: null,
          balance: null
        }))

        updateWallet(label, { chain: chainId, accounts: resetAccounts })

        const rpcUrl = getRpcUrl(chainId, state.get().chains)

        if (!rpcUrl) {
          console.warn('A chain with rpcUrl is required for requests')
          return
        }

        const ethersProvider = new providers.JsonRpcProvider(rpcUrl)

        const updatedAccounts = await Promise.all(
          accounts.map(async ({ address }) => {
            const balanceProm = getBalance(ethersProvider, address)
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

        // update accounts
        updateWallet(label, {
          accounts: updatedAccounts
        })
      }
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
  address: string
): Promise<Balances | null> {
  const balanceWei = await ethersProvider.getBalance(address)
  return balanceWei ? { eth: utils.formatEther(balanceWei) } : null
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
