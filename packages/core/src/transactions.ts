import BigNumber from 'bignumber.js'
import { uuid } from 'uuidv4';
import { get } from 'svelte/store'

import { transactions, app, notifications } from './stores'
import { createNotification } from './notifications'
import { argsEqual, extractMessageFromError, localNetwork } from './utils'
import { validateNotificationObject } from './validation'

import type {
  TransactionData,
  PreflightEvent,
  ContractCall,
  CustomNotificationObject,
  Emitter,
  TransactionOptions
} from './types'

let transactionQueue: TransactionData[]
transactions.subscribe((store: TransactionData[]) => (transactionQueue = store))

export function handlePreFlightEvent(
  blocknative,
  preflightEvent: PreflightEvent
) {
  const { eventCode, contractCall, balance, txDetails, emitter, status } =
    preflightEvent

  let contract

  if (contractCall) {
    contract = {
      methodName: contractCall.methodName,
      parameters: contractCall.params
    }
  }

  blocknative.event({
    categoryCode: contractCall ? 'activeContract' : 'activeTransaction',
    eventCode,
    transaction: txDetails,
    wallet: { balance },
    contract: contractCall ? contract : undefined
  })

  const transaction = {
    ...txDetails,
    eventCode,
    status,
    contractCall: contract ? contractCall : undefined
  }

  const emitterResult = emitter.emit(transaction)

  if (emitterResult) {
    validateNotificationObject(emitterResult)
  }

  handleTransactionEvent({
    transaction: transaction,
    emitterResult
  })
}

export function handleTransactionEvent(event) {
  const { transaction, emitterResult } = event
  const currentId = transaction.id
  const transactionId = transaction.hash || transaction.txid

  // returns a boolean indicating whether this transaction state is a new state
  // for an existing transaction or is a new transaction
  const predicate = (txInState: TransactionData) => {
    return (
      (txInState.id && txInState.id === currentId) ||
      txInState.hash === transaction.hash ||
      txInState.replaceHash === transaction.hash
    )
  }

  // replace UUID used for pre-hash identitification with hash or txid(bitcoin)
  if (
    (transactionId &&
      transactionId !== currentId &&
      transaction.eventCode === 'txSent') ||
    !currentId
  ) {
    transaction.id = transactionId
  }

  transactions.updateQueue(transaction, predicate)

  if (transaction.replaceHash) {
    // remove pending notification for replaceHash if exists,
    // this happens is pending comes before speedup event
    notifications.remove(transaction.replaceHash, 'txPool')
  }

  // create notification if dev hasn't opted out 
  // and not connected to a local network
  if (emitterResult !== false && !localNetwork(get(app).networkId)) {
    const transactionObj = transactionQueue.find(predicate)

    if (transactionObj) {
      createNotification(transactionObj, emitterResult)
    }
  }
}

export function duplicateTransactionCandidate(
  transaction: TransactionData,
  contract: ContractCall
) {
  const duplicate: TransactionData | undefined | boolean =
    transactionQueue.find((tx: TransactionData) => {
      if (contract && typeof tx.contractCall === 'undefined') return false
      if (tx.status === 'confirmed' || tx.status === 'failed') return

      const sameMethod = contract
        ? contract.methodName ===
          (tx.contractCall && tx.contractCall.methodName)
        : true

      const sameParams = contract
        ? argsEqual(contract.params, tx.contractCall && tx.contractCall.params)
        : true

      const sameVal = tx.value == transaction.value

      const sameTo = contract
        ? sameMethod
        : tx.to &&
          tx.to.toLowerCase() === transaction.to &&
          transaction.to.toLowerCase()

      return sameMethod && sameParams && sameVal && sameTo
    })

  return duplicate
}

export function preflightTransaction(
  blocknative,
  options: TransactionOptions,
  emitter: Emitter
): Promise<string> {
  return new Promise((resolve, reject) => {
    // wrap in set timeout to put to the end of the event queue
    setTimeout(async () => {
      const {
        sendTransaction,
        estimateGas,
        gasPrice,
        balance,
        contractCall,
        txDetails
      } = options

      //=== if `balance` or `estimateGas` or `gasPrice` is not provided, 
      // then sufficient funds check is disabled === //
      //=== if `txDetails` is not provided, 
      // then duplicate transaction check is disabled === //
      //== if dev doesn't want notify to initiate the transaction 
      // and `sendTransaction` is not provided, 
      // then transaction rejected notification is disabled ==//
      //=== to disable hints for `txAwaitingApproval`, 
      // `txConfirmReminder` or any other notification, 
      // then return false from listener functions ==//

      const [gas, price] = await gasEstimates(estimateGas, gasPrice)
      const id = uuid()
      const value = new BigNumber((txDetails && txDetails.value) || 0)

      const calculated = {
        value: value.toString(10),
        gas: gas && gas.toString(10),
        gasPrice: price && price.toString(10)
      }

      const txObject = txDetails
        ? {
            ...txDetails,
            ...calculated,
            id
          }
        : { ...calculated, id }

      // check sufficient balance if required parameters are available
      if (balance && gas && price) {
        const transactionCost = gas.times(price).plus(value)

        // if transaction cost is greater than the current balance
        if (transactionCost.gt(new BigNumber(balance))) {
          const eventCode = 'nsfFail'

          handlePreFlightEvent(blocknative, {
            eventCode,
            contractCall,
            balance,
            txDetails: txObject,
            emitter
          })

          return reject('User has insufficient funds')
        }
      }

      // check if it is a duplicate transaction
      if (txDetails && duplicateTransactionCandidate(txDetails, contractCall)) {
        const eventCode = 'txRepeat'

        handlePreFlightEvent(blocknative, {
          eventCode,
          contractCall,
          balance,
          txDetails: txObject,
          emitter
        })
      }

      const {
        txApproveReminderTimeout,
        txStallPendingTimeout,
        txStallConfirmedTimeout
      } = get(app)

      // check previous transactions awaiting approval
      if (transactionQueue.find(tx => tx.status === 'awaitingApproval')) {
        const eventCode = 'txAwaitingApproval'

        handlePreFlightEvent(blocknative, {
          eventCode,
          contractCall,
          balance,
          txDetails: txObject,
          emitter
        })
      }

      // confirm reminder after timeout
      setTimeout(() => {
        const awaitingApproval = transactionQueue.find(
          tx => tx.id === id && tx.status === 'awaitingApproval'
        )

        if (awaitingApproval) {
          const eventCode = 'txConfirmReminder'

          handlePreFlightEvent(blocknative, {
            eventCode,
            contractCall,
            balance,
            txDetails: txObject,
            emitter
          })
        }
      }, txApproveReminderTimeout)

      handlePreFlightEvent(blocknative, {
        eventCode: 'txRequest',
        status: 'awaitingApproval',
        contractCall,
        balance,
        txDetails: txObject,
        emitter
      })

      // if not provided with sendTransaction function, 
      // resolve with id so dev can initiate transaction
      // dev will need to call notify.hash(txHash, id) with this id 
      // to link up the preflight with the postflight notifications
      if (!sendTransaction) {
        return resolve(id)
      }

      // get result and handle errors
      let hash
      try {
        hash = await sendTransaction()
      } catch (error) {
        const { eventCode, errorMsg } = extractMessageFromError(error)

        handlePreFlightEvent(blocknative, {
          eventCode,
          status: 'failed',
          contractCall,
          balance,
          txDetails: txObject,
          emitter
        })

        return reject(errorMsg)
      }

      if (hash && typeof hash === 'string') {
        const serverEmitter = blocknative.transaction(hash, id).emitter

        serverEmitter.on('all', (transaction: TransactionData) => {
          const result = emitter.emit(transaction)
          return result
        })

        // Check for pending stall status
        setTimeout(() => {
          const transaction = transactionQueue.find(
            (tx: TransactionData) => tx.id === id
          )
          if (
            transaction &&
            transaction.status === 'sent' &&
            blocknative._connected
          ) {
            const eventCode = 'txStallPending'

            handlePreFlightEvent(blocknative, {
              eventCode,
              contractCall,
              balance,
              txDetails: txObject,
              emitter
            })
          }
        }, txStallPendingTimeout)

        // Check for confirmed stall status
        setTimeout(() => {
          const transaction = transactionQueue.find(tx => tx.id === id)

          if (
            transaction &&
            transaction.status === 'pending' &&
            blocknative._connected
          ) {
            const eventCode = 'txStallConfirmed'

            handlePreFlightEvent(blocknative, {
              eventCode,
              contractCall,
              balance,
              txDetails: txObject,
              emitter
            })
          }
        }, txStallConfirmedTimeout)

        resolve(id)
      } else {
        reject(
          'sendTransaction function must resolve to a transaction hash that is of type String.'
        )
      }
    }, 10)
  })
}

function gasEstimates(
  gasFunc: () => Promise<string>,
  gasPriceFunc: () => Promise<string>
) {
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
