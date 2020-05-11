import { WalletCheckModal, StateAndHelpers } from '../../interfaces'
import { validateType } from '../../validation'
import { balanceIcon } from './icons'

function balance(
  options: {
    minimumBalance: string
    heading?: string
    description?: string
    icon?: string
  } = { minimumBalance: '0' }
): (currentState: StateAndHelpers) => Promise<WalletCheckModal | undefined> {
  validateType({ name: 'balance options', value: options, type: 'object' })

  const { minimumBalance, heading, description, icon } = options

  validateType({
    name: 'minimumBalance',
    value: minimumBalance,
    type: 'string'
  })

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
        icon: icon || balanceIcon
      }
    }
  }
}

export default balance
