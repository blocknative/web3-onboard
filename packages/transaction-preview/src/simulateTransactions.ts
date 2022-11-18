import { catchError, firstValueFrom, map, of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { hexFieldsToNumber } from './utils'
import type {
  SimPlatformResponse,
  TransactionObject,
  TransactionPreviewInitOptions
} from './types.js'

const simulateTransactions = async (
  options: Omit<TransactionPreviewInitOptions, 'provider'>,
  transactions: [TransactionObject]
): Promise<SimPlatformResponse> => {
  const { secretKey, apiKey } = options
  const cleanedTransactions = transactions.map(transaction => {
    const convertedTransaction = hexFieldsToNumber(
      transaction as TransactionObject
    )

    const cleanedTrans = {
      ...transaction,
      ...convertedTransaction,
      input: transaction.data || '0x'
    }
    return cleanedTrans
  })

  const body = {
    system: 'ethereum',
    network: 'main',
    transactions: cleanedTransactions
  }
  
  const headers = {
    'Content-Type': 'application/json',
    credentials: `${apiKey}:${secretKey}`
  }

  const sim = ajax({
    url: 'https://api.blocknative.com/simulate',
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  }).pipe(
    map(response => response.response),

    catchError(error => {
      console.error('Error previewing transaction: ', error)
      return of(error)
    })
  )
  return await firstValueFrom(sim)
}

export default simulateTransactions
