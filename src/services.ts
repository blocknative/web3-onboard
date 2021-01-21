import BlocknativeApi from 'bnc-sdk'

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
  return blocknative
}
