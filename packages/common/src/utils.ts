import BigNumber from 'bignumber.js'

export function weiToEth(wei: any): string {
    return new BigNumber(wei._hex).div(1e18).toString()
}
  