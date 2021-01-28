import BlocknativeApi from 'bnc-sdk'
import { get } from 'svelte/store'
import { app } from '../stores'

let blocknative: any

export function initializeBlocknative(
  dappId: string,
  networkId: number,
  apiUrl?: string
): any {
  blocknative = new BlocknativeApi({
    dappId,
    networkId,
    name: 'Onboard',
    apiUrl
  })
  return blocknative
}

export function getBlocknative(): any {
  if (!blocknative) {
    const {dappId, networkId, apiUrl} = get(app)
    initializeBlocknative(dappId, networkId, apiUrl)
  }
  return blocknative
}
