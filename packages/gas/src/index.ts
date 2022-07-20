import { timer, Observable } from 'rxjs'
import { switchMap, shareReplay } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import type { BlockPricesOptions, GasInit, BlockPriceData } from 'types'
import { validateBlockPricesOptions, validateInit } from 'validation'

export * from './types'

function gas(init: GasInit) {
  const invalid = validateInit(init)

  if (invalid) {
    throw invalid
  }

  const { apiKey } = init

  return {
    blockPrices: blockPrices(apiKey)
  }
}

function blockPrices(apiKey: string) {
  return (options: BlockPricesOptions): Observable<BlockPriceData> => {
    const invalid = validateBlockPricesOptions(options)

    if (invalid) {
      throw invalid
    }

    const { chainId, poll = 5000 } = options
    const decimalChainId = parseInt(chainId, 16)

    return timer(0, poll).pipe(
      switchMap(() =>
        ajax.getJSON<BlockPriceData>(
          `https://api.blocknative.com/gasprices/blockprices?chainid=${decimalChainId}`,
          {
            authorization: apiKey
          }
        )
      ),
      shareReplay(1)
    )
  }
}

export default gas
