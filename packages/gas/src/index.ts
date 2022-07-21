import { timer, Observable, zip } from 'rxjs'
import { switchMap, shareReplay, map } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import type {
  EstimateOptions,
  GasInit,
  GasEstimateData,
  ChainId
} from './types'
import { validateEstimateOptions, validateInit } from './validation'

export * from './types'

export type GasAPI = {
  /**@returns a stream of price estimates with likelyhood of getting in to the next block */
  estimates: typeof estimates
}

let apiKey
let defaultPoll = 5000

function gas(init: GasInit): GasAPI {
  const invalid = validateInit(init)

  if (invalid) {
    throw invalid
  }

  const { apiKey: key, defaultPoll: poll } = init

  apiKey = key
  defaultPoll = poll || defaultPoll

  return {
    estimates
  }
}

function estimates(
  options: EstimateOptions
): Observable<Record<ChainId, GasEstimateData>> {
  const invalid = validateEstimateOptions(options)

  if (invalid) {
    throw invalid
  }

  const { chains, poll = defaultPoll } = options

  // start polling
  return timer(0, poll).pipe(
    switchMap(() =>
      // combine results of all chains request in to one stream emission
      zip(
        chains.map(id =>
          ajax.getJSON<GasEstimateData>(
            `https://api.blocknative.com/gasprices/blockprices?chainid=${parseInt(
              id,
              16
            )}`,
            {
              authorization: apiKey
            }
          )
        )
      )
    ),
    // reduce array of gas data in to mapping of chainId -> GasEstimateData
    map(chainsGasData =>
      chains.reduce((acc, id, index) => {
        acc[id] = chainsGasData[index]
        return acc
      }, {})
    ),
    shareReplay(1)
  )
}

export default gas
