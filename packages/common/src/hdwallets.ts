import type Common from '@ethereumjs/common'
import type { BigNumber } from 'ethers'
import type { CustomNetwork } from './types'
import type { TransactionRequest } from '@ethersproject/providers'

/**
 * Creates the common instance used for signing
 * transactions with hardware wallets
 * @returns the initialized common instance
 */
export const getCommon = async ({
  customNetwork,
  chainId
}: {
  customNetwork?: CustomNetwork
  chainId: number
}): Promise<Common> => {
  const { default: Common, Hardfork } = await import('@ethereumjs/common')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const CommonConstructor: typeof Common = Common.default || Common
  let common: Common
  try {
    common = new CommonConstructor({
      chain: customNetwork || chainId,
      // Berlin is the minimum hardfork that will allow for EIP1559
      hardfork: Hardfork.Berlin,
      // List of supported EIPS
      eips: [1559]
    })
  } catch (e: any) {
    if (e.message && /Chain.*not supported/.test(e.message)) {
      common = CommonConstructor.custom({ chainId })
    } else {
      throw e
    }
  }
  return common
}

/**
 * Takes in TransactionRequest and converts all BigNumber values to strings
 * @param transaction 
 * @returns a transaction where all BigNumber properties are now strings
 */
export const bigNumberFieldsToStrings = (
  transaction: TransactionRequest
): TransactionRequest =>
  Object.keys(transaction).reduce(
    (transaction, txnProperty) => ({
      ...transaction,
      ...((transaction[txnProperty as keyof TransactionRequest] as BigNumber)
        .toHexString
        ? {
            [txnProperty]: (
              transaction[txnProperty as keyof TransactionRequest] as BigNumber
            ).toHexString()
          }
        : {})
    }),
    transaction
  )
