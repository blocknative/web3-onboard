import BlocknativeApi from 'bnc-sdk'

let blocknative: any

export function initializeBlocknative(dappId: string, networkId: number): any {
  blocknative = new BlocknativeApi({
    dappId,
    networkId,
    name: 'Onboard'
  })

  return blocknative
}

export function getBlocknative(): any {
  return blocknative
}
