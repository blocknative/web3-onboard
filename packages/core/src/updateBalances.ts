import { state } from './store'
import { getBalance } from './provider'
import { updateAllWallets } from './store/actions'

async function updateBalances(addresses?: string[]): Promise<void>  {
    const { wallets, chains } = state.get()

    const updatedWallets = await Promise.all(
        wallets.map(async wallet => {
          const chain = chains.find(({ id }) => id === wallet.chains[0].id)

          const updatedAccounts = await Promise.all(
            wallet.accounts.map(async account => {
              // if no provided addresses, we want to update all balances
              // otherwise check if address is in addresses array
              if (!addresses || addresses.includes(account.address)) {

                const updatedBalance = await getBalance(account.address, chain)

                return { ...account, balance: updatedBalance }
              }

              return account
            })
          )
          return { ...wallet, accounts: updatedAccounts }
        })
      )
        
      updateAllWallets(updatedWallets)
}

export default updateBalances