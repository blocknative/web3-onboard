import type { MultichainSDK } from 'bnc-sdk'
import { internalState } from './internals'

let blocknativeSdk: MultichainSDK

/**
 *
 * @returns SDK if apikey
 */
export async function getBlocknativeSdk(): Promise<MultichainSDK | null> {
  const { apiKey } = internalState

  if (!apiKey) return null

  if (!blocknativeSdk) {
    const { MultichainSDK } = await import('bnc-sdk')
    blocknativeSdk = new MultichainSDK({
      apiKey: internalState.apiKey
    })
  }

  return blocknativeSdk
}
