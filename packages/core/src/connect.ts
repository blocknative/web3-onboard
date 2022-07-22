import { firstValueFrom } from 'rxjs'
import { filter, withLatestFrom, pluck } from 'rxjs/operators'
import { configuration } from './configuration'
import { state } from './store'
import { setWalletModules } from './store/actions'
import { connectWallet$, wallets$ } from './streams'
import type { ConnectOptions, ConnectOptionsString, WalletState } from './types'
import { wait } from './utils'
import { validateConnectOptions } from './validation'

async function connect(
  options?: ConnectOptions | ConnectOptionsString
): Promise<WalletState[]> {
  if (options) {
    const error = validateConnectOptions(options)
    if (error) {
      throw error
    }
  }

  const { chains } = state.get()

  // Wallets require the chains for initializing providers,
  // so we must ensure at least one is set
  if (!chains.length)
    throw new Error(
      'At least one chain must be set before attempting to connect a wallet'
    )

  const { autoSelect } = options || {
    autoSelect: { label: '', disableModals: false }
  }

  // if auto selecting, wait until next event loop
  if (autoSelect && (typeof autoSelect === 'string' || autoSelect.label)) {
    await wait(50)
  }

  // first time calling connect, so initialize and set wallet modules
  if (!state.get().walletModules.length) {
    setWalletModules(configuration.initialWalletInit)
  }

  connectWallet$.next({
    autoSelect:
      typeof autoSelect === 'string'
        ? { label: autoSelect, disableModals: false }
        : autoSelect,
    inProgress: true
  })

  const result$ = connectWallet$.pipe(
    filter(
      ({ inProgress, actionRequired }) =>
        inProgress === false && !actionRequired
    ),
    withLatestFrom(wallets$),
    pluck(1)
  )

  return firstValueFrom(result$)
}

export default connect
