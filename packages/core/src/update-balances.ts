import { state } from './store/index.js'
import { getBalance } from './provider.js'
import { updateAllWallets } from './store/actions.js'
import { ethers } from 'ethers'
import { AccountAddress, Chain, weiToEth } from '@web3-onboard/common'
import type { SecondaryTokenBalances, WalletState } from './types'

async function updateBalances(addresses?: string[]): Promise<void> {
  const { wallets, chains } = state.get()
  const updatedWallets = await Promise.all(
    wallets.map(async wallet => {
      const chain = chains.find(({ id }) => id === wallet.chains[0].id)

      const updatedAccounts = await Promise.all(
        wallet.accounts.map(async account => {
          const secondaryTokens = await updateSecondaryTokens(
            wallet,
            account.address,
            chains
          )
          // if no provided addresses, we want to update all balances
          // otherwise check if address is in addresses array
          if (
            !addresses ||
            addresses.some(
              address => address.toLowerCase() === account.address.toLowerCase()
            )
          ) {
            const updatedBalance = await getBalance(account.address, chain)
            return { ...account, balance: updatedBalance, secondaryTokens }
          }
          return { ...account, secondaryTokens }
        })
      )
      return { ...wallet, accounts: updatedAccounts }
    })
  )
  updateAllWallets(updatedWallets)
}

export const updateSecondaryTokens = async (
  wallet: WalletState,
  account: AccountAddress,
  chains: Chain[]
): Promise<SecondaryTokenBalances[]> => {
  const chain = chains.find(({ id }) => id === wallet.chains[0].id)
  const chainRPC = chain.rpcUrl
  if (!chain.tokens || !chain.tokens.length || !chainRPC) return
  const ethersProvider = new ethers.providers.Web3Provider(
    wallet.provider,
    'any'
  )
  const signer = ethersProvider.getSigner()
  const tokenInterface = [
    'function balanceOf(address owner) view returns (uint256)'
  ]
  const updatedBalances = await Promise.all(
    chain.tokens.map(async token => {
      try {
        const swapContract = new ethers.Contract(
          token.address,
          tokenInterface,
          signer
        )
        const bigNumBalance = await swapContract.balanceOf(account)
        return {
          name: token.name,
          balance: weiToEth(bigNumBalance.toHexString()),
          icon: token.icon
        }
      } catch (error) {
        console.error(error)
      }
    })
  )
  return updatedBalances
}

export default updateBalances
