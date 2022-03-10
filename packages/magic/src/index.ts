import type { WalletInit, APIKey, EIP1193Provider } from '@web3-onboard/common'

function magic(options: APIKey): WalletInit {
  const { apiKey } = options
  const walletName = 'Magic Wallet'

  return () => {
    return {
      label: walletName,
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ EventEmitter, BigNumber, chains }) => {
        const { Magic } = await import('magic-sdk')
        const { default: Web3 } = await import('web3')
        const loginModal = (await import('./login-modal.js')).default
        const brandingHTML = (await import('./branding.js')).default
        let loggedIn: boolean = false

        const {
          createEIP1193Provider,
          ProviderRpcErrorCode,
          ProviderRpcError
        } = await import('@web3-onboard/common')

        const emitter = new EventEmitter()

        let customNodeOptions = {
          chainId: parseInt(chains[0].id, 10),
          rpcUrl: chains[0].rpcUrl
        }

        let magicInstance = new Magic(apiKey, {
          network: customNodeOptions
        })

        const loginWithEmail = async (emailAddress: string) => {
          await magicInstance.auth.loginWithMagicLink({ email: emailAddress })
          return await magicInstance.user.isLoggedIn()
        }

        const handleLogin = async () => {
          loggedIn = await loginModal({
            walletName: walletName,
            brandingHTMLString: brandingHTML,
            emailLoginFunction: loginWithEmail
          })
        }

        if (!loggedIn) handleLogin()

        let magicProvider = new Web3(magicInstance.rpcProvider)

        let provider: EIP1193Provider

        function patchProvider(): EIP1193Provider {
          provider = createEIP1193Provider(magicProvider, {
            eth_requestAccounts: async () => {
              try {
                if (!loggedIn) handleLogin()
                const accounts = await magicProvider.eth.getAccounts()
                console.log('accounts', accounts)
                return accounts
              } catch (error) {
                console.error('error in request accounts', error)
                const { code } = error as { code: number }
                if (code === -32603) {
                  throw new ProviderRpcError({
                    code: ProviderRpcErrorCode.ACCOUNT_ACCESS_REJECTED,
                    message: 'Account access rejected'
                  })
                }

                return []
              }
            },
            eth_selectAccounts: null,
            eth_getBalance: async () => {
              const address = (await magicProvider.eth.getAccounts())[0]
              const balance = magicProvider.utils.fromWei(
                await magicProvider.eth.getBalance(address) // Balance is in wei
              )
              console.log(balance, address)
              return balance
                ? BigNumber.from(balance).mul('1000000000000000000').toString()
                : '0'
            },
            wallet_switchEthereumChain: async ({ params }) => {
              const chain = chains.find(({ id }) => id === params[0].chainId)
              if (!chain) throw new Error('Chain must be set before switching')

              // re-instantiate instance with new network
              customNodeOptions = {
                chainId: parseInt(chains[0].id, 10),
                rpcUrl: chains[0].rpcUrl
              }

              magicInstance = new Magic(apiKey, {
                network: customNodeOptions
              })

              // get the provider again
              magicProvider = new Web3(magicInstance.rpcProvider)

              emitter.emit('chainChanged', chain.id)

              // patch the provider
              patchProvider()

              return null
            }
          })

          provider.on = emitter.on.bind(emitter)
          provider.disconnect = () => magicInstance.user.logout()

          return provider
        }

        provider = patchProvider()

        return {
          provider,
          magicInstance
        }
      }
    }
  }
}

export default magic
