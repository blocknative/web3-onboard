import {
  WalletModule,
  WalletInitOptions,
  AllWalletInitOptions
} from '../../interfaces'
import { isWalletInit } from '../../validation'
import { getProviderName } from '../../utilities'

// wallets that qualify for default wallets need to have no
// init parameters that are required for full functionality
const desktopDefaultWalletNames = [
  'detectedwallet',
  'metamask',
  'frame',
  'torus',
  'opera',
  'liquality'
]

const mobileDefaultWalletNames = [
  'detectedwallet',
  'metamask',
  'coinbase',
  'trust',
  'torus',
  'opera',
  'operaTouch',
  'status',
  'hyperpay',
  'tokenpocket',
  'dcent',
  'atoken',
  'liquality',
  'alphawallet',
  'ownbit',
  'bitpie',
  'authereum'
]

const injectedWalletDetected = () =>
  window.ethereum && getProviderName(window.ethereum) === undefined

function select(
  wallets: Array<WalletInitOptions | WalletModule> | undefined,
  networkId: number,
  isMobile: boolean
) {
  const defaultWalletNames = isMobile
    ? mobileDefaultWalletNames
    : desktopDefaultWalletNames

  if (wallets) {
    return Promise.all(
      wallets.map(wallet => {
        if (isWalletInit(wallet)) {
          const { walletName, ...initParams } = wallet
          // If the dApp has opted into the injected wallet but there is no injected wallet then skip this wallet
          if (walletName === 'detectedwallet' && !injectedWalletDetected()) {
            return null // don't return a wallet module
          }
          try {
            return getModule(walletName).then((m: any) =>
              m.default({ ...initParams, networkId, isMobile })
            )
          } catch (error) {
            if (error.name === 'DeprecatedWalletError') {
              console.warn(error.message)
            } else {
              throw error
            }
          }
        }

        return Promise.resolve(wallet)
      })
      // Filter out the skipped injected wallet if it is undefined
    ).then(wallets => {
      return wallets.filter(wallet => !!wallet)
    })
  }

  return Promise.all(
    defaultWalletNames
      .map(walletName =>
        walletName === 'detectedwallet' && !injectedWalletDetected()
          ? null
          : getModule(walletName).then((m: any) => m.default({ networkId }))
      )
      .filter(wallet => !!wallet)
  )
}

function getModule(name: string): Promise<{
  default: (options: AllWalletInitOptions) => WalletModule
}> {
  switch (name) {
    // Deprecated wallets
    case 'dapper':
    case 'squarelink':
    case 'unilogin':
      throw {
        name: 'DeprecatedWalletError',
        message: `${name} wallet has been deprecated`
      }
    case 'meetone':
      return import('./wallets/meetone')
    case 'metamask':
      return import('./wallets/metamask')
    case 'portis':
      return import('./wallets/portis')
    case 'fortmatic':
      return import('./wallets/fortmatic')
    case 'authereum':
      return import('./wallets/authereum')
    case 'trust':
      return import('./wallets/trust')
    case 'coinbase':
      return import('./wallets/coinbase')
    case 'walletConnect':
      return import('./wallets/wallet-connect')
    case 'opera':
      return import('./wallets/opera')
    case 'operaTouch':
      return import('./wallets/opera-touch')
    case 'torus':
      return import('./wallets/torus')
    case 'status':
      return import('./wallets/status')
    case 'trezor':
      return import('./wallets/trezor')
    case 'lattice':
      return import('./wallets/lattice')
    case 'cobovault':
      return import('./wallets/cobovault')
    case 'ledger':
      return import('./wallets/ledger')
    case 'walletLink':
      return import('./wallets/wallet-link')
    case 'imToken':
      return import('./wallets/imtoken')
    case 'mykey':
      return import('./wallets/mykey')
    case 'huobiwallet':
      return import('./wallets/huobiwallet')
    case 'wallet.io':
      return import('./wallets/wallet-io')
    case 'hyperpay':
      return import('./wallets/hyperpay')
    case 'tokenpocket':
      return import('./wallets/tokenpocket')
    case 'dcent':
      return import('./wallets/dcent')
    case 'atoken':
      return import('./wallets/atoken')
    case 'liquality':
      return import('./wallets/liquality')
    case 'frame':
      return import('./wallets/frame')
    case 'xdefi':
      return import('./wallets/xdefi')
    case 'alphawallet':
      return import('./wallets/alphawallet')
    case 'ownbit':
      return import('./wallets/ownbit')
    case 'keepkey':
      return import('./wallets/keepkey/')
    case 'bitpie':
      return import('./wallets/bitpie')
    case 'gnosis':
      return import('./wallets/gnosis')
    case 'detectedwallet':
      return import('./wallets/detectedwallet')
    default:
      throw new Error(`${name} is not a valid walletName.`)
  }
}

export default select
