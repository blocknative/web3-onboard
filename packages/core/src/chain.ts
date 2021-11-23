import { addNewChain, switchChain } from './provider'
import { state } from './store'
import { switchChainModal$ } from './streams'
import { validateChainId } from './validation'

async function setChain(chainId: string): Promise<boolean> {
  const error = validateChainId(chainId)

  if (error) {
    throw error
  }

  const { wallets, chains } = state.get()

  // validate a wallet is connected
  const [wallet] = wallets
  if (!wallet) {
    throw new Error('A wallet must be connected before a chain can be set')
  }

  // validate that chainId has been added to chains
  const chain = chains.find(({ id }) => id === chainId)
  if (!chain) {
    throw new Error(
      `Chain with chainId: ${chainId} has not been set. Try adding via the setChains method`
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

    if (code === 4902) {
      // chain has not been added to wallet
      try {
        await addNewChain(wallet.provider, chain)
        await switchChain(wallet.provider, chainId)
        return true
      } catch (error) {
        // display notification to user to switch chain
        switchChainModal$.next({ chain })
      }
    }

    if (code === 4200) {
      // method not supported
      switchChainModal$.next({ chain })
    }
  }

  return false
}

export default setChain
