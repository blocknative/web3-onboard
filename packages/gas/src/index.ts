import { timer, Observable } from 'rxjs'
import { switchMap, shareReplay } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import type { EstimateOptions, GasInit, GasEstimateData } from './types'
import { validateEstimateOptions, validateInit } from './validation'

export * from './types'

export type GasAPI = {
  /**Returns a stream of price estimates with likelyhood of getting in to the next block */
  estimates: typeof estimates
}

let apiKey

function gas(init: GasInit): GasAPI {
  const invalid = validateInit(init)

  if (invalid) {
    throw invalid
  }

  apiKey = init.apiKey

  return {
    estimates
  }
}

function estimates(options: EstimateOptions): Observable<GasEstimateData> {
  const invalid = validateEstimateOptions(options)

  if (invalid) {
    throw invalid
  }

  const { chainId, poll = 5000 } = options
  const decimalChainId = parseInt(chainId, 16)

  return timer(0, poll).pipe(
    switchMap(() =>
      ajax.getJSON<GasEstimateData>(
        `https://api.blocknative.com/gasprices/blockprices?chainid=${decimalChainId}`,
        {
          authorization: apiKey
        }
      )
    ),
    shareReplay(1)
  )
}

export default gas
