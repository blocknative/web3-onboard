import type {
  ScanAccountsOptions,
  Account,
  Asset,
  Chain,
  WalletInit,
  EIP1193Provider
} from '@web3-onboard/common'

import type { StaticJsonRpcProvider } from '@ethersproject/providers'
import type { ETHAccountPath } from '@shapeshiftoss/hdwallet-core'
import type { KeepKeyHDWallet } from '@shapeshiftoss/hdwallet-keepkey'

const DEFAULT_PATH = `m/44'/60'/0'/0/0`

const DEFAULT_BASE_PATHS = [
  {
    label: 'Ethereum Mainnet',
    value: DEFAULT_PATH
  }
]

const assets = [
  {
    label: 'ETH'
  }
]

const ERROR_BUSY: ErrorCode = 'busy'
const ERROR_PAIRING: ErrorCode = 'pairing'

const errorMessages = {
  [ERROR_BUSY]: `Your KeepKey is currently connected to another application.
  Please close any other browser tabs or applications that may be connected to your device and try again.`,
  [ERROR_PAIRING]:
    'There was an error pairing the device. Please disconnect and reconnect the device and try again.'
}

type ErrorCode = 'busy' | 'pairing'

function keepkey(): WalletInit {
  const getIcon = async () => (await import('./icon.js')).default

  return () => {
    let accounts: Account[] | undefined

    return {
      label: 'KeepKey',
      getIcon,
      getInterface: async ({ EventEmitter, chains }) => {
        const { WebUSBKeepKeyAdapter } = await import(
          '@shapeshiftoss/hdwallet-keepkey-webusb'
        )

        const {
          Keyring,
          Events,
          bip32ToAddressNList,
          addressNListToBIP32,
          HDWalletErrorType
        } = await import('@shapeshiftoss/hdwallet-core')

        const {
          accountSelect,
          createEIP1193Provider,
          ProviderRpcError,
          entryModal,
          bigNumberFieldsToStrings
        } = await import('@web3-onboard/common')

        const { utils } = await import('ethers')

        const { StaticJsonRpcProvider } = await import(
          '@ethersproject/providers'
        )
        const ethUtil = await import('ethereumjs-util')

        const keyring = new Keyring()
        const keepKeyAdapter = WebUSBKeepKeyAdapter.useKeyring(keyring)
        const eventEmitter = new EventEmitter()

        let keepKeyWallet: KeepKeyHDWallet
        let currentChain: Chain = chains[0]

        keyring.on(['*', '*', Events.DISCONNECT], async () => {
          eventEmitter.emit('accountsChanged', [])
        })

        // If the wallet asks for a PIN, open the PIN modal
        keyring.on(['*', '*', Events.PIN_REQUEST], () => {
          entryModal(
            'pin',
            val => keepKeyWallet.sendPin(val),
            () => keepKeyWallet.cancel()
          )
        })

        // If the wallet asks for a PIN, open the PIN modal
        keyring.on(['*', '*', Events.PASSPHRASE_REQUEST], () => {
          entryModal(
            'passphrase',
            val => keepKeyWallet.sendPassphrase(val),
            () => keepKeyWallet.cancel()
          )
        })

        const getAccountIdx = (derivationPath: string) => {
          // Get the account index from the derivation path
          const { accountIdx } = keepKeyWallet.describePath({
            path: bip32ToAddressNList(derivationPath),
            coin: 'Ethereum'
          })

          if (accountIdx === undefined)
            throw new Error(
              `Could not derive account from path: ${derivationPath}`
            )

          return accountIdx
        }

        const getPaths = (accountIdx: number): ETHAccountPath => {
          // Retrieve the array form of the derivation path for a given account index
          const [paths] = keepKeyWallet.ethGetAccountPaths({
            coin: 'Ethereum',
            accountIdx
          })

          return paths
        }

        const getAccount = async ({
          accountIdx,
          provider,
          asset
        }: {
          accountIdx: number
          provider: StaticJsonRpcProvider
          asset: Asset
        }) => {
          const paths = getPaths(accountIdx)

          // Retrieve the address associated with the given account index
          const address = await keepKeyWallet.ethGetAddress({
            addressNList: paths.addressNList,
            showDisplay: false
          })

          const balance = await provider.getBalance(address)

          return {
            derivationPath: addressNListToBIP32(paths.addressNList),
            address,
            balance: {
              asset: asset.label,
              value: balance
            }
          }
        }

        const getAllAccounts = async ({
          derivationPath,
          asset,
          provider
        }: {
          derivationPath: string
          asset: Asset
          provider: StaticJsonRpcProvider
        }) => {
          let index = getAccountIdx(derivationPath)
          let zeroBalanceAccounts = 0
          const accounts = []

          // Iterates until a 0 balance account is found
          // Then adds 4 more 0 balance accounts to the array
          while (zeroBalanceAccounts < 5) {
            const acc = await getAccount({
              accountIdx: index,
              provider,
              asset
            })

            if (
              acc &&
              acc.balance &&
              acc.balance.value &&
              acc.balance.value.isZero()
            ) {
              zeroBalanceAccounts++
              accounts.push(acc)
            } else {
              accounts.push(acc)
              // Reset the number of 0 balance accounts
              zeroBalanceAccounts = 0
            }

            index++
          }

          return accounts
        }
        let ethersProvider: StaticJsonRpcProvider
        const scanAccounts = async ({
          derivationPath,
          chainId,
          asset
        }: ScanAccountsOptions): Promise<Account[]> => {
          if (!keepKeyWallet)
            throw new Error('Device must be connected before scanning accounts')
          currentChain = chains.find(({ id }) => id === chainId) || currentChain
          ethersProvider = new StaticJsonRpcProvider(currentChain.rpcUrl)

          // Checks to see if this is a custom derivation path
          // If it is then just return the single account
          if (
            !DEFAULT_BASE_PATHS.find(({ value }) => value === derivationPath)
          ) {
            try {
              const accountIdx = getAccountIdx(derivationPath)
              const account = await getAccount({
                accountIdx,
                provider: ethersProvider,
                asset
              })

              return [account]
            } catch (error) {
              throw new Error('Invalid derivation path')
            }
          }

          return getAllAccounts({
            derivationPath,
            asset,
            provider: ethersProvider
          })
        }

        const getAccounts = async () => {
          accounts = await accountSelect({
            basePaths: DEFAULT_BASE_PATHS,
            assets,
            chains,
            scanAccounts
          })
          if (!accounts) throw new Error('No accounts were found')
          if (accounts.length) {
            eventEmitter.emit('accountsChanged', [accounts[0].address])
          }

          return accounts
        }

        const signMessage = async (address: string, message: string) => {
          if (
            !accounts ||
            !Array.isArray(accounts) ||
            !(accounts.length && accounts.length > 0)
          )
            throw new Error(
              'No account selected. Must call eth_requestAccounts first.'
            )

          const account =
            accounts.find(account => account.address === address) || accounts[0]

          const { derivationPath } = account
          const accountIdx = getAccountIdx(derivationPath)
          const { addressNList } = getPaths(accountIdx)

          const { signature } = await keepKeyWallet.ethSignMessage({
            addressNList,
            message:
              message.slice(0, 2) === '0x'
                ? // @ts-ignore - commonjs weirdness
                  (ethUtil.default || ethUtil)
                    .toBuffer(message)
                    .toString('utf8')
                : message
          })

          return signature
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

        const keepKeyProvider = { request }

        const provider = createEIP1193Provider(keepKeyProvider, {
          eth_requestAccounts: async () => {
            if (keepKeyWallet && typeof keepKeyWallet.cancel === 'function') {
              // cancel any current actions on device
              keepKeyWallet.cancel()
            }

            try {
              keepKeyWallet =
                (await keepKeyAdapter.pairDevice()) as KeepKeyHDWallet
            } catch (error) {
              const { name } = error as { name: string }
              // This error indicates that the keepkey is paired with another app
              if (name === HDWalletErrorType.ConflictingApp) {
                throw new ProviderRpcError({
                  code: 4001,
                  message: errorMessages[ERROR_BUSY]
                })

                // This error indicates that for some reason we can't claim the usb device
              } else if (name === HDWalletErrorType.WebUSBCouldNotPair) {
                throw new ProviderRpcError({
                  code: 4001,
                  message: errorMessages[ERROR_PAIRING]
                })
              }
            }

            // Triggers the account select modal if no accounts have been selected
            const accounts = await getAccounts()

            if (!accounts || !Array.isArray(accounts)) {
              throw new Error('No accounts were returned from Keepkey device')
            }
            if (!accounts.length) {
              throw new ProviderRpcError({
                code: 4001,
                message: 'User rejected the request.'
              })
            }
            if (!accounts[0].hasOwnProperty('address')) {
              throw new Error(
                'The account returned does not have a required address field'
              )
            }

            return [accounts[0].address]
          },
          eth_selectAccounts: async () => {
            const accounts = await getAccounts()
            return accounts.map(({ address }) => address)
          },
          eth_accounts: async () => {
            if (!accounts || !Array.isArray(accounts)) {
              throw new Error('No accounts were returned from Keepkey device')
            }
            return accounts[0].hasOwnProperty('address')
              ? [accounts[0].address]
              : []
          },
          eth_chainId: async () => {
            return currentChain && currentChain.id != undefined
              ? currentChain.id
              : '0x0'
          },
          eth_signTransaction: async ({ params: [transactionObject] }) => {
            if (!accounts || !Array.isArray(accounts) || !accounts.length)
              throw new Error(
                'No account selected. Must call eth_requestAccounts first.'
              )

            // Per the code above if accounts is empty or undefined then this line of code won't execute
            // ∴ account must be defined here which is why it is cast without the 'undefined' type
            const account =
              !transactionObject || !transactionObject.hasOwnProperty('from')
                ? accounts[0]
                : (accounts.find(
                    account =>
                      account.address.toLocaleLowerCase() ===
                      transactionObject.from.toLocaleLowerCase()
                  ) as Account)

            const { derivationPath, address } = account
            const addressNList = bip32ToAddressNList(derivationPath)

            const signer = ethersProvider.getSigner(address)

            transactionObject.gasLimit =
              transactionObject.gas || transactionObject.gasLimit

            // 'gas' is an invalid property for the TransactionRequest type
            delete transactionObject.gas

            transactionObject.gasLimit = undefined

            let populatedTransaction = await signer.populateTransaction(
              transactionObject
            )

            const {
              to,
              value,
              nonce,
              gasLimit,
              gasPrice,
              maxFeePerGas,
              maxPriorityFeePerGas,
              data
            } = bigNumberFieldsToStrings(populatedTransaction)

            const gasData = gasPrice
              ? {
                  gasPrice
                }
              : {
                  maxFeePerGas,
                  maxPriorityFeePerGas
                }

            const txn = {
              addressNList,
              chainId: parseInt(currentChain.id),
              to: to || '',
              value: value || '',
              nonce: utils.hexValue(nonce),
              gasLimit: gasLimit || '0x0',
              data: (data || '').toString(),
              ...gasData
            }

            let serialized
            try {
              ;({ serialized } = await keepKeyWallet.ethSignTx(txn))
            } catch (error: any) {
              if (error.message && error.message.message) {
                throw new Error(error.message.message)
              } else {
                throw new Error(error)
              }
            }
            return serialized
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
          eth_sign: async ({ params: [address, message] }) =>
            signMessage(address, message),
          personal_sign: async ({ params: [message, address] }) =>
            signMessage(address, message),
          eth_signTypedData: null,
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
          provider,
          instance: {
            selectAccount: getAccounts
          }
        }
      }
    }
  }
}

export default keepkey
