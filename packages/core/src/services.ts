import type { MultiChain } from 'bnc-sdk'
import { configuration } from './configuration.js'
import { handleTransactionUpdates } from './notify.js'

let blocknativeMultiChainSdk: MultiChain

/**
 *
 * @returns MultiChain SDK if apiKey
 */

export async function getBNMulitChainSdk(): Promise<MultiChain | null> {
  const { apiKey } = configuration

  if (!apiKey) return null

  if (!blocknativeMultiChainSdk) {
    const { default: Blocknative } = await import('bnc-sdk')
    blocknativeMultiChainSdk = Blocknative.multichain({
      apiKey: configuration.apiKey
    })

    blocknativeMultiChainSdk.transactions$.subscribe(handleTransactionUpdates)
  }

  return blocknativeMultiChainSdk
}
