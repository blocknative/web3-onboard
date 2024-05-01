import { state } from './store/index.js'
import { getBalance } from './provider.js'
import { updateAllWallets } from './store/actions.js'
import { AccountAddress, Address, Chain, weiToEth } from '@web3-onboard/common'
import type { SecondaryTokenBalances } from './types'
import type { ReadContractParameters } from 'viem'
import { chainIdToViemImport } from './utils'

async function updateBalances(addresses?: string[]): Promise<void> {
  const { wallets, chains } = state.get()
  const updatedWallets = await Promise.all(
    wallets.map(async wallet => {
      const chain = chains.find(({ id }) => id === wallet.chains[0].id)

      const updatedAccounts = await Promise.all(
        wallet.accounts.map(async account => {
          const secondaryTokens = await updateSecondaryTokens(
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
  accountAddress: AccountAddress,
  chain: Chain
): Promise<SecondaryTokenBalances[]> => {
  if (!chain) return
  const chainRPC = chain.rpcUrl
  if (!chain.secondaryTokens || !chain.secondaryTokens.length || !chainRPC)
    return

  const tokenBalances = await Promise.all(
    chain.secondaryTokens.map(async token => {
      try {
        const { createPublicClient, http } = await import('viem')
        const viemChain = await chainIdToViemImport(chain)
        const client = createPublicClient({
          chain: viemChain,
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
              type: 'function'
            }
          ],
          address: token.address as Address
        }

        const supplyProm =
          client.readContract({
            ...viemTokenInterface,
            functionName: 'balanceOf',
            args: [accountAddress] as unknown[]
          } as ReadContractParameters) || ''

        const tokenProm =
          client.readContract({
            ...viemTokenInterface,
            functionName: 'symbol',
            args: []
          }) || ''

        const [tokenSupply, tokenName] = await Promise.all([
          supplyProm,
          tokenProm
        ])

        return {
          name: tokenName as string,
          balance: weiToEth(tokenSupply.toString()),
          icon: token.icon
        }
      } catch (error) {
        console.error(
          `There was an error fetching balance and/or symbol 
          for token contract: ${token.address} - ${error}`
        )
      }
    })
  )
  return tokenBalances
}

export default updateBalances
