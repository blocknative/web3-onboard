import type Blocknative from 'bnc-sdk'

let blocknativeSdk: Blocknative

export async function getBlocknativeSdk() {
  if (!blocknativeSdk) {
    const { default: SDK } = await import('bnc-sdk')
    blocknativeSdk = new SDK({
      dappId: '',
      multichain: true
    })
  }
}
