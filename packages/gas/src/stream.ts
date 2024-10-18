import { Observable, timer, zip } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { getRequestUrl } from './utils.js'
import { StreamOptions, GasPlatformResponse } from './types.js'
import { validateRequest } from './validation.js'

function stream(options: StreamOptions): Observable<GasPlatformResponse[]> {
  const invalid = validateRequest(options)

  if (invalid) {
    throw invalid
  }

  const { chains, endpoint, poll = 5000 } = options

  const requestUrls = chains.map(chainId =>
    getRequestUrl({ chainId, endpoint })
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
    )
  )
}

export default stream
