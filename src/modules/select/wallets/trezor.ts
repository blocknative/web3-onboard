import {
  TrezorOptions,
  WalletModule,
  Helpers
} from '../../../interfaces'
import trezorIcon from '../wallet-icons/icon-trezor'

import createProvider from './providerEngine'
import { generateAddresses, isValidPath } from './hd-wallet'

const TREZOR_DEFAULT_PATH = "m/44'/60'/0'/0"

function trezor(options: TrezorOptions & { networkId: number }): WalletModule {
  const {
    rpcUrl,
    networkId,
    email,
    appUrl,
    preferred,
    label,
    iconSrc,
    svg
  } = options

  return {
    name: label || 'Trezor',
    svg: svg || trezorIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      const { BigNumber, networkName } = helpers

      const provider = await trezorProvider({
        rpcUrl,
        networkId,
        email,
        appUrl,
        BigNumber,
        networkName
      })

      return {
        provider,
        interface: {
          name: 'Trezor',
          connect: provider.enable,
          disconnect: provider.disconnect,
          address: {
            get: async () => provider.getPrimaryAddress()
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
      }
    },
    type: 'hardware',
    desktop: true,
    mobile: true,
    osExclusions: ['iOS'],
    preferred
  }
}

async function trezorProvider(options: {
  networkId: number
  email: string
  appUrl: string
  rpcUrl: string
  BigNumber: any
  networkName: (id: number) => string
}) {
  const TrezorConnectLibrary = await import('trezor-connect')
  const EthereumTx = await import('ethereumjs-tx')
  const ethUtil = await import('ethereumjs-util')

  const { default: TrezorConnect, DEVICE_EVENT, DEVICE } = TrezorConnectLibrary

  const { networkId, email, appUrl, rpcUrl, BigNumber, networkName } = options
  let dPath: string = ''

  let addressToPath = new Map()
  let enabled: boolean = false
  let customPath: boolean = false

  let account:
    | undefined
    | { publicKey: string; chainCode: string; path: string }

  TrezorConnect.manifest({
    email,
    appUrl
  })

  TrezorConnect.on(DEVICE_EVENT, (event: any) => {
    if (event.type === DEVICE.DISCONNECT) {
      enabled = false
      addressToPath = new Map()
    }
  })

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

  function disconnect() {
    dPath = ''
    addressToPath = new Map()
    enabled = false
    provider.stop()
  }

  async function setPath(path: string, custom?: boolean) {
    if (!isValidPath(path)) {
      return false
    }

    if (path !== dPath) {
      // clear any exsting addresses if different path
      addressToPath = new Map()
    }

    if (custom) {
      try {
        const address = await getAddress(path)
        addressToPath.set(address, path)
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

  function isCustomPath() {
    return customPath
  }

  function enable() {
    enabled = true
    return getAccounts()
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

  function addresses() {
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

  function getPrimaryAddress() {
    return enabled ? addresses()[0] : undefined
  }

  async function getMoreAccounts() {
    const accounts = await getAccounts(true)
    return getBalances(accounts)
  }

  async function getAccounts(getMore?: boolean) {
    if (!enabled) {
      return [undefined]
    }

    if (addressToPath.size > 0 && !getMore) {
      return addresses()
    }

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

    return addresses()
  }

  function getBalances(addresses: Array<string>) {
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

  function getBalance(address: string) {
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

  function trezorSignTransaction(path: string, transactionData: any) {
    const { nonce, gasPrice, gas, to, value, data } = transactionData

    return TrezorConnect.ethereumSignTransaction({
      path: path,
      transaction: {
        nonce,
        gasPrice,
        gasLimit: gas,
        to,
        value: value || '',
        data: data || '',
        chainId: networkId
      }
    })
  }

  async function signTransaction(transactionData: any) {
    if (addressToPath.size === 0) {
      await enable()
    }

    const path = [...addressToPath.values()][0]

    const transaction = new EthereumTx.Transaction(transactionData, {
      chain: networkName(networkId)
    })

    const trezorResult = await trezorSignTransaction(path, transactionData)

    if (!trezorResult.success) {
      throw new Error(trezorResult.payload.error)
    }

    const signature = trezorResult.payload
    transaction.v = signature.v
    transaction.r = signature.r
    transaction.s = signature.s

    return `0x${transaction.serialize().toString('hex')}`
  }

  async function signMessage(message: { data: string }): Promise<string> {
    if (addressToPath.size === 0) {
      await enable()
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

  return provider
}

export default trezor
