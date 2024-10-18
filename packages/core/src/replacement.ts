import type { EthereumTransactionData, Network } from 'bnc-sdk'
import { bigIntToHex } from '@web3-onboard/common'
import { configuration } from './configuration.js'
import { state } from './store/index.js'
import type { WalletState } from './types.js'
import { gweiToWeiHex, networkToChainId, toHexString } from './utils.js'
import type { GasPrice } from '@web3-onboard/gas'

const ACTIONABLE_EVENT_CODES: string[] = ['txPool']
const VALID_GAS_NETWORKS: Network[] = ['main', 'matic-main']

const WALLETS_SUPPORT_REPLACEMENT: WalletState['label'][] = [
  'Ledger',
  'Trezor',
  'Keystone',
  'KeepKey',
  `D'CENT`
]

export const actionableEventCode = (eventCode: string): boolean =>
  ACTIONABLE_EVENT_CODES.includes(eventCode)

export const validGasNetwork = (network: Network): boolean =>
  VALID_GAS_NETWORKS.includes(network)

export const walletSupportsReplacement = (wallet: WalletState): boolean =>
  wallet && WALLETS_SUPPORT_REPLACEMENT.includes(wallet.label)

export async function replaceTransaction({
  type,
  wallet,
  transaction
}: {
  type: 'speedup' | 'cancel'
  wallet: WalletState
  transaction: EthereumTransactionData
}): Promise<unknown> {
  const { from, input, value, to, nonce, gas: gasLimit, network } = transaction

  const chainId = networkToChainId[network]

  const { gasPriceProbability } = state.get().notify.replacement as {
    gasPriceProbability?:
      | { speedup?: number | undefined; cancel?: number | undefined }
      | undefined
  }

  const { gas } = configuration
  if (!gas) return
  // get gas price
  const [gasResult] = await gas.get({
    chains: [networkToChainId[network]],
    endpoint: 'blockPrices'
  })

  const { maxFeePerGas, maxPriorityFeePerGas } =
    (gasResult.blockPrices[0].estimatedPrices.find(
      ({ confidence }) =>
        confidence ===
        (type === 'speedup'
          ? gasPriceProbability?.speedup
          : gasPriceProbability?.cancel)
    ) as GasPrice) || {}

  if (!maxFeePerGas || !maxPriorityFeePerGas) return

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
        value: bigIntToHex(BigInt(value)),
        nonce: toHexString(nonce),
        gasLimit: toHexString(gasLimit),
        maxFeePerGas: maxFeePerGasWeiHex,
        maxPriorityFeePerGas: maxPriorityFeePerGasWeiHex,
        ...dataObj
      }
    ]
  })
}
