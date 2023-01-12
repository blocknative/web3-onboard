import type { WalletInit } from '@web3-onboard/common'
import type { TorusCtorArgs, TorusParams } from '@toruslabs/torus-embed'

type TorusOptions = TorusCtorArgs & TorusParams

function torus(options?: TorusOptions): WalletInit {
  const {
    buttonPosition,
    modalZIndex,
    apiKey,
    buildEnv,
    enableLogging,
    loginConfig,
    showTorusButton,
    integrity,
    whiteLabel,
    skipTKey
  } = options || {}

  return () => {
    return {
      label: 'Torus',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ chains }) => {
        const { default: Torus } = await import('@toruslabs/torus-embed')

        const {
          createEIP1193Provider,
          ProviderRpcErrorCode,
          ProviderRpcError
        } = await import('@web3-onboard/common')

        const [chain] = chains

        let instance = new Torus({
          buttonPosition,
          modalZIndex,
          apiKey
        })

        await instance.init({
          buildEnv,
          enableLogging,
          network: {
            host: chain.rpcUrl,
            chainId: parseInt(chain.id),
            networkName: chain.label
          },
          showTorusButton: showTorusButton,
          loginConfig,
          integrity,
          whiteLabel,
          skipTKey
        })

        const torusProvider = instance.provider

        // patch the chainChanged event
        const on = torusProvider.on.bind(torusProvider)
        torusProvider.on = (event, listener) => {
          on(event, val => {
            if (event === 'chainChanged') {
              listener(`0x${(val as number).toString(16)}`)
              return
            }

            listener(val)
          })

          return torusProvider
        }

        const provider = createEIP1193Provider(torusProvider, {
          eth_requestAccounts: async () => {
            try {
              const accounts = await instance.login()
              return accounts
            } catch (error) {
              throw new ProviderRpcError({
                code: ProviderRpcErrorCode.ACCOUNT_ACCESS_REJECTED,
                message: 'Account access rejected'
              })
            }
          },
          eth_selectAccounts: null,
          wallet_switchEthereumChain: async ({ params }) => {
            const chain = chains.find(({ id }) => id === params[0].chainId)
            if (!chain) throw new Error('chain must be set before switching')

            await instance.setProvider({
              host: chain.rpcUrl,
              chainId: parseInt(chain.id),
              networkName: chain.label
            })

            return null
          },
          eth_chainId: async ({ baseRequest }) => {
            const chainId = await baseRequest({ method: 'eth_chainId' })
            return `0x${parseInt(chainId).toString(16)}`
          }
        })

        provider.disconnect = () => instance.cleanUp()

        return {
          provider,
          instance
        }
      }
    }
  }
}

export default torus
