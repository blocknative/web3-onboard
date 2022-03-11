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
        const loginModal = (await import('./login-modal.js')).default
        const brandingHTML = (await import('./branding.js')).default
        let loggedIn: boolean = false

        const {
          createEIP1193Provider,
          ProviderRpcErrorCode,
          ProviderRpcError
        } = await import('@web3-onboard/common')

        const emitter = new EventEmitter()

        let currentChain = chains[0].id

        let customNodeOptions = {
          chainId: parseInt(chains[0].id, 10),
          rpcUrl: chains[0].rpcUrl
        }

        let magicInstance = new Magic(apiKey, {
          network: customNodeOptions
        })

        const loginWithEmail = async (emailAddress: string) => {
          try {
            await magicInstance.auth.loginWithMagicLink({ email: emailAddress })
            return await magicInstance.user.isLoggedIn()
          } catch (err) {
            throw new Error(
              `$An error occured while connecting your Magic wallet, please try again: ${err}`
            )
          }
        }

        const handleLogin = async () => {
          loggedIn = await loginModal({
            walletName: walletName,
            brandingHTMLString: brandingHTML,
            emailLoginFunction: loginWithEmail
          })
        }

        if (!loggedIn) await handleLogin()

        let magicProvider = magicInstance.rpcProvider
        let provider: EIP1193Provider

        function patchProvider(): EIP1193Provider {
          provider = createEIP1193Provider(magicProvider.enable(), {
            eth_requestAccounts: async () => {
              try {
                if (!loggedIn) await handleLogin()
                const accounts = await magicProvider.request({
                  method: 'eth_accounts'
                })
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
              const address = (
                await magicProvider.request({
                  method: 'eth_accounts'
                })
              )[0]
              const balance = await magicProvider.request({
                method: 'eth_getBalance',
                params: [address, 'latest']
              })
              return balance
                ? BigNumber.from(balance).mul('1000000000000000000').toString()
                : '0'
            },
            wallet_switchEthereumChain: async ({ params }) => {
              const chain = chains.find(({ id }) => id === params[0].chainId)
              if (!chain) throw new Error('Chain must be set before switching')
              currentChain = chain.id
              // re-instantiate instance with new network
              customNodeOptions = {
                chainId: parseInt(chains[0].id, 10),
                rpcUrl: chains[0].rpcUrl
              }

              magicInstance = new Magic(apiKey, {
                network: customNodeOptions
              })

              magicProvider = magicInstance.rpcProvider

              emitter.emit('chainChanged', chain.id)

              patchProvider()

              return null
            },
            eth_accounts: async () => {
              const accounts = (
                await magicProvider.request({
                  method: 'eth_accounts'
                })
              )[0]
              return Array.isArray(accounts) && accounts.length
                ? [accounts[0]]
                : []
            },
            eth_sign: async ({ params: [address, message] }) => {
              const receipt = await magicProvider.send('eth_sign', [
                address,
                message
              ])
              return receipt &&
                receipt.hasOwnProperty('tx') &&
                receipt.tx.hasOwnProperty('hash')
                ? receipt.tx.hash
                : ''
            },
            eth_signTypedData: async ({ params: [address, typedData] }) => {
              const receipt = await magicProvider.send('eth_sign', [
                address,
                typedData
              ])
              return receipt &&
                receipt.hasOwnProperty('tx') &&
                receipt.tx.hasOwnProperty('hash')
                ? receipt.tx.hash
                : ''
            },
            eth_chainId: async () => {
              return currentChain ? currentChain : ''
            },

            eth_signTransaction: async ({ params: [transactionObject] }) => {
              const fromAddress = (
                await magicProvider.request({
                  method: 'eth_accounts'
                })
              )[0]

              let destination
              if (transactionObject.hasOwnProperty('to')) {
                destination = transactionObject.to
              }

              const receipt = await magicProvider.send(
                'eth_signTransaction',
                [
                  {
                    ...transactionObject,
                    nonce:
                      transactionObject.hasOwnProperty('nonce') &&
                      typeof transactionObject.nonce === 'number'
                        ? parseInt(transactionObject.nonce)
                        : '',
                    from: fromAddress,
                    to: destination
                  }
                ]
              )
              return receipt &&
                receipt.hasOwnProperty('tx') &&
                receipt.tx.hasOwnProperty('hash')
                ? receipt.tx.hash
                : ''
            }
          })

          provider.on = emitter.on.bind(emitter)
          provider.disconnect = () => magicInstance.user.logout()

          return provider
        }

        provider = patchProvider()

        return {
          provider,
          instance: magicInstance
        }
      }
    }
  }
}

export default magic
