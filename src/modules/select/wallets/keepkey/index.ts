/* eslint-disable @typescript-eslint/camelcase */
import {
  CommonWalletOptions,
  Helpers,
  WalletModule
} from '../../../../interfaces'
import { ModalType, renderModal } from './entryModal'

import keepKeyIcon from '../../wallet-icons/icon-keepkey.png'

/* -= CONSTANTS =- */

const ACCOUNTS_TO_GET = 5
const WALLET_NAME = 'KeepKey'
const ERROR_BUSY: ErrorCode = 'busy'
const ERROR_PAIRING: ErrorCode = 'pairing'

const errorMessages = {
  [ERROR_BUSY]: `Your KeepKey is currently connected to another application.
  Please close any other browser tabs or applications that may be connected to your device and try again.`,
  [ERROR_PAIRING]:
    'There was an error pairing the device. Please disconnect and reconnect the device and try again.'
}

/* -= TYPES =- */

type ErrorCode = 'busy' | 'pairing'

type Balance = {
  address: string
  balance: string
}

interface KeepProviderOptions {
  BigNumber: Helpers['BigNumber']
  rpcUrl: string
  resetWalletState: Helpers['resetWalletState']
  networkId: number
}

function keepkey(
  options: CommonWalletOptions & { rpcUrl: string; networkId: number }
): WalletModule {
  const { label, iconSrc, rpcUrl, networkId, preferred } = options

  // Used to signal if the keep key could not be paired or if the keep key is already paired with another app
  let installMessage: string
  return {
    name: label || WALLET_NAME,
    iconSrc: iconSrc || keepKeyIcon,
    wallet: async ({ BigNumber, resetWalletState, getENS }: Helpers) => {
      const { provider, error } = await createKeepKeyProvider({
        resetWalletState,
        BigNumber,
        rpcUrl,
        networkId
      })

      installMessage = errorMessages[error as ErrorCode] || ''
      return {
        provider,
        interface: !error
          ? {
              name: WALLET_NAME,
              connect: provider.enable,
              disconnect: provider.disconnect,
              address: {
                get: async () => provider.getPrimaryAddress()
              },
              ens: {
                get: () => getENS(provider, provider.getPrimaryAddress())
              },
              network: {
                get: async () => networkId
              },
              balance: {
                get: async () => {
                  const address = provider.getPrimaryAddress()
                  return address && provider.getBalance(address)
                }
              }
            }
          : null
      }
    },
    // The style tag here is used to hide the 'Open KeepKey button'
    installMessage: () =>
      installMessage
        ? `<style>footer a > button { display: none !important }</style>
        <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">
          ${installMessage}
        </p>`
        : '',
    type: 'hardware',
    mobile: false,
    desktop: true,
    preferred
  }
}

async function createKeepKeyProvider({
  BigNumber,
  rpcUrl,
  resetWalletState,
  networkId
}: KeepProviderOptions): Promise<{ provider: any; error?: ErrorCode }> {
  const { WebUSBKeepKeyAdapter } = await import(
    '@shapeshiftoss/hdwallet-keepkey-webusb'
  )

  const { Keyring, Events, bip32ToAddressNList, HDWalletErrorType } =
    await import('@shapeshiftoss/hdwallet-core')

  const { default: createProvider } = await import('../providerEngine')
  const { isValidPath } = await import('../hd-wallet')

  // Initialize the adapter and pair the device
  const keyring = new Keyring()
  const keepKeyAdapter = WebUSBKeepKeyAdapter.useKeyring(keyring)
  let keepKeyWallet: import('@shapeshiftoss/hdwallet-keepkey').KeepKeyHDWallet

  try {
    keepKeyWallet =
      (await keepKeyAdapter.pairDevice()) as import('@shapeshiftoss/hdwallet-keepkey').KeepKeyHDWallet
  } catch (error) {
    // This error indicates that the keepkey is paired with another app
    if (error.name === HDWalletErrorType.ConflictingApp) {
      return { provider: undefined, error: ERROR_BUSY }
      // This error indicates that for some reason we can't claim the usb device
    } else if (error.name === HDWalletErrorType.WebUSBCouldNotPair) {
      return { provider: undefined, error: ERROR_PAIRING }
    }
  }

  const DEFAULT_DERIVATION_PATH = "m/44'/60'/0'/0/0"

  // The currently selected derivation path
  let dPath = ''
  let addressToPath = new Map()
  let enabled = false
  let customPath = false

  const provider = createProvider({
    getAccounts: (callback: any) => {
      getAccounts()
        .then((res: Array<string | undefined>) => callback(null, res))
        .catch((err: any) => callback(err, null))
    },
    signTransaction: (transactionData: any, callback: any) => {
      signTransaction(transactionData)
        .then((res: string) => callback(null, res))
        .catch(err => callback(err, null))
    },
    processMessage: (messageData: any, callback: any) => {
      signMessage(messageData)
        .then((res: string) => callback(null, res))
        .catch(err => callback(err, null))
    },
    processPersonalMessage: (messageData: any, callback: any) => {
      signMessage(messageData)
        .then((res: string) => callback(null, res))
        .catch(err => callback(err, null))
    },
    signMessage: (messageData: any, callback: any) => {
      signMessage(messageData)
        .then((res: string) => callback(null, res))
        .catch(err => callback(err, null))
    },
    signPersonalMessage: (messageData: any, callback: any) => {
      signMessage(messageData)
        .then((res: string) => callback(null, res))
        .catch(err => callback(err, null))
    },
    rpcUrl
  })

  keyring.on(['*', '*', Events.DISCONNECT], async () => {
    resetWalletState({ disconnected: true, walletName: WALLET_NAME })
  })

  // If the wallet asks for a PIN, open the PIN modal
  keyring.on(['*', '*', Events.PIN_REQUEST], () => {
    renderModal(keepKeyWallet, ModalType.Pin)
  })

  // If the wallet asks for a PIN, open the PIN modal
  keyring.on(['*', '*', Events.PASSPHRASE_REQUEST], () => {
    renderModal(keepKeyWallet, ModalType.Passphrase)
  })

  provider.setPath = setPath
  provider.dPath = dPath
  provider.enable = enable
  provider.setPrimaryAccount = setPrimaryAccount
  provider.getPrimaryAddress = getPrimaryAddress
  provider.getAccounts = getAccounts
  provider.getMoreAccounts = getMoreAccounts
  provider.getBalance = getBalance
  provider.getBalances = getBalances
  provider.send = provider.sendAsync
  provider.disconnect = disconnect
  provider.isCustomPath = isCustomPath

  async function enable(): Promise<Array<string | undefined>> {
    // Cancel any user prompt that may be displayed on the keepkey i.e. the pin matrix
    keepKeyWallet.cancel().catch(err => err)

    enabled = true
    return getAccounts().catch((error: any) => {
      // If the error.message is an object, then the error message originated from keepkey
      // So we grab the string and rethrow so the walletcheck can capture and display
      if (error?.message?.message) {
        throw new Error(error?.message?.message)
      }
      return []
    })
  }

  function disconnect() {
    dPath = ''
    addressToPath = new Map()
    enabled = false
    keepKeyWallet.clearSession()
    provider.stop()
  }

  async function setPath(path: string, custom?: boolean): Promise<boolean> {
    if (!isValidPath(path)) {
      return false
    }

    if (path !== dPath) {
      // clear any existing addresses if different path
      addressToPath = new Map()
    }

    if (custom) {
      try {
        // Convert the path to the addressNList which is what is used by keepkey for signing
        const addressNList = bip32ToAddressNList(path)
        const address = await getAddress(addressNList, path)
        addressToPath.set(address, addressNList)
        dPath = path
        customPath = true

        return true
      } catch (error) {
        throw new Error(
          `There was a problem deriving an address from path ${path}`
        )
      }
    }

    customPath = false
    dPath = path

    return true
  }

  function isCustomPath(): boolean {
    return customPath
  }

  async function getAddress(
    addressNList: number[],
    path: string
  ): Promise<string> {
    try {
      return keepKeyWallet.ethGetAddress({
        addressNList
      })
    } catch (error) {
      throw new Error(`Unable to derive address from path ${path}`)
    }
  }

  function addresses(): string[] {
    return Array.from(addressToPath.keys())
  }

  function setPrimaryAccount(address: string) {
    // make a copy and put in an array
    const accounts = [...addressToPath.entries()]
    const accountIndex = accounts.findIndex(
      ([accountAddress]) => accountAddress === address
    )
    // pull the item at the account index out of the array and place at the front
    accounts.unshift(accounts.splice(accountIndex, 1)[0])
    // reassign addressToPath to new ordered accounts
    addressToPath = new Map(accounts)
  }

  function getPrimaryAddress(): string | undefined {
    return enabled ? addresses()[0] : undefined
  }

  async function getMoreAccounts() {
    const accounts = await getAccounts(true)
    return accounts && getBalances(accounts)
  }

  async function getAccounts(getMore?: boolean): Promise<Array<string>> {
    if (!enabled) return []
    if (addressToPath.size > 0 && !getMore) return addresses()

    dPath = dPath || DEFAULT_DERIVATION_PATH

    // Get the account index from the derivation path
    const { accountIdx } = keepKeyWallet.describePath({
      path: bip32ToAddressNList(dPath),
      coin: 'Ethereum'
    })

    // This would only happen if the user provides an invalid dPath and it wasn't caught by the setPath method
    if (accountIdx === undefined)
      throw new Error(`Could not derive account from path: ${dPath}`)

    // Calculate the index to start from based on the dPath index and the current number of generated addresses
    const startingIndex = accountIdx + addressToPath.size
    for (let i = startingIndex; i < ACCOUNTS_TO_GET + startingIndex; i++) {
      // Retrieve the array form of the derivation path for a given account index
      const { addressNList } = keepKeyWallet.ethGetAccountPaths({
        coin: 'Ethereum',
        accountIdx: i
      })[0]

      // Retrieve the address associated with the given account index
      const address = await keepKeyWallet.ethGetAddress({
        addressNList,
        showDisplay: false
      })

      // Store the address in our set of generated addresses
      addressToPath.set(address, addressNList)
    }
    return addresses()
  }

  function getBalances(
    addresses: Array<string>
  ): Promise<Balance[] | unknown[]> {
    return Promise.all(
      addresses.map(
        address =>
          new Promise(async resolve => {
            const balance = await getBalance(address)
            resolve({ address, balance })
          })
      )
    )
  }

  function getBalance(address: string): Promise<Balance | null> {
    return new Promise((resolve, reject) => {
      provider.sendAsync(
        {
          jsonrpc: '2.0',
          method: 'eth_getBalance',
          params: [address, 'latest'],
          id: 42
        },
        (e: any, res: any) => {
          e && reject(e)
          const result = res && res.result

          if (result != null) {
            resolve(new BigNumber(result).toString(10))
          } else {
            resolve(null)
          }
        }
      )
    })
  }

  async function signTransaction(transactionData: any) {
    if (addressToPath.size === 0) {
      await enable()
    }

    const addressNList = [...addressToPath.values()][0]

    const { nonce, gasPrice, gas, to, value, data } = transactionData

    const { serialized } = await keepKeyWallet.ethSignTx({
      addressNList,
      nonce,
      gasPrice,
      gasLimit: gas,
      to,
      value: value || '',
      data: data || '',
      chainId: networkId
    })

    return serialized
  }

  async function signMessage({
    data: message
  }: {
    data: string
  }): Promise<string> {
    if (addressToPath.size === 0) {
      await enable()
    }

    const addressNList = [...addressToPath.values()][0]

    const { signature } = await keepKeyWallet.ethSignMessage({
      addressNList,
      message
    })

    return signature
  }

  return { provider }
}

export default keepkey
