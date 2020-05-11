import {
  WalletCheckModal,
  StateAndHelpers,
  WalletCheckModule
} from '../../interfaces'
import { connectIcon } from './icons'

function connect(
  options: {
    heading?: string
    description?: string
    icon?: string
  } = {}
): WalletCheckModule {
  const { heading, description, icon } = options

  return async (
    stateAndHelpers: StateAndHelpers
  ): Promise<WalletCheckModal | undefined> => {
    const { wallet, address, stateSyncStatus, stateStore } = stateAndHelpers
    if (address === null) {
      // wait for address sync if is still on initial value
      if (stateSyncStatus.address) {
        await new Promise(resolve => {
          stateSyncStatus.address && stateSyncStatus.address.then(resolve)

          setTimeout(() => {
            if (address === null) {
              // if prom isn't resolving after 500ms, then stop waiting
              resolve()
            }
          }, 500)
        })
      }
    }

    if (!stateStore.address.get() && wallet && wallet.name) {
      return {
        heading: heading || 'Login and Authorize Your Wallet',
        description:
          description ||
          `This dapp requires access to your wallet, please login and authorize access to your ${wallet.name} accounts to continue.`,
        eventCode: 'loginFail',
        action: wallet.connect,
        icon: icon || connectIcon
      }
    }
  }
}

export default connect
