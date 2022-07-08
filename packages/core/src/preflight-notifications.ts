import BigNumber from 'bignumber.js'
import { nanoid } from 'nanoid'
import defaultCopy from './i18n/en.json'
import type { Network } from 'bnc-sdk'

import type { Notification, TransactionOptions } from './types'
import { addNotification, removeNotification } from './store/actions'
import { state } from './store'
import { eventToType } from './notify'
import { networkToChainId } from './utils'

const notifications = state.get().notifications

export async function preflightNotification(
  options: TransactionOptions
): Promise<string> {
  const { sendTransaction, estimateGas, gasPrice, balance, txDetails } = options

  // if `balance` or `estimateGas` or `gasPrice` is not provided,
  // then sufficient funds check is disabled
  // if `txDetails` is not provided,
  // then duplicate transaction check is disabled
  // if dev doesn't want notify to initiate the transaction
  // and `sendTransaction` is not provided, then transaction
  // rejected notification is disabled
  // to disable hints for `txAwaitingApproval`, `txConfirmReminder`
  // or any other notification, then return false from listener functions

  const [gas, price] = await gasEstimates(estimateGas, gasPrice)
  const id = nanoid()
  const value = new BigNumber((txDetails && txDetails.value) || 0)

  // check sufficient balance if required parameters are available
  if (balance && gas && price) {
    const transactionCost = gas.times(price).plus(value)

    // if transaction cost is greater than the current balance
    if (transactionCost.gt(new BigNumber(balance))) {
      const eventCode = 'nsfFail'

      const newNotification = buildNotification(eventCode, id)
      addNotification(newNotification)
    }
  }

  // awaiting approval reminder after 15 seconds timeout
  setTimeout(() => {
    const txRequested = notifications.find(
      tx => tx.id === id && tx.eventCode === 'txRequest'
    )

    if (txRequested) {
      const eventCode = 'txAwaitingApproval'

      const newNotification = buildNotification(eventCode, txRequested.id)
      addNotification(newNotification)
    }
  }, 15000)

  // confirm reminder after 30 seconds timeout
  setTimeout(() => {
    const awaitingApproval = notifications.find(
      tx => tx.id === id && tx.eventCode === 'awaitingApproval'
    )

    if (awaitingApproval) {
      const eventCode = 'txConfirmReminder'

      const newNotification = buildNotification(eventCode, awaitingApproval.id)
      addNotification(newNotification)
    }
  }, 30000)

  const eventCode = 'txRequest'
  const newNotification = buildNotification(eventCode, id)
  addNotification(newNotification)

  // if not provided with sendTransaction function,
  // resolve with id so dev can initiate transaction
  // dev will need to call notify.hash(txHash, id) with this id
  // to link up the preflight with the postflight notifications
  if (!sendTransaction) {
    return id
  }
  // get result and handle errors
  let hash
  try {
    hash = await sendTransaction()
  } catch (error) {
    type CatchError = {
      message: string
      stack: string
    }
    const { eventCode, errorMsg } = extractMessageFromError(error as CatchError)

    const newNotification = buildNotification(eventCode, id)
    addNotification(newNotification)
    console.error(errorMsg)
    return
  }

  // Remove preflight notification if a resolves to hash
  // and let the SDK take over
  if (hash) {
    removeNotification(id)
    return hash
  }
}

const buildNotification = (eventCode: string, id: string): Notification => {
  return {
    eventCode,
    type: eventToType(eventCode),
    id,
    key: createKey(id, eventCode),
    message: createMessageText(eventCode),
    startTime: Date.now(),
    network: Object.keys(networkToChainId).find(
      key => networkToChainId[key] === state.get().chains[0].id
    ) as Network,
    autoDismiss: 0
  }
}

const createKey = (id: string, eventCode: string): string => {
  return `${id}-${eventCode}`
}

const createMessageText = (eventCode: string): string => {
  const notificationDefaultMessages = defaultCopy.notify

  const notificationMessageType = notificationDefaultMessages.transaction

  return notificationDefaultMessages.transaction[
    eventCode as keyof typeof notificationMessageType
  ]
}

export function extractMessageFromError(error: {
  message: string
  stack: string
}): { eventCode: string; errorMsg: string } {
  if (!error.stack || !error.message) {
    return {
      eventCode: 'txError',
      errorMsg: 'An unknown error occured'
    }
  }

  const message = error.stack || error.message

  if (message.includes('User denied transaction signature')) {
    return {
      eventCode: 'txSendFail',
      errorMsg: 'User denied transaction signature'
    }
  }

  if (message.includes('transaction underpriced')) {
    return {
      eventCode: 'txUnderpriced',
      errorMsg: 'Transaction is under priced'
    }
  }

  return {
    eventCode: 'txError',
    errorMsg: message
  }
}

const gasEstimates = async (
  gasFunc: () => Promise<string>,
  gasPriceFunc: () => Promise<string>
) => {
  if (!gasFunc || !gasPriceFunc) {
    return Promise.resolve([])
  }

  const gasProm = gasFunc()
  if (!gasProm.then) {
    throw new Error('The `estimateGas` function must return a Promise')
  }

  const gasPriceProm = gasPriceFunc()
  if (!gasPriceProm.then) {
    throw new Error('The `gasPrice` function must return a Promise')
  }

  return Promise.all([gasProm, gasPriceProm])
    .then(([gasResult, gasPriceResult]) => {
      if (typeof gasResult !== 'string') {
        throw new Error(
          `The Promise returned from calling 'estimateGas' must resolve with a value of type 'string'. Received a value of: ${gasResult} with a type: ${typeof gasResult}`
        )
      }

      if (typeof gasPriceResult !== 'string') {
        throw new Error(
          `The Promise returned from calling 'gasPrice' must resolve with a value of type 'string'. Received a value of: ${gasPriceResult} with a type: ${typeof gasPriceResult}`
        )
      }

      return [new BigNumber(gasResult), new BigNumber(gasPriceResult)]
    })
    .catch(error => {
      throw new Error(`There was an error getting gas estimates: ${error}`)
    })
}
