import { state } from './store/index.js'
import { getBalance } from './provider.js'
import { updateAllWallets, updateWallet } from './store/actions.js'
import { ethers } from 'ethers'

async function updateBalances(addresses?: string[]): Promise<void> {
  const { wallets, chains } = state.get()
  const updatedWallets = await Promise.all(
    wallets.map(async wallet => {
      const chain = chains.find(({ id }) => id === wallet.chains[0].id)

      const updatedAccounts = await Promise.all(
        wallet.accounts.map(async account => {
          // if no provided addresses, we want to update all balances
          // otherwise check if address is in addresses array
          if (
            !addresses ||
            addresses.some(
              address => address.toLowerCase() === account.address.toLowerCase()
            )
          ) {
            const updatedBalance = await getBalance(account.address, chain)
            return { ...account, balance: updatedBalance }
          }
          return account
        })
      )
      return { ...wallet, accounts: updatedAccounts }
    })
  )
  // updateAllTokens()
  updateAllWallets(updatedWallets)
}

const updateAllTokens = async () => {
  const { wallets, chains } = state.get()

  const updatedWallets = await Promise.all(
    wallets.map(async wallet => {
      const chain = chains.find(({ id }) => id === wallet.chains[0].id)
      const chainRPC = chain.rpcUrl
      console.log('update all tokens')
      if (!chain.tokens || !chain.tokens.length || !chainRPC) return
      // const updatedAccounts = await Promise.all(
      chain.tokens.map(async token => {
        console.log(token)
        const tokenInterface = [
          'function balanceOf(address owner) view returns (uint256)'
        ]
        const swapContract = new ethers.Contract(token.address, tokenInterface)
        const p = await swapContract
          .balanceOf(wallets[0].accounts[0].address)

          // console.log(await p)
      })
      // )
      // console.log(updatedAccounts)
      // return { ...wallet, accounts: updatedAccounts }
    })
  )
}

export default updateBalances
