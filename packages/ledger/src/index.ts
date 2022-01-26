import type {
  ScanAccountsOptions,
  Account,
  Asset,
  Chain,
  CustomNetwork,
  WalletInit
} from '@bn-onboard/common'

import type { BIP32Interface } from 'bip32'
import type Transport from '@ledgerhq/hw-transport'
import type { providers } from 'ethers'

const LEDGER_LIVE_PATH = `m/44'/60'`
const LEDGER_DEFAULT_PATH = `m/44'/60'/0'`

const DEFAULT_BASE_PATHS = [
  {
    label: 'Ledger Live',
    value: LEDGER_LIVE_PATH
  },
  {
    label: 'Ledger Legacy',
    value: LEDGER_DEFAULT_PATH
  }
]

const assets = [
  {
    label: 'ETH'
  }
]

type CustomNavigator = Navigator & { usb: { getDevices(): void } }

const supportsWebUSB = (): Promise<boolean> =>
  Promise.resolve(
    !!navigator &&
      !!(navigator as CustomNavigator).usb &&
      typeof (navigator as CustomNavigator).usb.getDevices === 'function'
  )

/**
 * Returns the correct ledger transport based on browser compatibility for webUSB.
 * @returns
 */
const getTransport = async () =>
  ((await supportsWebUSB())
    ? (await import('@ledgerhq/hw-transport-webusb')).default
    : (await import('@ledgerhq/hw-transport-u2f')).default
  ).create()

interface LedgerAccount {
  publicKey: string
  derivationPath: string
  chainCode: string
}

const getAccount = async (
  { publicKey, chainCode, derivationPath }: LedgerAccount,
  asset: Asset,
  index: number,
  provider: providers.JsonRpcProvider
): Promise<Account> => {
  const { BIP32Factory } = await import('bip32')
  const ecc = await import('tiny-secp256k1')
  const { Buffer } = await import('buffer')
  const { publicToAddress, toChecksumAddress } = await import('ethereumjs-util')

  const node: BIP32Interface = BIP32Factory(ecc).fromPublicKey(
    Buffer.from(publicKey, 'hex'),
    Buffer.from(chainCode, 'hex')
  )

  const child: BIP32Interface = node.derive(index)

  const address = toChecksumAddress(
    `0x${publicToAddress(child.publicKey, true).toString('hex')}`
  )

  return {
    derivationPath: `${derivationPath}/${index}`,
    address,
    balance: {
      asset: asset.label,
      value: await provider.getBalance(address)
    }
  }
}

const getAddresses = async (
  account: LedgerAccount,
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

function ledger({
  customNetwork
}: {
  customNetwork?: CustomNetwork
} = {}): WalletInit {
  const getIcon = async () => (await import('./icon.js')).default
  return () => {
    let accounts: Account[] | undefined
    return {
      label: 'Ledger',
      getIcon,
      getInterface: async ({ EventEmitter, chains }) => {
        const Eth = (await import('@ledgerhq/hw-app-eth')).default
        const { TransactionFactory: Transaction, Capability } = await import(
          '@ethereumjs/tx'
        )
        const { default: Common, Hardfork } = await import('@ethereumjs/common')
        const { compress } = (await import('eth-crypto')).publicKey
        const ethUtil = await import('ethereumjs-util')
        const { getStructHash } = await import('eip-712')
        const { accountSelect, createEIP1193Provider, ProviderRpcError } =
          await import('@bn-onboard/common')
        const { providers } = await import('ethers')

        const transport: Transport = await getTransport()
        const eth = new Eth(transport)
        const eventEmitter = new EventEmitter()

        let currentChain: Chain = chains[0]
        const scanAccounts = async ({
          derivationPath,
          chainId,
          asset
        }: ScanAccountsOptions): Promise<Account[]> => {
          try {
            currentChain =
              chains.find(({ id }) => id === chainId) || currentChain
            const provider = new providers.JsonRpcProvider(currentChain.rpcUrl)

            const { publicKey, chainCode, address } = await eth.getAddress(
              derivationPath,
              false,
              true // set to true to return chainCode
            )

            // Checks to see if this is a custom derivation path
            // If it is then just return the single account
            if (
              derivationPath !== LEDGER_LIVE_PATH &&
              derivationPath !== LEDGER_DEFAULT_PATH
            ) {
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
                derivationPath
              },
              asset,
              provider
            )
          } catch (error) {
            const { statusText } = error as { statusText: string }
            throw new Error(
              statusText === 'UNKNOWN_ERROR'
                ? 'Ledger device is locked, please unlock to continue'
                : statusText
            )
          }
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

        const ledgerProvider = {}

        const provider = createEIP1193Provider(ledgerProvider, {
          eth_requestAccounts: async () => {
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
            return (currentChain && currentChain.id) || ''
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

            const { address: from, derivationPath } = account

            // Set the `from` field to the currently selected account
            transactionObject = { ...transactionObject, from }

            const common = new Common({
              chain: customNetwork || Number.parseInt(currentChain?.id) || 1,
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
              { common }
            )

            let unsignedTx = transaction.getMessageToSign(false)

            // If this is not an EIP1559 transaction then it is legacy and it needs to be
            // rlp encoded before being passed to ledger
            if (!transaction.supports(Capability.EIP1559FeeMarket)) {
              unsignedTx = ethUtil.rlp.encode(unsignedTx)
            }

            const { v, r, s } = await eth.signTransaction(
              derivationPath,
              unsignedTx.toString('hex')
            )

            // Reconstruct the signed transaction
            const signedTx = Transaction.fromTxData(
              {
                ...transactionObject,
                v: `0x${v}`,
                r: `0x${r}`,
                s: `0x${s}`
              },
              { common }
            )

            return signedTx ? `0x${signedTx.serialize().toString('hex')}` : ''
          },
          eth_sign: async ({ params: [address, message] }) => {
            if (!(accounts?.length && accounts?.length > 0))
              throw new Error(
                'No account selected. Must call eth_requestAccounts first.'
              )

            const account =
              accounts.find(account => account.address === address) ||
              accounts[0]

            return eth
              .signPersonalMessage(
                account.derivationPath,
                Buffer.from(message).toString('hex')
              )
              .then(result => {
                let v = (result['v'] - 27).toString(16)
                if (v.length < 2) {
                  v = '0' + v
                }

                return `0x${result['r']}${result['s']}${v}`
              })
          },
          eth_signTypedData: async ({ params: [address, typedData] }) => {
            if (!(accounts?.length && accounts?.length > 0))
              throw new Error(
                'No account selected. Must call eth_requestAccounts first.'
              )

            const account =
              accounts.find(account => account.address === address) ||
              accounts[0]

            const domainHash = getStructHash(
              typedData,
              'EIP712Domain',
              typedData.domain
            ).toString('hex')

            const messageHash = getStructHash(
              typedData,
              typedData.primaryType,
              typedData.message
            ).toString('hex')

            return eth
              .signEIP712HashedMessage(
                account.derivationPath,
                domainHash,
                messageHash
              )
              .then(result => {
                let v = (result['v'] - 27).toString(16)
                if (v.length < 2) {
                  v = '0' + v
                }

                return `0x${result['r']}${result['s']}${v}`
              })
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

export default ledger
