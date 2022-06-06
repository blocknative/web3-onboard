import { getBlocknativeSdk } from './services'
import { state } from './store'
import { removeWallet } from './store/actions'
import { disconnectWallet$ } from './streams'
import type { DisconnectOptions, WalletState } from './types'
import { validateDisconnectOptions } from './validation'

async function disconnect(options: DisconnectOptions): Promise<WalletState[]> {
  const error = validateDisconnectOptions(options)
  if (error) {
    throw error
  }

  const { label } = options

  if (state.get().notify.enabled) {
    // handle unwatching addresses
    const sdk = await getBlocknativeSdk()

    if (sdk) {
      const wallet = state.get().wallets.find(wallet => wallet.label === label)

      wallet.accounts.forEach(({ address }) => {
        sdk.unsubscribe({ id: address, chainId: wallet.chains[0].id })
      })
    }
  }

  disconnectWallet$.next(label)
  removeWallet(label)

  return state.get().wallets
}

export default disconnect
