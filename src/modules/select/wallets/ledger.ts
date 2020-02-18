import {
  LedgerOptions,
  WalletModule,
  Helpers,
  CommonWalletOptions
} from '../../../interfaces'
import ledgerIcon from '../wallet-icons/icon-ledger'

import createProvider from './providerEngine'

import TransportU2F from '@ledgerhq/hw-transport-u2f'
import Eth from '@ledgerhq/hw-app-eth'
import * as EthereumTx from 'ethereumjs-tx'

import buffer from 'buffer'

function ledger(options: LedgerOptions & CommonWalletOptions): WalletModule {
  const { rpcUrl, networkId, preferred, label, iconSrc, svg } = options

  return {
    name: label || 'Ledger',
    svg: svg || ledgerIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      const { BigNumber, networkName } = helpers

      const provider = await ledgerProvider({
        rpcUrl,
        networkId,
        BigNumber,
        networkName
      })

      return {
        provider,
        interface: {
          name: 'Ledger',
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

async function ledgerProvider(options: {
  networkId: number
  rpcUrl: string
  BigNumber: any
  networkName: (id: number) => string
}) {
  const { networkId, rpcUrl, BigNumber, networkName } = options
  const basePath = networkIdToDerivationPath(networkId)

  let addressToPath = new Map()
  let enabled: boolean = false

  const provider = createProvider({
    getAccounts: (callback: any) => {
      getAccounts()
        .then((res: Array<any>) => callback(null, res))
        .catch((err: string) => callback(err, null))
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
    const buff = buffer.Buffer.from('4')
    console.log({ buff })
    enabled = true
    return getAccounts(1)
  }

  function addresses() {
    return Array.from(addressToPath.keys())
  }

  function getPrimaryAddress() {
    return enabled ? addresses()[0] : undefined
  }

  async function getAllAccountsAndBalances(amountToGet: number = 5) {
    const accounts = await getAccounts(amountToGet, true)
    return Promise.all(
      accounts.map(
        (address: string) =>
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

  function getAccounts(
    numberToGet: number = 1,
    getMore?: boolean
  ): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      if (!enabled) {
        resolve([null])
      }

      const addressesAlreadyFetched = addressToPath.size

      if (addressesAlreadyFetched > 0 && !getMore) {
        return resolve(addresses())
      }

      const paths = []

      if (numberToGet > 1) {
        for (
          let i = addressesAlreadyFetched;
          i < numberToGet + addressesAlreadyFetched;
          i++
        ) {
          const ledgerLive = `${basePath}/${i}'/0/0`
          const legacy = `${basePath}/0'/${i}'`

          paths.push(ledgerLive, legacy)
        }
      } else {
        paths.push(`${basePath}/0'/0`, `${basePath}/0'/0/0`)
      }

      let transport
      let eth

      try {
        transport = await TransportU2F.create()
        eth = new Eth(transport)
      } catch (error) {
        reject({ message: 'Error connecting to Ledger wallet' })
      }

      for (const path of paths) {
        try {
          const { address } = await eth.getAddress(path)
          addressToPath.set(address.toLowerCase(), path)
        } catch (err) {
          return reject({
            message: 'There was a problem trying to connect to your Ledger.'
          })
        }
      }

      const allAddresses = addresses()

      transport.close()

      resolve(allAddresses)
    })
  }

  function getBalance(address: string) {
    return new Promise((resolve, reject) => {
      provider.sendAsync(
        {
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
    const path = [...addressToPath.values()][0]
    let transport
    let eth

    try {
      transport = await TransportU2F.create()
      eth = new Eth(transport)
    } catch (error) {
      throw new Error('Error connecting to Ledger wallet')
    }

    try {
      const transaction = new EthereumTx.Transaction(transactionData, {
        chain: networkName(networkId)
      })

      transaction.raw[6] = Buffer.from([networkId]) // v
      transaction.raw[7] = Buffer.from([]) // r
      transaction.raw[8] = Buffer.from([]) // s

      const ledgerResult = await eth.signTransaction(
        path,
        transaction.serialize().toString('hex')
      )

      transaction.v = buffer.Buffer.from(ledgerResult.v, 'hex')
      transaction.r = buffer.Buffer.from(ledgerResult.r, 'hex')
      transaction.s = buffer.Buffer.from(ledgerResult.s, 'hex')

      return `0x${transaction.serialize().toString('hex')}`
    } catch (error) {
      throw new Error('Error signing transaction')
    } finally {
      transport.close()
    }
  }

  return provider
}

function networkIdToDerivationPath(networkId: number) {
  switch (networkId) {
    default:
      return `m/44'/60'`
  }
}

export default ledger
