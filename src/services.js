import blocknativeApi from "bn-sdk"

let blocknative

export function initializeBlocknative(dappId, networkId) {
  blocknative = blocknativeApi({
    dappId,
    networkId
  })

  return blocknative
}

export function getBlocknative() {
  return blocknative
}
