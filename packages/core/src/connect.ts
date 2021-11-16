import { firstValueFrom } from 'rxjs'
import { filter, withLatestFrom, pluck } from 'rxjs/operators'
import { connectWallet$, wallets$ } from './streams'
import type { ConnectOptions, WalletState } from './types'
import { validateConnectOptions } from './validation'

async function connect(options?: ConnectOptions): Promise<WalletState[]> {
  if (options) {
    const error = validateConnectOptions(options)
    if (error) {
      throw error
    }
  }

  const { autoSelect } = options || { autoSelect: '' }

  connectWallet$.next({ autoSelect, inProgress: true })

  const result$ = connectWallet$.pipe(
    filter(({ inProgress }) => inProgress === false),
    withLatestFrom(wallets$),
    pluck(1)
  )

  return firstValueFrom(result$)
}

export default connect
