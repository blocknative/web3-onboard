import { getBNMulitChainSdk } from './services.js'
import { state } from './store/index.js'
import { removeWallet, updateWagmiConfig } from './store/actions.js'
import { disconnectWallet$ } from './streams.js'
import type { DisconnectOptions, WalletState } from './types.js'
import { validateDisconnectOptions } from './validation.js'
import { delLocalStore, getLocalStore, setLocalStore } from './utils'
import { STORAGE_KEYS } from './constants'
import { configuration } from './configuration'

async function disconnect(options: DisconnectOptions): Promise<WalletState[]> {
  const error = validateDisconnectOptions(options)
  if (error) {
    throw error
  }

  const { label } = options

  if (state.get().notify.enabled) {
    // handle unwatching addresses
    const sdk = await getBNMulitChainSdk()

    if (sdk) {
      const wallet = state.get().wallets.find(wallet => wallet.label === label)

      if (wallet) {
        wallet.accounts.forEach(({ address }) => {
          sdk.unsubscribe({
            id: address,
            chainId: wallet.chains[0].id,
            timeout: 60000
          })
        })
      }
    }
  }
  const { wagmi } = configuration
  if (wagmi) {
    const wagmiConfig = await wagmi.wagmiDisconnectWallet(label)
    if (wagmiConfig) {
      updateWagmiConfig(wagmiConfig)
    }
  }
  disconnectWallet$.next(label)
  removeWallet(label)

  const lastConnectedWallets = getLocalStore(STORAGE_KEYS.LAST_CONNECTED_WALLET)
  if (lastConnectedWallets) {
    try {
      const labels = JSON.parse(lastConnectedWallets)

      if (Array.isArray(labels) && labels.indexOf(label) >= 0) {
        setLocalStore(
          STORAGE_KEYS.LAST_CONNECTED_WALLET,
          JSON.stringify(labels.filter(walletLabel => walletLabel !== label))
        )
      }
      if (typeof labels === 'string' && labels === label) {
        delLocalStore(STORAGE_KEYS.LAST_CONNECTED_WALLET)
      }
    } catch (e) {
      console.error(
        `There was an error disconnecting the last connected wallet from localStorage - Error: ${e}`
      )
    }
  }

  return state.get().wallets
}

export default disconnect
