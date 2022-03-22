import {
  Account,
  accountSelect,
  Chain,
  createEIP1193Provider,
  CustomNetwork,
  ProviderRpcErrorCode,
  ProviderRpcError,
  ScanAccountsOptions,
  WalletInit,
  EIP1193Provider
} from '@web3-onboard/common'

import type { providers } from 'ethers'

const DEFAULT_BASE_PATH = "m/44'/60'/0'/0"

const basePaths = [
  {
    label: 'Keystone',
    value: DEFAULT_BASE_PATH
  }
]

const assets = [
  {
    label: 'ETH'
  }
]

const getAccount = async (
  keyring: any,
  provider: providers.StaticJsonRpcProvider,
  index: number
): Promise<Account> => {
  const address = (await keyring.addAccounts())[index]
  const derivationPath = await keyring._pathFromAddress(address)
  return {
    derivationPath,
    address,
    balance: {
      asset: '',
      value: await provider.getBalance(address)
    }
  }
}

const generateAccounts = async (
  keyring: any,
  provider: providers.StaticJsonRpcProvider
): Promise<Account[]> => {
  const accounts = []
  let zeroBalanceAccounts = 0,
    index = 0

  while (zeroBalanceAccounts < 5) {
    const account = await getAccount(keyring, provider, index)
    if (account.balance.value.isZero()) {
      zeroBalanceAccounts++
      accounts.push(account)
    } else {
      accounts.push(account)
      // Reset the number of 0 balance accounts
      zeroBalanceAccounts = 0
    }
    index++
  }
  return accounts
}

function keystone({
  customNetwork
}: {
  customNetwork?: CustomNetwork
} = {}): WalletInit {
  const getIcon = async () => (await import('./icon.js')).default
  return () => {
    let accounts: Account[] | undefined
    return {
      label: 'Keystone',
      getIcon,
      getInterface: async ({ EventEmitter, chains }) => {
        const { StaticJsonRpcProvider } = await import(
          '@ethersproject/providers'
        )
        const { default: Common, Hardfork } = await import('@ethereumjs/common')

        const { default: AirGappedKeyring } = await import(
          '@keystonehq/eth-keyring'
        )

        const { TransactionFactory: Transaction } = await import(
          '@ethereumjs/tx'
        )

        const keyring = AirGappedKeyring.getEmptyKeyring()
        await keyring.readKeyring()

        const eventEmitter = new EventEmitter()

        let currentChain: Chain = chains[0]
        const scanAccounts = async ({
          derivationPath,
          chainId,
          asset
        }: ScanAccountsOptions): Promise<Account[]> => {
          currentChain =
            chains.find(({ id }: Chain) => id === chainId) || currentChain

          const provider = new StaticJsonRpcProvider(currentChain.rpcUrl)
          return generateAccounts(keyring, provider)
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

        const request: EIP1193Provider['request'] = async ({
          method,
          params
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

        const keystoneProvider = { request }

        const provider = createEIP1193Provider(keystoneProvider, {
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

            // @ts-ignore -- Due to weird commonjs exports
            const CommonConstructor = Common.default || Common

            const common = new Common({
              chain: customNetwork || Number.parseInt(currentChain.id) || 1,
              // Berlin is the minimum hardfork that will allow for EIP1559
              hardfork: Hardfork.Berlin,
              // List of supported EIPS
              eips: [1559]
            })

            transactionObject.gasLimit =
              transactionObject.gas || transactionObject.gasLimit

            const transaction = Transaction.fromTxData(
              {
                ...transactionObject
              },
              { common, freeze: false }
            )

            // @ts-ignore
            const signedTx = await keyring.signTransaction(from, transaction)

            return `0x${signedTx.serialize().toString('hex')}`
          },
          eth_sendTransaction: async ({ baseRequest, params }) => {
            const signedTx = await provider.request({
              method: 'eth_signTransaction',
              params
            })

            const transactionHash = await baseRequest({
              method: 'eth_sendRawTransaction',
              params: [signedTx]
            })

            return transactionHash as string
          },
          eth_sign: async ({ params: [address, message] }) => {
            if (!(accounts && accounts.length && accounts.length > 0))
              throw new Error(
                'No account selected. Must call eth_requestAccounts first.'
              )

            const account =
              accounts.find(account => account.address === address) ||
              accounts[0]

            return keyring.signMessage(account.address, message)
          },
          eth_signTypedData: async ({ params: [address, typedData] }) => {
            if (!(accounts && accounts.length && accounts.length > 0))
              throw new Error(
                'No account selected. Must call eth_requestAccounts first.'
              )

            const account =
              accounts.find(account => account.address === address) ||
              accounts[0]

            return keyring.signTypedData(account.address, typedData)
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

export default keystone
