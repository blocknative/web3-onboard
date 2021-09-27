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
  'binance',
  'frame',
  'torus',
  'opera',
  'liquality',
  'blankwallet'
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
  'authereum',
  'tp'
]

const injectedWalletDetected = () =>
  window.ethereum && getProviderName(window.ethereum) === undefined

function select(
  wallets: Array<WalletInitOptions | WalletModule> | undefined,
  networkId: number,
  isMobile: boolean
) {
  if (wallets) {
    const hideWallet = (wallet: WalletInitOptions) =>
      wallet?.display &&
      wallet?.display[isMobile ? 'mobile' : 'desktop'] === false

    // For backwards compatibility if a user is still using 'detectedwallet' in the onboard wallet select array
    // it will be filtered out so there are no duplicates
    wallets = wallets.filter(
      wallet =>
        'walletName' in wallet
          ? wallet.walletName !== 'detectedwallet' && !hideWallet(wallet)
          : true // It is not a WalletInitOption but rather a WalletModule so let it through
    )

    // If we detect an injected wallet then place the detected wallet
    // at the beginning of the list e.g. the top of the wallet select modal
    if (injectedWalletDetected()) {
      wallets.unshift({ walletName: 'detectedwallet' })
    }

    return Promise.all(
      wallets.map(wallet => {
        // If this is a wallet init object then load the built-in wallet module
        if (isWalletInit(wallet)) {
          const { walletName, ...initParams } = wallet
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

        // This is a custom wallet module so just return it
        return Promise.resolve(wallet)
      })
    )
  }

  const defaultWalletNames = isMobile
    ? mobileDefaultWalletNames
    : desktopDefaultWalletNames

  return Promise.all(
    defaultWalletNames
      // Include the detected wallet only if an injected wallet is detected
      .filter(
        walletName =>
          walletName !== 'detectedwallet' || injectedWalletDetected()
      )
      .map(walletName =>
        getModule(walletName).then((m: any) => m.default({ networkId }))
      )
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
    case 'keystone':
      return import('./wallets/keystone')
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
    case 'binance':
      return import('./wallets/binance-chain-wallet')
    case 'detectedwallet':
      return import('./wallets/detectedwallet')
    case 'tp':
      return import('./wallets/tp')
    case 'mewwallet':
      return import('./wallets/mewwallet')
    case 'blankwallet':
      return import('./wallets/blankwallet')
    default:
      throw new Error(`${name} is not a valid walletName.`)
  }
}

export default select
