import { state } from './store/index.js'
import { getBalance } from './provider.js'
import { updateAllWallets } from './store/actions.js'
// import { ethers } from 'ethers'
import { AccountAddress, Address, Chain, weiToEth } from '@web3-onboard/common'
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
            chain
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
  chain: Chain
): Promise<SecondaryTokenBalances[]> => {
  const chainRPC = chain.rpcUrl
  if (!chain.secondaryTokens || !chain.secondaryTokens.length || !chainRPC)
    return

  const updatedBalances = await Promise.all(
    chain.secondaryTokens.map(async token => {
      try {
        const { createPublicClient, http } = await import('viem')
        const { mainnet } = await import('viem/chains')
        const client = createPublicClient({
          chain: mainnet,
          transport: http(
            chain.providerConnectionInfo && chain.providerConnectionInfo.url
              ? chain.providerConnectionInfo.url
              : (chain.rpcUrl as string)
          )
        })
        const viemTokenInterface = {
          abi: [
            {
              inputs: [{ name: 'owner', type: 'address' }],
              name: 'balanceOf',
              outputs: [{ name: '', type: 'uint256' }],
              stateMutability: 'view',
              type: 'function'
            },
            {
              inputs: [],
              name: 'symbol',
              outputs: [{ name: '', type: 'string' }],
              stateMutability: 'view',
              type: 'function',
            }
          ],
          address: token.address as Address
        }

        const supply = await client.readContract({
          ...viemTokenInterface,
          functionName: 'balanceOf',
          args: [account]
        })
        const tokenName = await client.readContract({
          ...viemTokenInterface,
          functionName: 'symbol'
        }) || ''

        return {
          name: tokenName as string,
          balance: weiToEth(supply.toString()),
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
