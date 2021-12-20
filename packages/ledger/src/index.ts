import { accountSelect, createEIP1193Provider } from '@bn-onboard/common'
import {
  ScanAccountsOptions,
  Account,
  Asset
} from '@bn-onboard/common/src/types'
import type { Chain, WalletInit } from '@bn-onboard/types'
import type { BIP32Interface } from 'bip32'
import type Transport from '@ledgerhq/hw-transport'

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

const getFullDerivationPath = (derivationPath: string, index: number): string =>
  derivationPath === LEDGER_LIVE_PATH
    ? `${derivationPath}/${index}'/0/0`
    : `${derivationPath}/${index}`

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
): Promise<string> => {
  const { providers } = await import('ethers')
  const provider = new providers.JsonRpcProvider(rpcUrl)
  return (await provider.getBalance(address, block)).toHexString()
}

const getAddress = async (
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

  console.log({
    address,
    index,
    derivationPath,
    fullPath: `${derivationPath}/${index}`
  })

  return {
    derivationPath,
    address,
    balance: {
      asset: asset.label,
      value: await getBalance(address, rpcUrl)
    }
  }
}

const getAddresses = (
  account: LedgerAccount,
  asset: Asset,
  currentChain: Chain,
  offset: number = 0,
  limit: number = 15
): Promise<Account[]> =>
  limit - offset <= 0
    ? (() => {
        throw new Error('Offset must be less than limit')
      })()
    : Promise.all(
        Array.from({ length: limit - offset }, (_, index) =>
          getAddress(account, asset, currentChain, index)
        )
      )

function ledger(): WalletInit {
  return () => {
    let accounts: Account[] | undefined
    return {
      label: 'Ledger',
      getIcon: async () => (await import('./icon')).default,
      getInterface: async ({ EventEmitter, chains }) => {
        const Eth = (await import('@ledgerhq/hw-app-eth')).default
        const { TransactionFactory: Transaction, Capability } = await import(
          '@ethereumjs/tx'
        )
        const { default: Common, Hardfork } = await import('@ethereumjs/common')
        const { rlp } = (await import('ethereumjs-util')).default

        const transport: Transport = await getTransport()
        const eth = new Eth(transport)
        const eventEmitter = new EventEmitter()

        let currentChain: Chain | undefined
        const scanAccounts = async ({
          derivationPath,
          chainId,
          asset
        }: ScanAccountsOptions): Promise<Account[]> => {
          currentChain = chains.find(({ id }) => id === chainId)
          // TODO: Maybe throw error here
          if (!currentChain) return []

          const { publicKey, chainCode } = await eth.getAddress(
            derivationPath,
            false,
            true // set to true to return chainCode
          )

          const { compress } = (await import('eth-crypto')).publicKey

          return getAddresses(
            {
              publicKey: compress(publicKey),
              chainCode: chainCode ?? '',
              derivationPath: derivationPath
            },
            asset,
            currentChain
          )
        }

        const getAccounts = async () =>
          accounts ??
          (accounts = await accountSelect({
            basePaths: DEFAULT_BASE_PATHS,
            assets,
            chains,
            scanAccounts,
            walletIcon: '<svg></svg>'
          }))

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
            console.log('eth_chainId called', currentChain?.id)
            return currentChain?.id ?? ''
          },
          eth_getBalance: async (baseRequest, [address, block]) => {
            return currentChain?.rpcUrl
              ? getBalance(address, currentChain?.rpcUrl, block)
              : '0x'
          },
          eth_signTransaction: async (baseRequest, [transactionObject]) => {
            const common = new Common({
              chain: currentChain?.id || 1,
              // Berlin is the minimum hardfork that will allow for EIP1559
              hardfork: Hardfork.Berlin,
              // List of supported EIPS
              eips: [1559]
            })
            try {
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
                unsignedTx = rlp.encode(unsignedTx)
              }

              const [{ derivationPath }] = accounts || [{ derivationPath: '' }]

              const { v, r, s } = await eth.signTransaction(
                derivationPath,
                unsignedTx.toString()
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

              return `0x${signedTx.serialize().toString('hex')}`
            } catch (error) {}
            return ''
          },
          wallet_switchEthereumChain: async (baseRequest, [{ chainId }]) => {
            currentChain = chains.find(({ id }) => id === chainId)
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
