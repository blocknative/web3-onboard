import { WalletModule, WalletInitOptions } from '../../interfaces'
import { isWalletInit } from '../../validation'

// wallets that qualify for default wallets need to have no
// init parameters that are required for full functionality
const defaultWalletNames = [
  'web3Wallet',
  'metamask',
  'dapper',
  'coinbase',
  'trust',
  'authereum',
  'torus',
  'opera',
  'operaTouch',
  'status',
  'hyperpay',
  'unilogin'
]

function select(
  wallets: Array<WalletInitOptions | WalletModule> | undefined,
  networkId: number
) {
  if (wallets) {
    return Promise.all(
      wallets.map(wallet => {
        if (isWalletInit(wallet)) {
          const { walletName, ...initParams } = wallet
          const module = getModule(walletName)

          if (!module) {
            throw new Error(`${walletName} is not a valid walletName.`)
          }

          return (
            module &&
            module.then((m: any) => m.default({ ...initParams, networkId }))
          )
        }

        return Promise.resolve(wallet)
      })
    )
  }

  return Promise.all(
    defaultWalletNames.map(walletName => {
      const module = getModule(walletName)
      if (module) {
        return module.then((m: any) => m.default({ networkId }))
      }
    })
  )
}

function getModule(name: string): Promise<any> | undefined {
  switch (name) {
    case 'meetone':
      return import('./wallets/meetone')
    case 'metamask':
      return import('./wallets/metamask')
    case 'dapper':
      return import('./wallets/dapper')
    case 'portis':
      return import('./wallets/portis')
    case 'fortmatic':
      return import('./wallets/fortmatic')
    case 'squarelink':
      return import('./wallets/squarelink')
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
    case 'ledger':
      return import('./wallets/ledger')
    case 'walletLink':
      return import('./wallets/wallet-link')
    case 'imToken':
      return import('./wallets/imtoken')
    case 'unilogin':
      return import('./wallets/unilogin')
    case 'mykey':
      return import('./wallets/mykey')
    case 'web3Wallet':
      return import('./wallets/web3Wallet')
    case 'huobiwallet':
      return import('./wallets/huobiwallet')
    case 'wallet.io':
        return import('./wallets/wallet-io')
    case 'hyperpay':
      return import('./wallets/hyperpay')
    default:
      return
  }
}

export default select
