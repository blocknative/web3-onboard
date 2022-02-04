import {
  Account,
  Asset,
  Chain,
  CustomNetwork,
  ScanAccountsOptions,
  TransactionObject,
  WalletInit
} from '@bn-onboard/common/src/types'
import type { providers } from 'ethers'
import type { BIP32Interface } from 'bip32'
import { EthereumTransaction, EthereumTransactionEIP1559 } from 'trezor-connect'

interface TrezorOptions {
  email: string
  appUrl: string
  customNetwork?: CustomNetwork
}

const TREZOR_DEFAULT_PATH = "m/44'/60'/0'/0"

const assets = [
  {
    label: 'ETH'
  }
]

const DEFAULT_BASE_PATHS = [
  {
    label: 'Ethereum Mainnet',
    value: TREZOR_DEFAULT_PATH
  }
]

interface AccountData {
  publicKey: string
  chainCode: string
  path: string
}

const getAccount = async (
  { publicKey, chainCode, path }: AccountData,
  asset: Asset,
  index: number,
  provider: providers.JsonRpcProvider
): Promise<Account> => {
  //@ts-ignore
  const { default: HDKey } = await import('hdkey')
  const { Buffer } = await import('buffer')
  const { publicToAddress, toChecksumAddress } = await import('ethereumjs-util')

  const hdk = new HDKey()

  hdk.publicKey = Buffer.from(publicKey, 'hex')
  hdk.chainCode = Buffer.from(chainCode, 'hex')

  const dkey = hdk.deriveChild(index)

  const address = toChecksumAddress(
    `0x${publicToAddress(dkey.publicKey, true).toString('hex')}`
  )

  return {
    derivationPath: `${path}/${index}`,
    address,
    balance: {
      asset: asset.label,
      value: await provider.getBalance(address)
    }
  }
}

const getAddresses = async (
  account: AccountData,
  asset: Asset,
  provider: providers.JsonRpcProvider
): Promise<Account[]> => {
  const accounts = []
  let index = 0
  let zeroBalanceAccounts = 0

  // Iterates until a 0 balance account is found
  // Then adds 4 more 0 balance accounts to the array
  while (zeroBalanceAccounts < 5) {
    const acc = await getAccount(account, asset, index, provider)
    if (
      acc &&
      acc.hasOwnProperty('balance') &&
      acc.balance.hasOwnProperty('value') &&
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

function trezor(options: TrezorOptions): WalletInit {
  const getIcon = async () => (await import('./icon.js')).default
  return () => {
    let accounts: Account[] | undefined
    return {
      label: 'Trezor',
      getIcon,
      getInterface: async ({ EventEmitter, chains }) => {
        const { default: Trezor } = await import('trezor-connect')
        const { Transaction } = await import('@ethereumjs/tx')
        const { default: Common, Hardfork } = await import('@ethereumjs/common')
        const { accountSelect, createEIP1193Provider, ProviderRpcError } =
          await import('@bn-onboard/common')
        const ethUtil = await import('ethereumjs-util')
        const { compress } = (await import('eth-crypto')).publicKey
        const { JsonRpcProvider } = await import('@ethersproject/providers')

        if (!options || !options.email || !options.appUrl) {
          throw new Error(
            'Email and AppUrl required in Trezor options for Trezor Wallet Connection'
          )
        }

        const { email, appUrl, customNetwork } = options
        // @ts-ignore
        const TrezorConnect = Trezor.default

        TrezorConnect.manifest({
          email: email,
          appUrl: appUrl
        })

        const eventEmitter = new EventEmitter()
        let currentChain: Chain = chains[0]

        let account:
          | { publicKey: string; chainCode: string; path: string }
          | undefined

        const scanAccounts = async ({
          derivationPath,
          chainId,
          asset
        }: ScanAccountsOptions): Promise<Account[]> => {
          currentChain = chains.find(({ id }) => id === chainId) || currentChain
          const provider = new JsonRpcProvider(currentChain.rpcUrl)

          const { publicKey, chainCode, path } = await getPublicKey(
            derivationPath
          )

          if (derivationPath !== TREZOR_DEFAULT_PATH) {
            const address = await getAddress(path)
            return [
              {
                derivationPath,
                address,
                balance: {
                  asset: asset.label,
                  value: await provider.getBalance(address)
                }
              }
            ]
          }

          return getAddresses(
            {
              publicKey: compress(publicKey),
              chainCode: chainCode || '',
              path: derivationPath
            },
            asset,
            provider
          )
        }

        const getAccountFromAccountSelect = async () => {
          accounts = await accountSelect({
            basePaths: DEFAULT_BASE_PATHS,
            assets,
            chains,
            scanAccounts
          })

          if (
            Array.isArray(accounts) &&
            accounts.length &&
            accounts[0].hasOwnProperty('address')
          ) {
            eventEmitter.emit('accountsChanged', [accounts[0].address])
          }

          return accounts
        }

        async function getAddress(path: string) {
          const errorMsg = `Unable to derive address from path ${path}`

          try {
            const result = await TrezorConnect.ethereumGetAddress({
              path,
              showOnTrezor: true
            })

            if (!result.success) {
              throw new Error(errorMsg)
            }

            return result.payload.address
          } catch (error) {
            throw new Error(errorMsg)
          }
        }

        async function getPublicKey(dPath: string) {
          if (!dPath) {
            throw new Error('a derivation path is needed to get the public key')
          }

          try {
            const result = await TrezorConnect.getPublicKey({
              path: dPath,
              coin: 'ETH'
            })

            if (!result.success) {
              throw new Error(result.payload.error)
            }

            account = {
              publicKey: result.payload.publicKey,
              chainCode: result.payload.chainCode,
              path: result.payload.serializedPath
            }

            return account
          } catch (error) {
            throw new Error(
              `There was an error accessing your Trezor accounts - Error: ${error}`
            )
          }
        }

        function createTrezorTransactionObject(
          transactionData: TransactionObject
        ): EthereumTransactionEIP1559 | EthereumTransaction {
          if (
            !transactionData ||
            (!transactionData.hasOwnProperty('gasLimit') &&
              !transactionData.hasOwnProperty('gas'))
          ) {
            throw new Error(
              'There was no Transaction Object or both the gasLimit and gas property are missing'
            )
          }
          const gasLimit = transactionData.gasLimit || transactionData.gas
          if (
            transactionData!.maxFeePerGas ||
            transactionData!.maxPriorityFeePerGas
          ) {
            return {
              to: transactionData.to!,
              value: transactionData.value!,
              gasLimit: gasLimit!,
              maxFeePerGas: transactionData.maxFeePerGas!,
              maxPriorityFeePerGas: transactionData.maxPriorityFeePerGas!,
              nonce: transactionData.nonce!,
              chainId: parseInt(currentChain.id),
              data: transactionData.hasOwnProperty('data')
                ? transactionData.data
                : ''
            }
          }
          return {
            to: transactionData.to!,
            value: transactionData.value!,
            gasPrice: transactionData.gasPrice!,
            gasLimit: gasLimit!,
            nonce: transactionData.nonce!,
            chainId: parseInt(currentChain.id),
            data: transactionData.hasOwnProperty('data')
              ? transactionData.data
              : ''
          }
        }

        function trezorSignTransaction(
          path: string,
          transactionData: EthereumTransactionEIP1559 | EthereumTransaction
        ) {
          try {
            return TrezorConnect.ethereumSignTransaction({
              path: path,
              transaction: transactionData
            })
          } catch (error) {
            throw new Error(
              `There was an error signing transaction - Error: ${error}`
            )
          }
        }

        async function signTransaction(transactionObject: TransactionObject) {
          if (!Array.isArray(accounts) || !accounts.length)
            throw new Error(
              'No account selected. Must call eth_requestAccounts first.'
            )

          let signingAccount
          if (transactionObject.hasOwnProperty('from')) {
            signingAccount = accounts.find(
              account => account.address === transactionObject.from
            )
          }
          signingAccount = signingAccount ? signingAccount : accounts[0]

          const { derivationPath } = signingAccount

          // Set the `from` field to the currently selected account
          const transactionData =
            createTrezorTransactionObject(transactionObject)

          // @ts-ignore
          const CommonConstructor = Common.default

          const common = new CommonConstructor({
            chain: customNetwork || Number.parseInt(currentChain.id) || 1,
            // Berlin is the minimum hardfork that will allow for EIP1559
            hardfork: Hardfork.Berlin,
            // List of supported EIPS
            eips: [1559]
          })

          const trezorResult = await trezorSignTransaction(
            derivationPath,
            transactionData
          )
          if (!trezorResult.success) {
            const message =
              trezorResult.payload.error === 'Unknown message'
                ? 'This type of transactions is not supported on this device'
                : trezorResult.payload.error

            throw new Error(message)
          }

          const { r, s } = trezorResult.payload
          let v = trezorResult.payload.v

          // EIP155 support. check/recalc signature v value.
          const rv = parseInt(v, 16)
          let cv = parseInt(currentChain.id) * 2 + 35
          if (rv !== cv && (rv & cv) !== rv) {
            cv += 1 // add signature v bit.
          }
          v = cv.toString(16)

          const signedTx = Transaction.fromTxData(
            {
              ...transactionData,
              v: `0x${v}`,
              r: r,
              s: s
            },
            { common }
          )
          return signedTx ? `0x${signedTx.serialize().toString('hex')}` : ''
        }

        async function signMessage(
          address: string,
          message: { data: string }
        ): Promise<string> {
          if (!Array.isArray(accounts) || !accounts.length)
            throw new Error(
              'No account selected. Must call eth_requestAccounts first.'
            )

          const accountToSign =
            accounts.find(account => account.address === address) || accounts[0]

          return new Promise((resolve, reject) => {
            TrezorConnect.ethereumSignMessage({
              path: accountToSign.derivationPath,
              message: ethUtil.stripHexPrefix(message.data),
              hex: true
            }).then((response: any) => {
              if (response.success) {
                if (
                  response.payload.address !==
                  ethUtil.toChecksumAddress(address)
                ) {
                  reject(new Error('signature doesnt match the right address'))
                }
                const signature = `0x${response.payload.signature}`
                resolve(signature)
              } else {
                reject(
                  new Error(
                    (response.payload && response.payload.error) ||
                      'There was an error signing a message'
                  )
                )
              }
            })
          })
        }

        const trezorProvider = {}

        const provider = createEIP1193Provider(trezorProvider, {
          eth_requestAccounts: async () => {
            const accounts = await getAccountFromAccountSelect()
            if (!Array.isArray(accounts))
              throw new Error(
                'No account selected. Must call eth_requestAccounts first.'
              )
            if (accounts.length === 0) {
              throw new ProviderRpcError({
                code: 4001,
                message: 'User rejected the request.'
              })
            }
            if (!accounts[0].hasOwnProperty('address'))
              throw new Error(
                'No address property associated with the selected account'
              )
            return [accounts[0].address]
          },
          eth_selectAccounts: async () => {
            const accounts = await getAccountFromAccountSelect()
            return accounts.map(({ address }) => address)
          },
          eth_accounts: async () => {
            return Array.isArray(accounts) &&
              accounts.length &&
              accounts[0].hasOwnProperty('address')
              ? [accounts[0].address]
              : []
          },
          eth_chainId: async () => {
            return currentChain.hasOwnProperty('id') ? currentChain.id : ''
          },
          eth_signTransaction: async ({ params: [transactionObject] }) => {
            return signTransaction(transactionObject)
          },
          eth_sign: async ({ params: [address, message] }) => {
            let messageData = { data: message }
            return signMessage(address, messageData)
          },
          wallet_switchEthereumChain: async ({ params: [{ chainId }] }) => {
            currentChain =
              chains.find(({ id }) => id === chainId) || currentChain
            if (!currentChain)
              throw new Error('chain must be set before switching')

            eventEmitter.emit('chainChanged', currentChain.id)
            return null
          },
          eth_signTypedData: null,
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

export default trezor
