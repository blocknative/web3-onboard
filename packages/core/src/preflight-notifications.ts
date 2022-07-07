import BigNumber from 'bignumber.js'
import { nanoid } from 'nanoid'
import { get } from 'svelte/store'

import { transactions, app, notifications } from './stores'
import { transactionEventToNotification } from './notify'
import { argsEqual, localNetwork } from './utilities'

import type { EthereumTransactionData } from 'bnc-sdk'

import type {
  PreflightEvent,
  ContractCall,
  TransactionOptions
} from './types'

let transactionQueue: EthereumTransactionData[]
transactions.subscribe(
  (store: EthereumTransactionData[]) => (transactionQueue = store)
)

export function handlePreFlightEvent(
  blocknative,
  preflightEvent: PreflightEvent
) {
  const { eventCode, contractCall, balance, txDetails, status } = preflightEvent

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

  handleTransactionEvent({
    transaction: transaction
  })
}

export function handleTransactionEvent(event) {
  const { transaction, emitterResult } = event
  const currentId = transaction.id
  const transactionId = transaction.hash || transaction.txid

  // returns a boolean indicating whether this transaction state is a new state
  // for an existing transaction or is a new transaction
  const predicate = (txInState: EthereumTransactionData) => {
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

  // create notification if dev hasn't opted out and not connected to a local network
  if (emitterResult !== false && !localNetwork(get(app).networkId)) {
    const transactionObj = transactionQueue.find(predicate)

    if (transactionObj) {
      transactionEventToNotification(transactionObj, emitterResult)
    }
  }
}

export function duplicateTransactionCandidate(
  transaction: EthereumTransactionData,
  contract: ContractCall
) {
  const duplicate: EthereumTransactionData | undefined | boolean =
    transactionQueue.find((tx: EthereumTransactionData) => {
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
  options: TransactionOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    // wrap in set timeout to put to the end of the event queue

    // Might not be necessary to timeout??
    // Instead call transactionHandler
    setTimeout(async () => {
      const {
        sendTransaction,
        estimateGas,
        gasPrice,
        balance,
        contractCall,
        txDetails
      } = options

      // if `balance` or `estimateGas` or `gasPrice` is not provided,
      // then sufficient funds check is disabled
      // if `txDetails` is not provided,
      // then duplicate transaction check is disabled
      // if dev doesn't want notify to intiate the transaction
      // and `sendTransaction` is not provided, then transaction
      // rejected notification is disabled
      // to disable hints for `txAwaitingApproval`, `txConfirmReminder`
      // or any other notification, then return false from listener functions

      const [gas, price] = await gasEstimates(estimateGas, gasPrice)
      const id = nanoid()
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
            txDetails: txObject
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
          txDetails: txObject
        })
      }

      const {
        txApproveReminderTimeout
      } = get(app)

      // check previous transactions awaiting approval
      if (transactionQueue.find(tx => tx.status === 'awaitingApproval')) {
        const eventCode = 'txAwaitingApproval'

        handlePreFlightEvent(blocknative, {
          eventCode,
          contractCall,
          balance,
          txDetails: txObject
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
            txDetails: txObject
          })
        }
      }, txApproveReminderTimeout)

      handlePreFlightEvent(blocknative, {
        eventCode: 'txRequest',
        status: 'awaitingApproval',
        contractCall,
        balance,
        txDetails: txObject
      })

      // if not provided with sendTransaction function, 
      // resolve with id so dev can initiate transaction
      // dev will need to call notify.hash(txHash, id) with this id
      // to link up the preflight with the postflight notifications
      if (!sendTransaction) {
        return resolve(id)
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
