import {
  ScanAccountsOptions,
  Account,
  Asset
} from '@bn-onboard/common/src/types'
import type { Chain, CustomNetwork, WalletInit } from '@bn-onboard/types'
import type { providers } from 'ethers'

const TREZOR_DEFAULT_PATH = "m/44'/60'/0'/0"

const assets = [
  {
    label: 'ETH'
  }
]

const DEFAULT_BASE_PATHS = [
  {
    label: 'Ethereum',
    value: TREZOR_DEFAULT_PATH
  }
]

const getAccount = async (
  address: string,
  asset: Asset,
  dPath: string,
  provider: providers.JsonRpcProvider,
): Promise<Account> => {
  return {
    derivationPath: dPath,
    address,
    balance: {
      asset: asset.label,
      value: await provider.getBalance(address)
    }
  }
}

const getAddresses = (
  addressList: any,
  asset: Asset,
  provider: providers.JsonRpcProvider,
): Promise<Account[]> => {
  const accounts = []
// Change to map
  for (let [address, path] of  addressList.entries()) {
    accounts.push(getAccount(address, asset, path, provider))
  }
  return Promise.all(accounts)
}


function trezor({customNetwork}: {customNetwork?: CustomNetwork} = {}): WalletInit {
  const getIcon = async () => (await import('./icon')).default

  return () => {
    let accounts: Account[] | undefined
    return {
      label: 'Trezor',
      getIcon,
      getInterface: async ({ EventEmitter, chains, appMetadata }) => {
        
        const TrezorConnectLibrary = await import('trezor-connect')
        const { Transaction } = await import('@ethereumjs/tx')
        const { default: Common, Hardfork } = await import('@ethereumjs/common')
        const ethUtil = await import('ethereumjs-util')
        const { accountSelect, createEIP1193Provider, ProviderRpcError } = await import('@bn-onboard/common')
        const { default: TrezorConnect, DEVICE_EVENT, DEVICE } = TrezorConnectLibrary
        const { generateAddresses, isValidPath } = await import('./hd-wallet-helpers')
        const { providers } = await import('ethers')
        
        // Initialize!!
        
        if (!(appMetadata?.email && appMetadata?.appUrl)) {
          throw new Error('Email and AppUrl required for Trezor Wallet')
        }
        
        const {email, appUrl} = appMetadata;
        
        TrezorConnect.manifest({
          email: email,
          appUrl: appUrl
        })
        
        let currentChain: Chain = chains[0]
        
        // Variables
        const eventEmitter = new EventEmitter()
        
        let addressToPath: any = new Map();
        let dPath: string = ''
        let assetType: Asset;
        
        let enabled: boolean = false
        
        let account:
        | undefined
        | { publicKey: string; chainCode: string; path: string }
        

        function enable() {
          enabled = true
          return enableAccounts()
        }

        async function getAddress(path: string) {
          const errorMsg = `Unable to derive address from path ${path}`
      
          try {
            const result = await TrezorConnect.ethereumGetAddress({
              path,
              showOnTrezor: false
            })
      
            if (!result.success) {
              throw new Error(errorMsg)
            }
      
            return result.payload.address
          } catch (error) {
            throw new Error(errorMsg)
          }
        }

        async function enableAccounts() {

          if (dPath === '') {
            dPath = TREZOR_DEFAULT_PATH
          }
          
          if (!account) {
            try {
              account = await getPublicKey()
            } catch (error) {
              throw error
            }
          }
      
          const addressInfo = generateAddresses(account, addressToPath.size)
      
          addressInfo.forEach(({ dPath, address }) => {
            addressToPath.set(address, dPath)
          })

        }

        async function getAccountsForScan(): Promise<Account[]> {
          if (!enabled) {
            return []
          }

          const provider = new providers.JsonRpcProvider(currentChain.rpcUrl)
          return getAddresses(addressToPath, assetType, provider)
        }
 
        async function getPublicKey() {
          if (!dPath) {
            throw new Error('a derivation path is needed to get the public key')
          }
      
          try {
            const result = await TrezorConnect.getPublicKey({
              path: dPath,
              coin: 'eth'
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

        const scanAccounts = async ({derivationPath, chainId, asset}: ScanAccountsOptions): Promise<Account[]> => {
          if (derivationPath !== dPath) addressToPath = new Map()
          if (!isValidPath(derivationPath)) {
            throw new Error('Invalid derivation path')
          } 
          dPath = derivationPath;
          assetType = asset;
          currentChain = chains.find(({ id }) => id === chainId) ?? currentChain
          return getAccountsForScan()
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

      
        function trezorSignTransactionLegacy(path: string, transactionData: any) {
          const { nonce, gasPrice, gas, to, value, data } = transactionData
      
          return TrezorConnect.ethereumSignTransaction({
            path: path,
            transaction: {
              to,
              value: value || '',
              data: data || '',
              chainId: parseInt(currentChain?.id),
              nonce,
              gasPrice,
              gasLimit: gas,
            }
          })
        }
        // Handle both    
        function trezorSignTransaction1559(path: string, transactionData: any) {
          const { nonce, gas, to, value, data, maxFeePerGas, maxPriorityFeePerGas } = transactionData
      
          return TrezorConnect.ethereumSignTransaction({
            path: path,
            transaction: {
              to,
              value: value || '',
              data: data || '',
              chainId: parseInt(currentChain?.id),
              nonce,
              gasLimit: gas,
              maxFeePerGas,
              maxPriorityFeePerGas,
            }
          })
        }

        function trezorSignTransaction(path: string, transactionData: any) {
          if (transactionData.hasOwnProperty('maxFeePerGas') && transactionData.hasOwnProperty('maxPriorityFeePerGas')) {
            return trezorSignTransaction1559(path, transactionData)
          }
          return trezorSignTransactionLegacy(path, transactionData)
        }
      
        async function signTransaction(transactionData: any) {
          if (addressToPath.size === 0 || !accounts) {
            enableAccounts();
          }
          const path = [...addressToPath.values()][0]
          const { BN, toBuffer } = ethUtil
          const common = new Common({
            chain: customNetwork || currentChain?.id || 1
          })
          const transaction = Transaction.fromTxData(
            {
              ...transactionData,
              gasLimit: transactionData.gas ?? transactionData.gasLimit
            },
            { common, freeze: false }
          )
          transaction.v = new BN(toBuffer(currentChain?.id))
          transaction.r = transaction.s = new BN(toBuffer(0))
          const trezorResult = await trezorSignTransaction(path, transactionData)
          if (!trezorResult.success) {
            throw new Error(trezorResult.payload.error)
          }
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
      
        
        async function signMessage(message: { data: string }): Promise<string> {
          if (addressToPath.size === 0 || !accounts) {
            enableAccounts();
          }
      
          const [address, path] = [...addressToPath.entries()][0]
      
          return new Promise((resolve, reject) => {
            TrezorConnect.ethereumSignMessage({
              path,
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
          eth_requestAccounts: async baseRequest => {
            await enable()
            const accounts = await getAccountFromAccountSelect()
            if (accounts?.length === 0) {
              throw new ProviderRpcError({
                code: 4001,
                message: 'User rejected the request.'
              })
            }
            return [accounts[0]?.address]
          },
          eth_accounts: async baseRequest => {
            return accounts?.[0]?.address ? [accounts[0].address] : []
          },
          eth_chainId: async baseRequest => {
            return currentChain?.id ?? ''
          },
          eth_signTransaction: async (baseRequest, [transactionObject]) => {
             return signTransaction(transactionObject)
          },
          eth_sign: async (baseRequest, [address, message]) => {
            let messageData = { data: message }
            return signMessage(messageData)
          },
          wallet_switchEthereumChain: async (baseRequest, [{ chainId }]) => {
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

