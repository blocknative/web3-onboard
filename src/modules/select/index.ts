import { WalletInit } from '../../interfaces'
import { validateWalletInit } from '../../validation'

function wallets(walletInit: WalletInit[]) {
  validateWalletInit(walletInit)

  return Promise.all(
    walletInit.map((init: WalletInit) => {
      const { name, ...initParams } = init

      return getModule(name).then((module: any) => module.default(initParams))
    })
  )
}

function getModule(name: string): Promise<any> {
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
    default:
      return Promise.reject('invalid wallet name')
  }
}

export default wallets
