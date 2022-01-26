import type {
  ScanAccountsOptions,
  Account,
  Asset,
  Chain,
  WalletInit
} from '@bn-onboard/common'

import type { providers } from 'ethers'
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

        const { accountSelect, createEIP1193Provider, ProviderRpcError } =
          await import('@bn-onboard/common')

        const { providers } = await import('ethers')
        const ethUtil = await import('ethereumjs-util')
        const { entryModal } = await import('@bn-onboard/common')

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
          provider: providers.JsonRpcProvider
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
          provider: providers.JsonRpcProvider
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

            if (acc?.balance?.value?.isZero()) {
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

        const scanAccounts = async ({
          derivationPath,
          chainId,
          asset
        }: ScanAccountsOptions): Promise<Account[]> => {
          if (!keepKeyWallet)
            throw new Error('Device must be connected before scanning accounts')
          currentChain = chains.find(({ id }) => id === chainId) || currentChain
          const provider = new providers.JsonRpcProvider(currentChain.rpcUrl)

          // Checks to see if this is a custom derivation path
          // If it is then just return the single account
          if (
            !DEFAULT_BASE_PATHS.find(({ value }) => value === derivationPath)
          ) {
            try {
              const accountIdx = getAccountIdx(derivationPath)
              const account = await getAccount({ accountIdx, provider, asset })

              return [account]
            } catch (error) {
              throw new Error('Invalid derivation path')
            }
          }

          return getAllAccounts({ derivationPath, asset, provider })
        }

        const getAccounts = async () => {
          accounts = await accountSelect({
            basePaths: DEFAULT_BASE_PATHS,
            assets,
            chains,
            scanAccounts
          })

          if (accounts.length) {
            eventEmitter.emit('accountsChanged', [accounts[0].address])
          }

          return accounts
        }

        const provider = createEIP1193Provider(
          {},
          {
            eth_requestAccounts: async () => {
              // cancel any current actions on device
              keepKeyWallet?.cancel()

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

              if (accounts?.length === 0) {
                throw new ProviderRpcError({
                  code: 4001,
                  message: 'User rejected the request.'
                })
              }

              return [accounts[0]?.address]
            },
            eth_accounts: async () => {
              return accounts?.[0]?.address ? [accounts[0].address] : []
            },
            eth_chainId: async () => {
              return currentChain && currentChain.id != undefined
                ? currentChain.id
                : '0x0'
            },
            eth_signTransaction: async ({ params: [transactionObject] }) => {
              if (!accounts)
                throw new Error(
                  'No account selected. Must call eth_requestAccounts first.'
                )

              const account =
                accounts.find(
                  account => account.address === transactionObject?.from
                ) || accounts[0]

              const { derivationPath } = account
              const addressNList = bip32ToAddressNList(derivationPath)

              const {
                nonce,
                gasPrice,
                gas,
                gasLimit,
                to,
                value,
                data,
                maxFeePerGas,
                maxPriorityFeePerGas
              } = transactionObject

              const { serialized } = await keepKeyWallet.ethSignTx({
                addressNList,
                nonce: nonce || '0x0',
                gasPrice,
                gasLimit: gasLimit || gas || '0x5208',
                to,
                value: value || '0x0',
                data: data || '',
                maxFeePerGas,
                maxPriorityFeePerGas,
                chainId: parseInt(currentChain.id)
              })

              return serialized
            },
            eth_sign: async ({ params: [address, message] }) => {
              if (!(accounts?.length && accounts?.length > 0))
                throw new Error(
                  'No account selected. Must call eth_requestAccounts first.'
                )

              const account =
                accounts.find(account => account.address === address) ||
                accounts[0]

              const { derivationPath } = account
              const accountIdx = getAccountIdx(derivationPath)
              const { addressNList } = getPaths(accountIdx)

              const { signature } = await keepKeyWallet.ethSignMessage({
                addressNList,
                message:
                  message.slice(0, 2) === '0x'
                    ? ethUtil.toBuffer(message).toString('utf8')
                    : message
              })

              return signature
            },
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
          }
        )

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
