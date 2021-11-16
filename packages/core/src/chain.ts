import { addNewChain, switchChain } from './provider'
import { state } from './store'

async function setChain(chainId: string): Promise<boolean> {
  // @TODO - Validate chainId
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

  try {
    await switchChain(wallet.provider, chainId)
    return true
  } catch (error) {
    console.warn(error)
    const { code } = error as { code: number }

    if (code === 4902) {
      // chain has not been added to wallet
      try {
        addNewChain(wallet.provider, chain)
        return true
      } catch (error) {
        // display notification to user to switch networks
      }
    }

    if (code === 4200) {
      // method not supported
      // display notification to user to switch networks
    }
  }

  return false
}

export default setChain
