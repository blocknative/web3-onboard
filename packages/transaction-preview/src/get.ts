import { firstValueFrom, zip } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { RequestOptions, SimPlatformResponse } from './types.js'

function get(options: RequestOptions): Promise<SimPlatformResponse[]> {
  const { apiKey } = options

  const headers = { authorization: apiKey }
  return firstValueFrom(
    zip(
      ajax.getJSON<SimPlatformResponse>(
        'https://api.blocknative.com/simulate',
        headers
      )
    )
  )
}

export default get
