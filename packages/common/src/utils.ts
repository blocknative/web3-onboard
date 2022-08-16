import { BigNumber } from 'ethers'

export function weiToEth(wei: string): string {
  return BigNumber.from(wei).div(1e18).toString()
}
