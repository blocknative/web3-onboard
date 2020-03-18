import { networkName } from '../../utilities'
import { WalletCheckModule, StateAndHelpers } from '../../interfaces'
import { networkIcon } from './icons'

function network(
  options: {
    heading?: string
    description?: string
    icon?: string
  } = {}
): WalletCheckModule | never {
  const { heading, description, icon } = options

  return (stateAndHelpers: StateAndHelpers) => {
    const { network, appNetworkId, walletSelect, exit } = stateAndHelpers

    if (network != appNetworkId) {
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
