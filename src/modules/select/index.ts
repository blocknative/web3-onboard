import { WalletInit, WalletModule } from '../../interfaces'
import { isWalletInit } from '../../validation'

const defaultWalletNames = [
  'metamask',
  'dapper',
  'coinbase',
  'trust',
  'authereum',
  'torus',
  'opera',
  'operaTouch'
]

function select(
  wallets: Array<WalletInit | WalletModule> | undefined,
  networkId: number
) {
  if (wallets) {
    return Promise.all(
      wallets.map(wallet => {
        if (isWalletInit(wallet)) {
          const { walletName, ...initParams } = wallet
          const module = getModule(walletName)

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
    default:
      return
  }
}

export default select
