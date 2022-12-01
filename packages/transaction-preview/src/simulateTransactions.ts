import { hexFieldsToNumber } from './utils'
import type {
  TransactionForSim,
  TransactionPreviewInitOptions
} from './types.js'
import type { MultiSimOutput } from 'bnc-sdk'

const simulateTransactions = async (
  options: Omit<TransactionPreviewInitOptions, 'provider'>,
  transactions: TransactionForSim[]
): Promise<MultiSimOutput> => {
  const { sdk } = options
  const cleanedTransactions: TransactionForSim[] = transactions.map(
    transaction => {
      const convertedTransaction = hexFieldsToNumber(
        transaction as TransactionForSim
      )
      const cleanedTrans = {
        from: convertedTransaction.from,
        to: convertedTransaction.to,
        gas: convertedTransaction.gas,
        gasPrice: convertedTransaction.gasPrice,
        maxFeePerGas: convertedTransaction.maxFeePerGas,
        maxPriorityFeePerGas: convertedTransaction.maxPriorityFeePerGas,
        input:
          convertedTransaction.input ||
          transaction.input ||
          transaction.data ||
          '0x',
        value: convertedTransaction.value
      }
      return cleanedTrans
    }
  )

  return sdk.multiSim(cleanedTransactions) as Promise<MultiSimOutput>
}

export default simulateTransactions
