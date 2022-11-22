import type { MultiChain } from 'bnc-sdk'
import type SDK from 'bnc-sdk'
import { configuration } from './configuration.js'
import { handleTransactionUpdates } from './notify.js'

let blocknativeMultiChainSdk: MultiChain
let blocknativeSdk: SDK

/**
 *
 * @returns SDK if apiKey
 */
export async function getBlocknativeMulitChainSdk(): Promise<MultiChain | null> {
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

/**
 *
 * @returns SDK if apiKey
 */
export async function getBlocknativeSdk(): Promise<SDK> {
  const { apiKey } = configuration

  if (!apiKey) return null

  if (!blocknativeSdk) {
    const { default: Blocknative } = await import('bnc-sdk')
    blocknativeSdk = new Blocknative({
      dappId: configuration.apiKey,
      networkId: 1
    })
    return blocknativeSdk
  }

  return blocknativeSdk
}
