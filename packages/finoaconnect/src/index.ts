import { FinoaEIP1193Provider } from '@finoa/finoa-connect-sdk'
import type { Chain, WalletInit } from '@web3-onboard/common'

export interface FinoaWalletOption {
  url?: string
  labelSuffix?: string
}

function finoaConnect(option?: string | FinoaWalletOption): WalletInit {
  const { url, labelSuffix }: FinoaWalletOption =
    typeof option === 'string' ? { url: option } : !option ? {} : option

  return () => {
    return {
      label: `Finoa Wallet${labelSuffix == null ? '' : ' - ' + labelSuffix}`,
      getIcon: async () => (await import('./icon')).default,
      getInterface: async ({ chains }) => {
        const {
          FinoaEIP1193Provider,
          FinoaBrowserClient,
          UnsupportedRequestError
        } = await import('@finoa/finoa-connect-sdk')

        const { request } = await import('./fetch-rpc')

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
                    let chain: Chain | undefined
                    try {
                      const chainIdN = BigInt(err.chainId)
                      chain = chains.find(
                        chain => BigInt(chain.id) === chainIdN
                      )
                    } catch {
                      /* empty */
                    }
                    if (chain?.rpcUrl == null) {
                      throw err
                    }
                    return await request(chain.rpcUrl, ...args)
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