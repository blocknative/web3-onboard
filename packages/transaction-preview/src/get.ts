import { ajax } from 'rxjs/ajax'
import { RequestOptions, SimPlatformResponse } from './types.js'
import { validateRequest } from './validation.js'

function get(options: RequestOptions): Promise<SimPlatformResponse[]> {
  const invalid = validateRequest(options)

  if (invalid) {
    throw invalid
  }

  const { enableUI, transactions, apiKey } = options

  return ajax.getJSON<SimPlatformResponse>(url, headers)
}

export default get
