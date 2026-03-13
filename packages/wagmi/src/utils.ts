import { Chain, chainIdToViemImport } from '@web3-onboard/common'
import { fromHex, http } from 'viem'
import type { Chain as ViemChain, Transport } from 'viem'

export const createWalletId = (walletLabel: string): string =>
  walletLabel.replace(/\s/g, '') + 'Id'

export async function createWagmiChains(
  chains: Chain[],
  transports: Record<ViemChain['id'], Transport>
) {
  return (await Promise.all(
    chains.map(async (w3OChain: Chain) => {
      const { id } = w3OChain
      transports[fromHex(id as `0x${string}`, 'number')] = http()
      return (await chainIdToViemImport(w3OChain)) as ViemChain
    })
  )) as [ViemChain, ...ViemChain[]]
}
