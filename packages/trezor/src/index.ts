import {
  ScanAccountsOptions,
  Account,
  Asset,
  Chain,
  CustomNetwork,
  WalletInit
} from '@bn-onboard/common/src/types'
import type { providers } from 'ethers'
import type { BIP32Interface } from 'bip32'

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

interface AccountData { publicKey: string; chainCode: string; path: string };

const getAccount = async (
  { publicKey, chainCode, path }: AccountData,
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
  while (zeroBalanceAccounts < 10) {
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


function trezor({customNetwork}: {customNetwork?: CustomNetwork} = {}): WalletInit {
  const getIcon = async () => (await import('./icon')).default

  return () => {
    let accounts: Account[] | undefined
    return {
      label: 'Trezor',
      getIcon,
      getInterface: async ({ EventEmitter, chains, appMetadata }) => {
        
        const { isValidPath } = await import('./hd-wallet-helpers')
        const TrezorConnectLibrary = await import('trezor-connect')
        const { default: TrezorConnect } = TrezorConnectLibrary
        const { Transaction } = await import('@ethereumjs/tx')
        const { default: Common, Hardfork } = await import('@ethereumjs/common')
        const { accountSelect, createEIP1193Provider, ProviderRpcError } = await import('@bn-onboard/common')
        const ethUtil = await import('ethereumjs-util')
        const { compress } = (await import('eth-crypto')).publicKey
        const { providers } = await import('ethers')
        
        if (!(appMetadata?.email && appMetadata?.appUrl)) {
          throw new Error('Email and AppUrl required in AppMetaData for Trezor Wallet Connection')
        }
        
        const { email, appUrl } = appMetadata;
        
        TrezorConnect.manifest({
          email: email,
          appUrl: appUrl
        })
        
        const eventEmitter = new EventEmitter()
        let currentChain: Chain = chains[0]
        
        let account: { publicKey: string; chainCode: string; path: string } | undefined

        const scanAccounts = async ({derivationPath, chainId, asset}: ScanAccountsOptions): Promise<Account[]> => {
          currentChain = chains.find(({ id }) => id === chainId) ?? currentChain
          const provider = new providers.JsonRpcProvider(currentChain.rpcUrl)
          
          const {publicKey, chainCode, path} = await getPublicKey(derivationPath);

          if ( derivationPath !== TREZOR_DEFAULT_PATH && isValidPath(derivationPath) ) {
            const address = await getAddress(path);
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
              chainCode: chainCode ?? '',
              path: derivationPath
            },
            asset,
            provider
          )
        }

        const getAccountFromAccountSelect = async () =>
        accounts ??
        (accounts = await accountSelect({
          basePaths: DEFAULT_BASE_PATHS,
          assets,
          chains,
          scanAccounts,
          walletIcon: await getIcon()
        }))

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
              coin: "ETH"
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
            throw new Error('There was an error accessing your Trezor accounts.')
          }
        }

        function trezorSignTransactionLegacy(path: string, transactionData: any) {
          const { nonce, gasPrice, gasLimit, gas, to, value, data } = transactionData
      
          return TrezorConnect.ethereumSignTransaction({
            path: path,
            transaction: {
              to,
              value: value || '',
              data: data || '',
              chainId: parseInt(currentChain?.id),
              nonce,
              gasPrice,
              gasLimit: gasLimit || gas,
            }
          })
        }

        function trezorSignTransaction1559(path: string, transactionData: any) {
          const { nonce, gas, gasLimit, to, value, data, maxFeePerGas, maxPriorityFeePerGas } = transactionData
      
          return TrezorConnect.ethereumSignTransaction({
            path: path,
            transaction: {
              to,
              value: value || '',
              data: data || '',
              chainId: parseInt(currentChain?.id),
              nonce,
              gasLimit: gasLimit || gas,
              maxFeePerGas,
              maxPriorityFeePerGas,
            }
          })
        }

        function trezorSignTransaction(path: string, transactionData: any) {
          if (transactionData.hasOwnProperty('maxFeePerGas') || transactionData.hasOwnProperty('maxPriorityFeePerGas')) {
            return trezorSignTransaction1559(path, transactionData)
          }
          return trezorSignTransactionLegacy(path, transactionData)
        }
      
        async function signTransaction(transactionObject: any) {
          if (!(accounts?.length && accounts?.length > 0))
            throw new Error(
              'No account selected. Must call eth_requestAccounts first.'
            )
          
          const signingAccount =
            accounts.find(
              account => account.address === transactionObject?.from
            ) || accounts[0]

          const { address: from, derivationPath } = signingAccount

          // Set the `from` field to the currently selected account
          transactionObject = { ...transactionObject, from }

          const common = new Common({
            chain: customNetwork || Number.parseInt(currentChain?.id) || 1,
            // Berlin is the minimum hardfork that will allow for EIP1559
            hardfork: Hardfork.Berlin,
            // List of supported EIPS
            eips: [1559]
          })
          
          const { BN, toBuffer } = ethUtil
          
          const transaction = Transaction.fromTxData(
            {
              ...transactionObject,
              gasLimit: transactionObject.gas ?? transactionObject.gasLimit
            },
            { common, freeze: false }
            )

          transaction.v = new BN(toBuffer(currentChain?.id))
          transaction.r = transaction.s = new BN(toBuffer(0))
          const trezorResult = await trezorSignTransaction(signingAccount.derivationPath, transactionObject)
          if (!trezorResult.success) {
            throw new Error(trezorResult.payload.error)
          }
          console.log(trezorResult)
          let v = trezorResult.payload.v.toString(16)
          // EIP155 support. check/recalc signature v value.
          const rv = parseInt(v, 16)
          let cv = parseInt(currentChain?.id) * 2 + 35
          if (rv !== cv && (rv & cv) !== rv) {
            cv += 1 // add signature v bit.
          }
          v = cv.toString(16)
          transaction.v = new BN(toBuffer(`0x${v}`))
          transaction.r = new BN(toBuffer(`${trezorResult.payload.r}`))
          transaction.s = new BN(toBuffer(`${trezorResult.payload.s}`))
          return `0x${transaction.serialize().toString('hex')}`
        }
      
        
        async function signMessage(address: string, message: { data: string }): Promise<string> {
          if (!(accounts?.length && accounts?.length > 0))
            throw new Error(
              'No account selected. Must call eth_requestAccounts first.'
            )
      
          const accountToSign =
            accounts.find(account => account.address === address) ||
            accounts[0]

          return new Promise((resolve, reject) => {
            TrezorConnect.ethereumSignMessage({
              path: accountToSign.derivationPath,
              message: ethUtil.stripHexPrefix(message.data),
              hex: true
            }).then((response: any) => {
              if (response.success) {
                if (response.payload.address !== ethUtil.toChecksumAddress(address)) {
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
            return signTransaction(transactionObject)
          },
          eth_sign: async ({ params: [address, message] }) => {
            let messageData = { data: message }
            return signMessage(address, messageData)
          },
          wallet_switchEthereumChain: async ({ params: [{ chainId }] }) => {
            currentChain =
            chains.find(({ id }) => id === chainId) ?? currentChain
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
