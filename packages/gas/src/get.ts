import { firstValueFrom, zip } from 'rxjs'
import { map } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { getRequestUrl } from './utils'
import { RequestOptions, ChainId, GasPlatformResponse } from './types'
import { validateRequest } from './validation'

function get(
  options: RequestOptions
): Promise<Record<ChainId, GasPlatformResponse>> {
  const invalid = validateRequest(options)

  if (invalid) {
    throw invalid
  }

  const { chains, endpoint, apiKey } = options

  const requestUrls = chains.map(chainId =>
    getRequestUrl({ chainId, apiKey, endpoint })
  )

  return firstValueFrom(
    // get data
    zip(
      requestUrls.map(({ url, headers }) =>
        ajax.getJSON<GasPlatformResponse>(url, headers)
      )
    ).pipe(
      // reduce to mapping of chainId -> gas data
      map(data =>
        chains.reduce((acc, chainId, index) => {
          acc[chainId] = data[index]
          return acc
        }, {})
      )
    )
  )
}

export default get
