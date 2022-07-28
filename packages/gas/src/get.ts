import { firstValueFrom, zip } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { getRequestUrl } from './utils'
import { RequestOptions, ChainId, GasPlatformResponse } from './types'
import { validateRequest } from './validation'

function get(options: RequestOptions): Promise<GasPlatformResponse[]> {
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
    )
  )
}

export default get
