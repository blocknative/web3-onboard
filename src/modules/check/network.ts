import { networkName } from '../../utilities'
import { WalletCheckModal, StateAndHelpers } from '../../interfaces'
import { networkIcon } from './icons'

function network(
  options: {
    heading?: string
    description?: string
    icon?: string
  } = {}
): (currentState: StateAndHelpers) => Promise<WalletCheckModal | undefined> {
  const { heading, description, icon } = options

  return async (stateAndHelpers: StateAndHelpers) => {
    const {
      network,
      appNetworkId,
      walletSelect,
      exit,
      stateSyncStatus,
      stateStore
    } = stateAndHelpers

    if (network === null) {
      // wait for network sync if is still on initial value
      if (stateSyncStatus.network) {
        await new Promise(resolve => {
          stateSyncStatus.network && stateSyncStatus.network.then(resolve)

          setTimeout(() => {
            if (network === null) {
              // if prom isn't resolving after 250ms, then stop waiting
              resolve()
            }
          }, 250)
        })
      }
    }

    if (stateStore.network.get() != appNetworkId) {
      return {
        heading: heading || 'You Must Change Networks',
        description:
          description ||
          `We've detected that you need to switch your wallet's network from <b>${networkName(
            network
          )}</b> to <b>${networkName(
            appNetworkId
          )} network</b> for this Dapp. <br><br> <i style="font-size: inherit; font-family: inherit;">*Some wallets may not support changing networks. If you can not change networks in your wallet you may consider switching to a different wallet.</i>`,
        eventCode: 'networkFail',
        button: {
          onclick: () => {
            exit()
            walletSelect()
          },
          text: 'Switch Wallet'
        },
        icon: icon || networkIcon
      }
    }
  }
}

export default network
