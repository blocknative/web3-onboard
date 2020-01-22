import { isWalletCheckModule } from '../../validation'
import {
  WalletCheckModule,
  WalletCheckInit,
  WalletModule
} from '../../interfaces'

const defaultChecks = ['connect', 'network']

async function check(
  walletChecks: Array<WalletCheckInit | WalletCheckModule> | undefined,
  networkId: number,
  wallets: Promise<Array<WalletModule>>
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

    const requiresAccountSelect = await wallets.then(ws =>
      ws.map(wallet => wallet.type).includes('hardware')
    )

    if (requiresAccountSelect) {
      const accountSelectModule = await import(
        './account-select'
      ).then((m: any) => m.default())
      checks.splice(1, 0, accountSelectModule)
    }

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
    default:
      throw new Error(`invalid module name: ${name}`)
  }
}

export default check
