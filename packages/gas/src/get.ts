import { firstValueFrom, zip } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { getRequestUrl } from './utils.js'
import { RequestOptions, GasPlatformResponse } from './types.js'
import { validateRequest } from './validation.js'

function get(options: RequestOptions): Promise<GasPlatformResponse[]> {
  const invalid = validateRequest(options)

  if (invalid) {
    throw invalid
  }

  const { chains, endpoint } = options

  const requestUrls = chains.map(chainId =>
    getRequestUrl({ chainId, endpoint })
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
