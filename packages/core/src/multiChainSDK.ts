
let sdk:MultiChainWebSocket
export function initMultiChainSDK(dappId: string)
// :MultiChainWebSocket 
{
  if (sdk) return sdk

  if (!dappId) {
    throw 'Multi Chain SDK not yet initialized, API Key is required to initialize the Multi Chain SDK'
  }

  sdk = new MultiChainWebSocket({apiKey: dappId})


  return sdk

}

export function getMultiChainSDK() {
  if (sdk) return sdk
  throw 'Multi Chain SDK not yet initialized, API Key is required to initialize the Multi Chain SDK'
}
