import {
  TrezorOptions,
  WalletModule,
  Helpers,
  CommonWalletOptions
} from '../../../interfaces'
import trezorIcon from '../wallet-icons/icon-trezor'

import createProvider from './providerEngine'

import * as TrezorConnectLibrary from 'trezor-connect'
import * as EthereumTx from 'ethereumjs-tx'

const { default: TrezorConnect, DEVICE_EVENT, DEVICE } = TrezorConnectLibrary

function trezor(options: TrezorOptions & CommonWalletOptions): WalletModule {
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
          disconnect: () => provider.stop(),
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
  const { networkId, email, appUrl, rpcUrl, BigNumber, networkName } = options
  const basePath = networkIdToDerivationPath(networkId)

  let addressToPath = new Map()
  let enabled: boolean = false

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
        .then((res: Array<string>) => callback(null, res))
        .catch(err => callback(err, null))
    },
    signTransaction: (transactionData: any, callback: any) => {
      signTransaction(transactionData)
        .then((res: string) => callback(null, res))
        .catch(err => callback(err, null))
    },
    rpcUrl
  })

  provider.getPrimaryAddress = getPrimaryAddress
  provider.getAllAccountsAndBalances = getAllAccountsAndBalances
  provider.enable = enable
  provider.setPrimaryAccount = setPrimaryAccount
  provider.getBalance = getBalance
  provider.send = provider.sendAsync

  function enable() {
    enabled = true
    return getAccounts(1)
  }

  function addresses() {
    return Array.from(addressToPath.keys())
  }

  function getPrimaryAddress() {
    return enabled ? addresses()[0] : undefined
  }

  async function getAllAccountsAndBalances(amountToGet: number = 10) {
    const accounts = await getAccounts(amountToGet, true)
    return Promise.all(
      accounts.map(
        address =>
          new Promise(async resolve => {
            const balance = await getBalance(address)
            resolve({ address, balance })
          })
      )
    )
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

  async function getAccounts(accountsToGet: number = 10, getMore?: boolean) {
    if (!enabled) {
      return [undefined]
    }

    const addressesAlreadyFetched = addressToPath.size
    const bundle = []

    if (addressesAlreadyFetched > 0 && !getMore) {
      return addresses()
    }

    for (
      let i = addressesAlreadyFetched > 1 ? addressesAlreadyFetched : 0;
      i < accountsToGet + addressesAlreadyFetched;
      i++
    ) {
      const path = `${basePath}/0'/0/${i}`
      bundle.push({ path, showOnTrezor: false })
    }

    let data

    try {
      data = await TrezorConnect.ethereumGetAddress({
        bundle
      })
    } catch (error) {
      enabled = false
      throw new Error(data.payload.error)
    }

    if (!data.success) {
      enabled = false
      throw new Error(data.payload.error)
    }

    if (Array.isArray(data.payload)) {
      data.payload.forEach(
        (addressData: { serializedPath: string; address: string }) => {
          const { address, serializedPath } = addressData
          addressToPath.set(address.toLowerCase(), serializedPath)
        }
      )
    } else {
      const { address, serializedPath } = data.payload
      addressToPath.set(address.toLowerCase(), serializedPath)
    }

    const allAddresses = addresses()

    return allAddresses
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

  return provider
}

function networkIdToDerivationPath(networkId: number) {
  switch (networkId) {
    default:
      return `m/44'/60'`
  }
}

export default trezor
