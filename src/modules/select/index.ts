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
  'tokenary',
  'tally',
  'metamask',
  'binance',
  'mathwallet',
  'frame',
  'torus',
  'opera',
  'liquality',
  'blankwallet'
]

const mobileDefaultWalletNames = [
  'tokenary',
  '1inch',
  'metamask',
  'coinbase',
  'trust',
  'torus',
  'opera',
  'operaTouch',
  'status',
  'hyperpay',
  'tokenpocket',
  'mathwallet',
  'dcent',
  'atoken',
  'liquality',
  'alphawallet',
  'ownbit',
  'bitpie',
  'authereum',
  'tp'
]

const providerNameToWalletName = (providerName: string) =>
  providerName === 'imToken'
    ? providerName
    : providerName === 'WalletConnect'
    ? 'walletConnect'
    : providerName.toLocaleLowerCase()

function select(
  wallets: Array<WalletInitOptions | WalletModule> | undefined,
  networkId: number,
  isMobile: boolean
) {
  // If we detect an injected wallet then place the detected wallet
  // at the beginning of the list e.g. the top of the wallet select modal
  let detectedProviderName: string | undefined
  let detectedWalletName: string | undefined
  if (window?.ethereum) {
    detectedProviderName = getProviderName(window.ethereum)
    if (detectedProviderName) {
      detectedWalletName = providerNameToWalletName(detectedProviderName)
    }
  }

  if (wallets) {
    const hideWallet = (wallet: WalletInitOptions) =>
      wallet?.display &&
      wallet?.display[isMobile ? 'mobile' : 'desktop'] === false

    // If the detected wallet is already listed as a wallet option then don't inject it
    const walletNotIncluded = wallets.every(
      wallet => isWalletInit(wallet) && wallet.walletName !== detectedWalletName
    )

    if (detectedWalletName && walletNotIncluded) {
      // This wallet is built into onboard so add the walletName and
      // the code below will load it as a wallet module
      wallets.unshift({ walletName: detectedWalletName })
    } else if (!detectedWalletName && detectedProviderName) {
      // A provider has been detected but there is not a walletName therefore
      // this wallet is not built into onboard so add it as a generic injected wallet
      wallets.unshift({ walletName: 'detectedwallet' })
    }

    const setOfWallets = new Set<string>()
    return Promise.all(
      wallets.map(wallet => {
        // If this is a wallet init object then load the built-in wallet module
        if (isWalletInit(wallet) && !hideWallet(wallet)) {
          const { walletName, ...initParams } = wallet
          // Check to see if we have seen this wallet before
          // prevents duplicated injected wallet from being added
          if (!setOfWallets.has(walletName)) {
            try {
              const module = getModule(walletName).then((m: any) =>
                m.default({ ...initParams, networkId, isMobile })
              )
              setOfWallets.add(walletName)
              return module
            } catch (error) {
              const { type, message } = error as {
                type: string
                message: string
              }

              if (type === 'DeprecatedWalletError') {
                console.warn(message)
              } else {
                throw error
              }
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
  // If we have detected a builtin wallet that is not already in the list of default wallets so add it
  if (detectedWalletName && !defaultWalletNames.includes(detectedWalletName)) {
    defaultWalletNames.unshift(detectedWalletName)
    // If we detected a provider but it is not builtin add the generic injected provider
  } else if (!detectedWalletName && detectedProviderName) {
    defaultWalletNames.unshift('detectedwallet')
  }
  return Promise.all(
    defaultWalletNames.map(walletName =>
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
        type: 'DeprecatedWalletError',
        message: `${name} wallet has been deprecated`
      }
    case 'meetone':
      return import('./wallets/meetone')
    case 'tally':
      return import('./wallets/tally')
    case 'tokenary':
      return import('./wallets/tokenary')
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
    // case 'mewwallet':
    //   return import('./wallets/mewwallet')
    case 'mathwallet':
      return import('./wallets/mathwallet')
    case '1inch':
      return import('./wallets/1inch')
    case 'blankwallet':
      return import('./wallets/blankwallet')
    case 'ronin':
      return import('./wallets/ronin')
    default:
      throw new Error(`${name} is not a valid walletName.`)
  }
}

export default select
