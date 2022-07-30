import { ChainId, RequestEndpoint } from './types'

export function getRequestUrl({
  chainId,
  endpoint,
  apiKey
}: {
  chainId: ChainId
  endpoint: RequestEndpoint
  apiKey?: string
}): { url: string; headers: { authorization?: string } } {
  switch (endpoint) {
    case 'blockPrices':
      return {
        url: `https://api.blocknative.com/gasprices/blockprices?chainid=${parseInt(
          chainId,
          16
        )}`,
        headers: apiKey
          ? {
              authorization: apiKey
            }
          : {}
      }
    default:
      throw new Error(`Unrecognized request endpoint: ${endpoint}`)
  }
}
