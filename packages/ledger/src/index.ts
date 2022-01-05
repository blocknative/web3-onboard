import { accountSelect, createEIP1193Provider } from '@bn-onboard/common'
import {
  ScanAccountsOptions,
  Account,
  Asset
} from '@bn-onboard/common/src/types'
import type { Chain, CustomNetwork, WalletInit } from '@bn-onboard/types'
import type { BIP32Interface } from 'bip32'
import type Transport from '@ledgerhq/hw-transport'
import type { BigNumber } from 'ethers'

const LEDGER_LIVE_PATH = `m/44'/60'`
const LEDGER_DEFAULT_PATH = `m/44'/60'/0'`

const DEFAULT_BASE_PATHS = [
  {
    label: 'Ledger Live',
    value: LEDGER_LIVE_PATH
  },
  {
    label: 'Ethereum',
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

const getBalance = async (
  address: string,
  rpcUrl: string,
  block: string | number = 'latest'
): Promise<BigNumber> => {
  const { providers } = await import('ethers')
  const provider = new providers.JsonRpcProvider(rpcUrl)
  return provider.getBalance(address, block)
}

const getAccount = async (
  { publicKey, chainCode, derivationPath }: LedgerAccount,
  asset: Asset,
  { rpcUrl }: Chain,
  index: number
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
      value: await getBalance(address, rpcUrl)
    }
  }
}

const getAddresses = async (
  account: LedgerAccount,
  asset: Asset,
  currentChain: Chain
): Promise<Account[]> => {
  const accounts = []
  let index = 0
  let zeroBalanceAccounts = 0

  // Iterates until a 0 balance account is found
  // Then adds 4 more 0 balance accounts to the array
  while (zeroBalanceAccounts < 5) {
    const acc = await getAccount(account, asset, currentChain, index)
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
  const getIcon = async () => (await import('./icon')).default
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

        const transport: Transport = await getTransport()
        const eth = new Eth(transport)
        const eventEmitter = new EventEmitter()

        let currentChain: Chain = chains[0]
        const scanAccounts = async ({
          derivationPath,
          chainId,
          asset
        }: ScanAccountsOptions): Promise<Account[]> => {
          currentChain = chains.find(({ id }) => id === chainId) ?? currentChain

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
                  value: await getBalance(address, currentChain.rpcUrl)
                }
              }
            ]
          }

          return getAddresses(
            {
              publicKey: compress(publicKey),
              chainCode: chainCode ?? '',
              derivationPath
            },
            asset,
            currentChain
          )
        }

        const getAccounts = async () => {
          return (
            accounts ??
            (accounts = await accountSelect({
              basePaths: DEFAULT_BASE_PATHS,
              assets,
              chains,
              scanAccounts,
              walletIcon: await getIcon()
            }))
          )
        }

        const ledgerProvider = {}

        const provider = createEIP1193Provider(ledgerProvider, {
          eth_requestAccounts: async baseRequest => {
            // Triggers the account select modal if no accounts have been selected
            const [{ address }] = await getAccounts()
            return [address]
          },
          eth_accounts: async baseRequest => {
            return accounts?.[0]?.address ? [accounts[0].address] : []
          },
          eth_chainId: async baseRequest => {
            return currentChain?.id ?? ''
          },
          eth_signTransaction: async (baseRequest, [transactionObject]) => {
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
              transactionObject.gas ?? transactionObject.gasLimit

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
          eth_sign: async (baseRequest, [address, message]) => {
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
          eth_signTypedData: async (baseRequest, [address, typedData]) => {
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
          wallet_switchEthereumChain: async (baseRequest, [{ chainId }]) => {
            currentChain =
              chains.find(({ id }) => id === chainId) ?? currentChain
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
