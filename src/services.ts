import blocknativeApi from "bnc-sdk"

let blocknative: any

export function initializeBlocknative(dappId: string, networkId: number): any {
  blocknative = blocknativeApi({
    dappId,
    networkId
  })

  return blocknative
}

export function getBlocknative(): any {
  return blocknative
}
