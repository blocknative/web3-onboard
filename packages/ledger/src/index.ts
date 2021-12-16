import { createEIP1193Provider } from '@bn-onboard/common'
import {
  ScanAccountsOptions,
  SelectAccountOptions,
  Account
} from '@bn-onboard/common/src/types'
import { WalletInit } from '@bn-onboard/types'

import HDKey from 'hdkey'
import { Buffer } from 'buffer'

const accountSelect = (options: SelectAccountOptions) => {}

// export type SelectAccountOptions = {
//   basePaths: BasePath[] // the paths to display in the base path selector
//   assets: Asset[] // the selectable assets to scan for a balance
//   chains: Chain[] // the selectable chains/networks to scan for balance
//   scanAccounts: ScanAccounts
//   walletIcon: string
// }

const LEDGER_LIVE_PATH = `m/44'/60'`
const LEDGER_DEFAULT_PATH = `m/44'/60'/0`

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
  address: string
  chainCode: string
}

// const getAddress = ({ publicKey, chainCode }: LedgerAccount) => {
//   const hdkey = {
//     ...new HDKey(),
//     publicKey: Buffer.from(publicKey),
//     chainCode: Buffer.from(chainCode, 'hex')
//   }

//   // let derivedKey
//   // const pubKey = account.publicKey
//   // const chainCode = account.chainCode
//   // const hdkey = new HDKey()
//   // hdkey.publicKey = Buffer.from(pubKey, 'hex')
//   // hdkey.chainCode = Buffer.from(chainCode, 'hex')
//   const derivedKey = hdkey.derive('m/' + index)
//   let pubKey = ethUtils.bufferToHex(derivedKey.publicKey)
//   const buff = ethUtils.publicToAddress(pubKey, true)
//   return ethUtils.bufferToHex(buff)
// }

const getAddresses = () => {}

function ledger(): WalletInit {
  return () => {
    return {
      label: 'Ledger',
      getIcon: async () => (await import('./icon')).default,
      getInterface: async ({ chains }) => {
        const transport = await getTransport()
        const Eth = (await import('@ledgerhq/hw-app-eth')).default
        const eth = new Eth(transport)

        

        eth.getAddress(DEFAULT_BASE_PATHS[0].value)

        eth.

        const scanAccounts = ({
          derivationPath,
          chainId,
          asset
        }: ScanAccountsOptions): Promise<Account[]> => {}

        const account = accountSelect({
          basePaths: DEFAULT_BASE_PATHS,
          assets,
          chains,
          scanAccounts,
          walletIcon: ''
        })

        const ledgerProvider = {}

        const provider = createEIP1193Provider(ledgerProvider, {
          eth_requestAccounts: async baseRequest => {
            return []
          }
        })

        return {
          provider
        }
      }
    }
  }
}

export default ledger
