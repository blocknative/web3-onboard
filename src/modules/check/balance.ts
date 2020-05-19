import {
  WalletCheckModal,
  StateAndHelpers,
  WalletCheckCustomOptions
} from '../../interfaces'
import { balanceIcon } from './icons'

function balance(
  options: WalletCheckCustomOptions & { minimumBalance: string } = {
    minimumBalance: '0'
  }
): (currentState: StateAndHelpers) => Promise<WalletCheckModal | undefined> {
  const { minimumBalance, heading, description, icon, html, button } = options

  return async (StateAndHelpers: StateAndHelpers) => {
    const { balance, BigNumber, stateSyncStatus, stateStore } = StateAndHelpers

    if (balance === null) {
      // wait for balance sync if is still on initial value
      if (stateSyncStatus.balance) {
        try {
          await stateSyncStatus.balance
        } catch (error) {}
      }
    }

    // if balance is less than minimum
    if (BigNumber(stateStore.balance.get()).lt(BigNumber(minimumBalance))) {
      return {
        heading: heading || 'Get Some ETH',
        description:
          description ||
          `Your current account has less than the necessary minimum balance of ${BigNumber(
            minimumBalance
          )
            .div(BigNumber('1000000000000000000'))
            .toString(10)} ETH.`,
        eventCode: 'nsfFail',
        icon: icon || balanceIcon,
        html,
        button
      }
    }
  }
}

export default balance
