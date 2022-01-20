import { firstValueFrom } from 'rxjs'
import { filter, mapTo } from 'rxjs/operators'
import { addNewChain, switchChain } from './provider'
import { state } from './store'
import { switchChainModal$ } from './streams'
import { validateSetChainOptions } from './validation'
import type { WalletState } from './types'

async function setChain(options: {
  chainId: string
  wallet?: WalletState['label']
}): Promise<boolean> {
  const error = validateSetChainOptions(options)

  if (error) {
    throw error
  }

  const { wallets, chains } = state.get()
  const { chainId, wallet: walletToSet } = options

  // validate that chainId has been added to chains
  const chain = chains.find(({ id }) => id === chainId)
  if (!chain) {
    throw new Error(
      `Chain with chainId: ${chainId} has not been set and must be added when Onboard is initialized.`
    )
  }

  const wallet = walletToSet
    ? wallets.find(({ label }) => label === walletToSet)
    : wallets[0]

  // validate a wallet is connected
  if (!wallet) {
    throw new Error(
      walletToSet
        ? `Wallet with label ${walletToSet} is not connected`
        : 'A wallet must be connected before a chain can be set'
    )
  }

  // check if wallet is already connected to chainId
  if (wallet.chain === chainId) {
    return true
  }

  try {
    await switchChain(wallet.provider, chainId)
    return true
  } catch (error) {
    const { code } = error as { code: number }
    const switchChainModalClosed$ = switchChainModal$.pipe(
      filter(x => x === null),
      mapTo(false)
    )

    if (code === 4902) {
      // chain has not been added to wallet
      try {
        await addNewChain(wallet.provider, chain)
        await switchChain(wallet.provider, chainId)
        return true
      } catch (error) {
        // display notification to user to switch chain
        switchChainModal$.next({ chain })
        return firstValueFrom(switchChainModalClosed$)
      }
    }

    if (code === 4200) {
      // method not supported
      switchChainModal$.next({ chain })
      return firstValueFrom(switchChainModalClosed$)
    }
  }

  return false
}

export default setChain
