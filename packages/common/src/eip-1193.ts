import {
  Balance,
  ChainId,
  EIP1193Provider,
  ProviderAccounts,
  ProviderEvent,
  ProviderInfo,
  ProviderMessage,
  SimpleEventEmitter
} from '@bn-onboard/types'
import { EventCallback, RequestPatch } from './types'
import { ProviderRpcError } from './errors'

/**
 * Takes a provider instance along with events and requests to override and returns an EIP1193 provider
 *
 *  ## Example:
 *
 * *Overriding events: *
 * ```typescript
 * ```
 *
 * @param provider The provider to patch
 * @param requestPatch An `object` with the method to patch and the implementation with which to patch
 * @param events Events to patch
 * @returns An EIP1193 Provider
 */
export const createEIP1193Provider = (
  provider: any,
  requestPatch?: RequestPatch,
  events?: Record<
    keyof SimpleEventEmitter,
    EventCallback | EIP1193Provider['on']
  >
): EIP1193Provider => {
  let baseRequest: any
  if (provider.request) {
    // Copy the original request method and bind the provider context to it
    baseRequest = provider.request.bind(provider)
  } else if (provider.sendAsync) {
    baseRequest = createRequest(provider)
  }

  const request: EIP1193Provider['request'] = ({ method, params }) => {
    const key = method as keyof RequestPatch

    // If the request method is set to null this indicates this method is not supported
    if (requestPatch?.[key] === null) {
      throw new ProviderRpcError({
        code: 4200,
        message: `The Provider does not support the requested method: ${method}`
      })
    }

    if (requestPatch?.[key]) {
      // @ts-ignore // @TODO - Fix this type error
      return requestPatch[key]?.(baseRequest, params)
    } else {
      return baseRequest?.({ method, params })
    }
  }
  provider.request = request

  patchEvents(provider, events)

  return provider
}
/**
 *
 * Example:
 * ```typescript
 * {
 *  // Override the listener completely
 *  on: () => {},
 *  // Only transform the value for a particular event
 *  // The return value gets passed to original listener
 *  on: { chainChanged: (chainId) => `${chainId}` }
 * }
 * ```
 * @param provider
 * @param events
 */
const patchEvents = (
  provider: any,
  events?: Record<
    keyof SimpleEventEmitter,
    EventCallback | EIP1193Provider['on']
  >
) => {
  if (events) {
    // Override provider event implementations
    Object.entries(events).forEach(([method, implementation]) => {
      const eventListener: SimpleEventEmitter['on' | 'removeListener'] =
        provider[method].bind(provider)

      // Check if it is in this form - `{ on: { chainChanged: (chainId) => `${chainId}` } }`
      // If it is then we need to patch the specific event
      if (typeof implementation === 'object') {
        // Overwrite the listener method (e.g. `on`) such that when called will create a listener
        // with our value transformer
        provider[method] = ((
          event: ProviderEvent,
          listener: (
            value:
              | string
              | ProviderRpcError
              | ProviderInfo
              | ProviderMessage
              | ProviderAccounts
          ) => void
        ) => {
          if (implementation[event]) {
            // Wrap the callback value transformer in the original listener
            eventListener &&
              eventListener(
                event,
                (
                  value:
                    | ProviderInfo
                    | ProviderRpcError
                    | ProviderMessage
                    | ChainId
                    | ProviderAccounts
                ) => {
                  if (value && event) {
                    const transformedValue = implementation?.[event]?.(value)
                    if (transformedValue) {
                      listener(transformedValue)
                    } else {
                      listener(value)
                    }
                  }
                }
              )
          } else {
            eventListener && eventListener(event, listener)
          }
        }) as SimpleEventEmitter['on' | 'removeListener']
      } else {
        provider[method] = implementation
      }
    })
  }
}
interface JsonRpcResponse {
  id: string | undefined
  jsonrpc: '2.0'
  method: string
  result?: ProviderAccounts | Balance | ProviderAccounts | ChainId | null
  error?: string
}

const createRequest = (provider: any): EIP1193Provider['request'] =>
  (({ method, params }) =>
    new Promise((resolve, reject) => {
      provider.sendAsync(
        {
          id: 0,
          jsonrpc: '2.0',
          method,
          params
        },
        (error: string, { result }: JsonRpcResponse) => {
          if (error) {
            reject(JSON.parse(error))
          } else {
            if (result) {
              resolve((result as any) ?? null)
            }
          }
        }
      )
    })) as EIP1193Provider['request']
