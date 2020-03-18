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
): (currentState: StateAndHelpers) => WalletCheckModal | undefined {
  validateType({ name: 'balance options', value: options, type: 'object' })

  const { minimumBalance, heading, description, icon } = options

  validateType({
    name: 'minimumBalance',
    value: minimumBalance,
    type: 'string'
  })

  return (StateAndHelpers: StateAndHelpers) => {
    const { balance, BigNumber } = StateAndHelpers
    // if balance is less than minimum
    if (BigNumber(balance).lt(BigNumber(minimumBalance))) {
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
