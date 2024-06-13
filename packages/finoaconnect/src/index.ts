import { FinoaEIP1193Provider } from '@finoa/finoa-connect-sdk'
import { ProviderRpcError, ProviderRpcErrorCode, type WalletInit } from '@web3-onboard/common'

/** Optional object provided to the initiation of the wallet connector. 
 * When not included, the wallet connector service connects to FinoaConnect production systems.
 * @field {url} URL of the FinoaConnect backend systems to be used
 * @field {labelSuffix} arbitrary string label to denote the context of the URL field  */
export interface FinoaWalletOption {
  url?: string
  labelSuffix?: string
}

function finoaConnect(option?: string | FinoaWalletOption): WalletInit {
  const { url, labelSuffix }: FinoaWalletOption =
    typeof option === 'string' ? { url: option } : !option ? {} : option

  return () => {
    return {
      label: `FinoaConnect${labelSuffix == null ? '' : ' - ' + labelSuffix}`,
      getIcon: async () => (await import('./icon')).default,
      getInterface: async ({ chains }) => {
        const {
          FinoaEIP1193Provider,
          FinoaBrowserClient,
          UnsupportedRequestError
        } = await import('@finoa/finoa-connect-sdk')

        const client = new FinoaBrowserClient({
          windowUrl: url
        })
        const provider = new FinoaEIP1193Provider({
          client
        })

        const proxyProvider = new Proxy(provider, {
          get(target, property: keyof FinoaEIP1193Provider) {
            const source = target[property]
            if (property === 'request') {
              return async function (
                this: FinoaEIP1193Provider,
                ...args: Parameters<FinoaEIP1193Provider['request']>
              ) {

                try {
                  return await (source as FinoaEIP1193Provider['request']).call(
                    this,
                    ...args
                  )
                } catch (err) {
                  if (err instanceof UnsupportedRequestError) {
                    throw new ProviderRpcError({
                      code: ProviderRpcErrorCode.UNSUPPORTED_METHOD,
                      message: `FinoaConnect Provider does not support the requested method: ${args[0].method}`
                    })
                  }
                  throw err
                }
              }
            }
            return source
          }
        })

        return {
          provider: proxyProvider
        }
      }
    }
  }
}

export default finoaConnect