import { state } from './store'
import type { AppState, WalletState } from './types'
import { getBalance } from './provider'

async function updateBalances(addresses?: string[]): Promise<any>  {
    const { wallets, chains } = state.get()

    const updatedWallets = await Promise.all(
        wallets.map(async wallet => {
          const chain = chains.find(({ id }) => id === wallet.chains[0].id)

          const updatedAccounts = await Promise.all(
            wallet.accounts.map(async account => {
              // if no addresses then we want to update all address balances
              // otherwise check if address is in addresses array
              if (!addresses || addresses.includes(account.address)) {

                const updatedBalance = await getBalance(account.address, chain)

                console.log(1, updatedBalance)

                return { ...account, balance: updatedBalance }
              }

              return account
            })
          )
          console.log(2, updatedAccounts)
          return { ...wallet, accounts: updatedAccounts }
        })
      )
        
      console.log(3, updatedWallets)
      return {
        ...state,
        wallets: updatedWallets
      }
  
}

export default updateBalances