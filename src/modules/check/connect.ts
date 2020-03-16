import {
  WalletCheckModal,
  StateAndHelpers,
  WalletCheckModule
} from '../../interfaces'
import { connectIcon } from './icons'

function connect(options: {
  heading: string
  description: string
  icon: string
}): WalletCheckModule {
  const { heading, description, icon } = options

  return (stateAndHelpers: StateAndHelpers): WalletCheckModal | undefined => {
    const { wallet, address } = stateAndHelpers
    if (!address && wallet && wallet.name) {
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
