import {
  Account,
  accountSelect,
  Chain,
  createEIP1193Provider,
  CustomNetwork,
  GetInterfaceHelpers,
  ProviderRpcError,
  ScanAccountsOptions,
  WalletInit
} from '@bn-onboard/common'
import type { providers } from 'ethers'

const DEFAULT_BASE_PATHS = "m/44'/60'/0'/0"

const basePaths = [
  {
    label: 'Keystone',
    value: DEFAULT_BASE_PATHS
  }
]

const assets = [
  {
    label: 'ETH'
  }
]

const getAccount = async (
  keyring: any,
  provider: providers.JsonRpcProvider,
  index: number
): Promise<Account> => {
  const address = (await keyring.addAccounts())?.[index]
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
  provider: providers.JsonRpcProvider
): Promise<Account[]> => {
  const accounts = []
  let zeroBalanceAccounts = 0,
    index = 0

  while (zeroBalanceAccounts < 5) {
    const account = await getAccount(keyring, provider, index)
    if (account?.balance?.value?.isZero()) {
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
  const getIcon = async () => (await import('./icon')).default
  return () => ({
    label: 'Keystone',
    getIcon,
    getInterface: async ({ EventEmitter, chains }: GetInterfaceHelpers) => {
      const { providers } = await import('ethers')
      const { default: AirGapedKeyring } = await import(
        '@keystonehq/eth-keyring'
      )
      const { TransactionFactory: Transaction, Capability } = await import(
        '@ethereumjs/tx'
      )
      const ethUtil = await import('ethereumjs-util')
      const { default: Common, Hardfork } = await import('@ethereumjs/common')

      const keyring = AirGapedKeyring.getEmptyKeyring()

      const eventEmitter = new EventEmitter()

      let currentChain: Chain = chains[0]
      const scanAccounts = async ({
        derivationPath,
        chainId,
        asset
      }: ScanAccountsOptions): Promise<Account[]> => {
        await keyring.readKeyring()
        currentChain =
          chains.find(({ id }: Chain) => id === chainId) ?? currentChain

        const provider = new providers.JsonRpcProvider(currentChain.rpcUrl)
        return generateAccounts(keyring, provider)
      }

      let accounts: Account[] | undefined

      const getAccounts = async () => {
        let accounts: Account[] = []

        accounts = await accountSelect({
          basePaths,
          assets,
          chains,
          scanAccounts,
          walletIcon: await getIcon()
        })

        if (accounts.length) {
          eventEmitter.emit('accountsChanged', [accounts[0].address])
        }

        return accounts
      }

      const keystoneProvider = {}
      const provider = createEIP1193Provider(keystoneProvider, {
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
          return currentChain?.id ?? ''
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

          // const { v, r, s } = await eth.signTransaction(
          //   derivationPath,
          //   unsignedTx.toString('hex')
          // )

          const { v, r, s } = await keyring.signTransaction(from, transaction)

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
        wallet_addEthereumChain: null
      })

      provider.on = eventEmitter.on.bind(eventEmitter)

      return {
        provider
      }
    }
  })
}

export default keystone
