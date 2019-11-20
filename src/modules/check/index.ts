import { validateWalletCheckInit } from '../../validation'
import { WalletCheckModule, WalletCheckInit } from '../../interfaces'

function walletChecks(
  walletCheckInit: WalletCheckInit[]
): never | Promise<WalletCheckModule[]> {
  validateWalletCheckInit(walletCheckInit)

  return Promise.all(
    walletCheckInit.map(init => {
      const { name, ...initParams } = init

      return getModule(name).then((module: any) => module.default(initParams))
    })
  )
}

function getModule(name: string): Promise<any> {
  switch (name) {
    case 'connect':
      return import('./connect')
    case 'network':
      return import('./network')
    case 'balance':
      return import('./balance')
    default:
      return Promise.reject('invalid wallet check name')
  }
}

export default walletChecks
