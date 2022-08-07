import type { EthereumTransactionData, Network } from 'bnc-sdk'
import { BigNumber } from 'ethers'
import { configuration } from './configuration'
import { state } from './store'
import type { WalletState } from './types'
import { gweiToWeiHex, networkToChainId, toHexString } from './utils'

const ACTIONABLE_EVENT_CODES: string[] = ['txPool']
const VALID_GAS_NETWORKS: Network[] = ['main', 'matic-main']

const WALLETS_SUPPORT_REPLACEMENT: WalletState['label'][] = [
  'Ledger',
  'Trezor',
  'Keystone',
  'Keepkey'
]

export const actionableEventCode = (eventCode: string): boolean =>
  eventCode in ACTIONABLE_EVENT_CODES

export const validGasNetwork = (network: Network): boolean =>
  network in VALID_GAS_NETWORKS

export const walletSupportsReplacement = (wallet: WalletState): boolean =>
  wallet && wallet.label in WALLETS_SUPPORT_REPLACEMENT

export function replaceTransaction({
  type,
  wallet,
  transaction
}: {
  type: 'speedup' | 'cancel'
  wallet: WalletState
  transaction: EthereumTransactionData
}) {
  return async (): Promise<unknown> => {
    const {
      from,
      input,
      value,
      to,
      nonce,
      gas: gasLimit,
      network
    } = transaction

    const chainId = networkToChainId[network]

    const { gasPriceProbability } = state.get().notify.replacement
    const { gas, apiKey } = configuration

    // get gas price
    const [gasResult] = await gas.get({
      chains: [networkToChainId[network]],
      endpoint: 'blockPrices',
      apiKey
    })

    const { maxFeePerGas, maxPriorityFeePerGas } =
      gasResult.blockPrices[0].estimatedPrices.find(
        ({ confidence }) =>
          confidence ===
          (type === 'speedup'
            ? gasPriceProbability.speedup
            : gasPriceProbability.cancel)
      )

    const maxFeePerGasWeiHex = gweiToWeiHex(maxFeePerGas)
    const maxPriorityFeePerGasWeiHex = gweiToWeiHex(maxPriorityFeePerGas)

    // Some wallets do not like empty '0x' val
    const dataObj = input === '0x' ? {} : { data: input }

    return wallet.provider.request({
      method: 'eth_sendTransaction',
      params: [
        {
          type: '0x2',
          from,
          to: type === 'cancel' ? from : to,
          chainId: parseInt(chainId),
          value: `${BigNumber.from(value).toHexString()}`,
          nonce: toHexString(nonce),
          gasLimit: toHexString(gasLimit),
          maxFeePerGas: maxFeePerGasWeiHex,
          maxPriorityFeePerGas: maxPriorityFeePerGasWeiHex,
          ...dataObj
        }
      ]
    })
  }
}
