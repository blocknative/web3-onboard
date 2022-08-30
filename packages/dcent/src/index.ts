import type { Chain, WalletInit, EIP1193Provider } from '@web3-onboard/common'
import type { providers } from 'ethers'

import type {
  CustomNetwork,
  Account,
  ScanAccountsOptions
} from '@web3-onboard/hw-common'

interface CustomWindow extends Window {
  ethereum: EIP1193Provider
}

declare const window: CustomWindow

const DEFAULT_BASE_PATH = "m/44'/60'/0'/0/0"

const basePaths = [
  {
    label: `D'CENT`,
    value: DEFAULT_BASE_PATH
  }
]

const assets = [
  {
    label: 'ETH'
  }
]

const generateAccounts = async (
  keyring: any,
  provider: providers.StaticJsonRpcProvider
): Promise<Account[]> => {
  const accounts = []

  const addressList = await keyring.addAccounts()
  const derivationPath = DEFAULT_BASE_PATH
  const account = {
    derivationPath,
    address: addressList[0],
    balance: {
      asset: '',
      value: await provider.getBalance(addressList[0])
    }
  }

  accounts.push(account)

  return accounts
}

function dcent({
  customNetwork
}: {
  customNetwork?: CustomNetwork
} = {}): WalletInit {
  const getIcon = async () => (await import('./icon.js')).default
  return helpers => {
    const { device } = helpers
    const isMobile = device.type === 'mobile'
    let accounts: Account[] | undefined
    return {
      label: "D'CENT",
      getIcon,
      getInterface: async ({ EventEmitter, chains }) => {
        const eventEmitter = new EventEmitter()

        if (isMobile) {
          const provider = window.ethereum as EIP1193Provider
          if (isMobile && !provider) {
            location.replace(
              'https://link.dcentwallet.com/DAppBrowser/?url=' +
                document.location
            )
          }
          provider.on = eventEmitter.on.bind(eventEmitter)
          return {
            provider
          }
        }

        const { StaticJsonRpcProvider } = await import(
          '@ethersproject/providers'
        )

        const { default: EthDcentKeyring } = await import('eth-dcent-keyring')
        const dcentKeyring = new EthDcentKeyring({})

        const { TransactionFactory: Transaction } = await import(
          '@ethereumjs/tx'
        )

        const { getCommon, accountSelect } = await import(
          '@web3-onboard/hw-common'
        )

        const {
          createEIP1193Provider,
          ProviderRpcErrorCode,
          ProviderRpcError
        } = await import('@web3-onboard/common')

        let currentChain: Chain = chains[0]
        const scanAccounts = async ({
          chainId
        }: ScanAccountsOptions): Promise<Account[]> => {
          currentChain =
            chains.find(({ id }: Chain) => id === chainId) || currentChain

          const provider = new StaticJsonRpcProvider(
            currentChain.rpcUrl
          ) as providers.StaticJsonRpcProvider

          return generateAccounts(dcentKeyring, provider)
        }

        const getAccounts = async () => {
          accounts = await accountSelect({
            basePaths,
            assets,
            chains,
            scanAccounts,
            supportsCustomPath: false
          })
          if (accounts.length) {
            eventEmitter.emit('accountsChanged', [accounts[0].address])
          }

          return accounts
        }

        const request = async ({
          method,
          params
        }: {
          method: string
          params: any
        }) => {
          const response = await fetch(currentChain.rpcUrl, {
            method: 'POST',
            body: JSON.stringify({
              id: '42',
              method,
              params
            })
          }).then(res => res.json())

          if (response.result) {
            return response.result
          } else {
            throw response.error
          }
        }
        const dcentProvider = { request }
        const provider = createEIP1193Provider(dcentProvider, {
          eth_requestAccounts: async () => {
            // Triggers the account select modal if no accounts have been selected
            const accounts = await getAccounts()
            if (accounts.length === 0) {
              throw new ProviderRpcError({
                code: ProviderRpcErrorCode.ACCOUNT_ACCESS_REJECTED,
                message: 'User rejected the request.'
              })
            }
            return accounts[0] ? [accounts[0].address] : []
          },
          eth_selectAccounts: async () => {
            const accounts = await getAccounts()
            return accounts.map(({ address }) => address)
          },
          eth_accounts: async () => {
            return accounts && accounts[0].address ? [accounts[0].address] : []
          },
          eth_chainId: async () => {
            return currentChain.id
          },
          eth_signTransaction: async ({ params: [transactionObject] }) => {
            if (!accounts)
              throw new Error(
                'No account selected. Must call eth_requestAccounts first.'
              )

            if (!transactionObject)
              throw new ProviderRpcError({
                message: 'Invalid method parameters',
                code: ProviderRpcErrorCode.INVALID_PARAMS,
                data: transactionObject
              })

            const account =
              accounts.find(
                account => account.address === transactionObject.from
              ) || accounts[0]

            const { address: from } = account

            // Set the `from` field to the currently selected account
            transactionObject = { ...transactionObject, from }

            const chainId = currentChain.hasOwnProperty('id')
              ? Number.parseInt(currentChain.id)
              : 1

            const common = await getCommon({ customNetwork, chainId })

            transactionObject.gasLimit =
              transactionObject.gas || transactionObject.gasLimit

            const transaction = Transaction.fromTxData(
              {
                ...transactionObject
              },
              { common, freeze: false }
            )

            try {
              const result = await dcentKeyring.signTransaction(
                from,
                transaction
              )

              return `0x${result.serialize().toString('hex')}`
            } catch (err) {
              throw err
            }
          },
          eth_sendTransaction: async ({ baseRequest, params }) => {
            const signedTx = (await provider.request({
              method: 'eth_signTransaction',
              params
            })) as string

            const transactionHash = (await baseRequest({
              method: 'eth_sendRawTransaction',
              params: [signedTx]
            })) as string

            return transactionHash
          },
          eth_sign: async ({ params: [address, message] }) => {
            if (!(accounts && accounts.length && accounts.length > 0))
              throw new Error(
                'No account selected. Must call eth_requestAccounts first.'
              )

            const account =
              accounts.find(account => account.address === address) ||
              accounts[0]

            return dcentKeyring.signMessage(account.address, message)
          },
          personal_sign: async ({ params: [message, address] }) => {
            if (!(accounts && accounts.length && accounts.length > 0))
              throw new Error(
                'No account selected. Must call eth_requestAccounts first.'
              )

            const account =
              accounts.find(account => account.address === address) ||
              accounts[0]

            return dcentKeyring.signPersonalMessage(account.address, message)
          },
          eth_signTypedData: async ({ params: [address, typedData] }) => {
            if (!(accounts && accounts.length && accounts.length > 0))
              throw new Error(
                'No account selected. Must call eth_requestAccounts first.'
              )

            const account =
              accounts.find(account => account.address === address) ||
              accounts[0]

            const opt = {
              version: 'V4'
            }
            return dcentKeyring.signTypedData(account.address, typedData, opt)
          },
          wallet_switchEthereumChain: async ({ params: [{ chainId }] }) => {
            currentChain =
              chains.find(({ id }) => id === chainId) || currentChain
            if (!currentChain)
              throw new Error('chain must be set before switching')

            eventEmitter.emit('chainChanged', currentChain.id)
            return null
          },
          wallet_addEthereumChain: null
        })

        provider.on = eventEmitter.on.bind(eventEmitter)

        return {
          provider
        }
      }
    }
  }
}

export default dcent
