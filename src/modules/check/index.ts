import { isWalletCheckModule } from '../../validation'
import { WalletCheckModule, WalletCheckInit } from '../../interfaces'

const defaultChecks = ['connect', 'network']

async function check(
  walletChecks: Array<WalletCheckInit | WalletCheckModule> | undefined,
  networkId: number
): Promise<WalletCheckModule[]> {
  if (walletChecks) {
    const checks = walletChecks.map(
      (checkOrModule: WalletCheckInit | WalletCheckModule) => {
        if (!isWalletCheckModule(checkOrModule)) {
          const { checkName, ...otherParams } = checkOrModule
          const module = getModule(checkName)
          return (
            module &&
            module.then((m: any) => m.default({ ...otherParams, networkId }))
          )
        }

        return Promise.resolve(checkOrModule)
      }
    )

    return Promise.all(checks)
  }

  return Promise.all(
    defaultChecks.map((checkName: string) => {
      const module = getModule(checkName)
      return module && module.then((m: any) => m.default({ networkId }))
    })
  )
}

function getModule(name: string): Promise<any> | never {
  switch (name) {
    case 'connect':
      return import('./connect')
    case 'network':
      return import('./network')
    case 'balance':
      return import('./balance')
    case 'accounts':
      return import('./accounts')
    case 'derivationPath':
      return import('./derivation-path')
    default:
      throw new Error(`invalid module name: ${name}`)
  }
}

export default check
