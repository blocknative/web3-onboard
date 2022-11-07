import type { providers } from 'ethers'

/**
 * Takes in TransactionRequest and converts all Hex values to numbers
 * @param transaction
 * @returns a transaction where all Hex properties are now numbers
 */
export const hexFieldsToNumber = (
  transaction: providers.TransactionRequest
): TransactionRequestWithNumberFields =>
  Object.keys(transaction).reduce(
    (transaction, txnProperty) => ({
      ...transaction,
      ...(typeof transaction[
        txnProperty as keyof providers.TransactionRequest
      ] === 'string' &&
      transaction[txnProperty].includes('0x') &&
      txnProperty !== 'to' &&
      txnProperty !== 'input' &&
      txnProperty !== 'data' &&
      txnProperty !== 'from'
        ? {
            [txnProperty]: parseInt(
              transaction[
                txnProperty as keyof providers.TransactionRequest
              ] as string,
              16
            )
          }
        : {})
    }),
    transaction
  ) as TransactionRequestWithNumberFields

type TransactionRequestWithNumberFields = {
  gas: number
  value: number
  gasPrice?: number
  maxPriorityFeePerGas?: number
  maxFeePerGas?: number
}
