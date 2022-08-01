import BigNumber from 'bignumber.js'

export function weiToEth(wei: string): string {
   return new BigNumber(wei).div(1e18).toString(10)
}