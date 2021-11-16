import type Blocknative from 'bnc-sdk'
import type { ChainId } from '@onboard/types'
import { internalState$ } from '../streams'

export async function getBlocknative(chainId: ChainId): Promise<Blocknative> {
  const { sdkInstances, apiKey } = internalState$.getValue()
  if (!apiKey) throw 'apiKey is needed to initialize Blocknative SDK'

  const chainIdDecimal =
    typeof chainId === 'string' ? parseInt(chainId, 16) : chainId

  if (!sdkInstances[chainIdDecimal]) {
    const { default: BlocknativeSDK } = await import('bnc-sdk')

    sdkInstances[chainIdDecimal] = new BlocknativeSDK({
      dappId: apiKey,
      system: 'ethereum',
      networkId: chainIdDecimal
    })
  }

  return sdkInstances[chainIdDecimal] as Blocknative
}
