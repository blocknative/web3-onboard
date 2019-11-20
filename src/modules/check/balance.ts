import { WalletCheckModal, StateAndHelpers } from '../../interfaces'
import { validateType } from '../../validation'

function balance(options: {
  minimumBalance: string
}): (currentState: StateAndHelpers) => WalletCheckModal | undefined {
  validateType({ name: 'balance options', value: options, type: 'object' })

  const { minimumBalance } = options

  validateType({
    name: 'minimumBalance',
    value: minimumBalance,
    type: 'string'
  })

  return (StateAndHelpers: StateAndHelpers) => {
    const { balance, BigNumber } = StateAndHelpers
    // if balance is less than minimum
    if (BigNumber(balance).lt(BigNumber(minimumBalance || 0))) {
      return {
        heading: 'Get Some ETH',
        description: `Your current account has less than the necessary minimum balance of ${BigNumber(
          minimumBalance
        )
          .div(BigNumber('1000000000000000000'))
          .toString(10)} ETH.`,
        eventCode: 'nsfFail',
        icon: `
        <svg height="18" viewBox="0 0 429 695" width="18" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fill-rule="evenodd"><path d="m0 394 213 126.228516 214-126.228516-214 301z"/><path d="m0 353.962264 213.5-353.962264 213.5 353.962264-213.5 126.037736z"/></g></svg>
        `
      }
    }
  }
}

export default balance
