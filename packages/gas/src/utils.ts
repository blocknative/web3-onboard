import { ChainId, RequestEndpoint } from './types.js'

export function getRequestUrl({
  chainId,
  endpoint
}: {
  chainId: ChainId
  endpoint: RequestEndpoint
}): { url: string; headers: { authorization?: string } } {
  switch (endpoint) {
    case 'blockPrices':
      return {
        url: `https://api.blocknative.com/gasprices/blockprices?chainid=${parseInt(
          chainId,
          16
        )}`,
        headers: {}
      }
    default:
      throw new Error(`Unrecognized request endpoint: ${endpoint}`)
  }
}
