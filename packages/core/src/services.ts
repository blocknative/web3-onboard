import type { MultiChain } from 'bnc-sdk'
import { configuration } from './configuration.js'
import { handleTransactionUpdates } from './notify.js'

let blocknativeSdk: MultiChain

/**
 *
 * @returns SDK if apikey
 */
export async function getBlocknativeSdk(): Promise<MultiChain | null> {
  const { apiKey } = configuration

  if (!apiKey) return null

  if (!blocknativeSdk) {
    const { default: Blocknative } = await import('bnc-sdk')
    blocknativeSdk = Blocknative.multichain({
      apiKey: configuration.apiKey
    })

    blocknativeSdk.transactions$.subscribe(handleTransactionUpdates)
  }

  return blocknativeSdk
}
