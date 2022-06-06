import type { MultichainSDK } from 'bnc-sdk'
import { configuration } from './configuration'

let blocknativeSdk: MultichainSDK

/**
 *
 * @returns SDK if apikey
 */
export async function getBlocknativeSdk(): Promise<MultichainSDK | null> {
  const { apiKey } = configuration

  if (!apiKey) return null

  if (!blocknativeSdk) {
    const { MultichainSDK } = await import('bnc-sdk')
    blocknativeSdk = new MultichainSDK({
      apiKey: configuration.apiKey
    })
  }

  return blocknativeSdk
}
