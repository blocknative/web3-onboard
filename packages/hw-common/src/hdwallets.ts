import type Common from '@ethereumjs/common'
import type { EIP1193Provider, RPCResponse } from '@web3-onboard/common'
import type { CustomNetwork } from './type'
import type { BigNumber, providers } from 'ethers'

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

  const commonOptions = {
    // Berlin is the minimum hardfork that will allow for EIP1559
    hardfork: Hardfork.Berlin,
    // List of supported EIPS
    eips: [1559]
  }
  let common: Common
  try {
    common = new CommonConstructor({
      chain: customNetwork || chainId,
      ...commonOptions
    })
  } catch (e: any) {
    if (e.message && /Chain.*not supported/.test(e.message)) {
      common = CommonConstructor.custom({ chainId }, commonOptions)
    } else {
      throw e
    }
  }
  return common
}

type StringifiedTransactionRequest = Omit<
  providers.TransactionRequest,
  | 'nonce'
  | 'gasLimit'
  | 'gasPrice'
  | 'value'
  | 'maxPriorityFeePerGas'
  | 'maxFeePerGas'
> & {
  nonce: string
  gasLimit: string
  gasPrice?: string
  value: string
  maxPriorityFeePerGas?: string
  maxFeePerGas?: string
}

/**
 * Takes in TransactionRequest and converts all BigNumber values to strings
 * @param transaction
 * @returns a transaction where all BigNumber properties are now strings
 */
export const bigNumberFieldsToStrings = (
  transaction: providers.TransactionRequest
): StringifiedTransactionRequest =>
  Object.keys(transaction).reduce(
    (transaction, txnProperty) => ({
      ...transaction,
      ...((
        transaction[
          txnProperty as keyof providers.TransactionRequest
        ] as BigNumber
      ).toHexString
        ? {
            [txnProperty]: (
              transaction[
                txnProperty as keyof providers.TransactionRequest
              ] as BigNumber
            ).toHexString()
          }
        : {})
    }),
    transaction
  ) as StringifiedTransactionRequest

/**
 * Helper method for hardware wallets to build an object
 * with a request method used for making rpc requests.
 * @param getRpcUrl - callback used to get the current chain's rpc url
 * @returns An object with a request method
 * to be called when making rpc requests
 */
export const getHardwareWalletProvider = (
  getRpcUrl: () => string
): { request: EIP1193Provider['request'] } => ({
  request: ({ method, params }) =>
    fetch(getRpcUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: '42',
        method,
        params
      })
    }).then(async res => {
      const response = (await res.json()) as RPCResponse
      if ('error' in response) {
        throw response.error
      }
      return response.result
    })
})
