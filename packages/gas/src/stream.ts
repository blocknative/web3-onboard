import { Observable, timer, zip } from 'rxjs'
import { switchMap, map } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { getRequestUrl } from './utils'
import { StreamOptions, ChainId, GasPlatformResponse } from './types'
import { validateRequest } from './validation'

function stream(
  options: StreamOptions
): Observable<Record<ChainId, GasPlatformResponse>> {
  const invalid = validateRequest(options)

  if (invalid) {
    throw invalid
  }

  const { chains, endpoint, apiKey, poll = 5000 } = options

  const requestUrls = chains.map(chainId =>
    getRequestUrl({ chainId, apiKey, endpoint })
  )

  // start polling
  return timer(0, poll).pipe(
    switchMap(() =>
      // combine results of all chains request in to one stream emission
      zip(
        requestUrls.map(({ url, headers }) =>
          ajax.getJSON<GasPlatformResponse>(url, headers)
        )
      )
    ),
    // reduce to mapping of chainId -> gas data
    map(data =>
      chains.reduce((acc, chainId, index) => {
        acc[chainId] = data[index]
        return acc
      }, {})
    )
  )
}

export default stream
