import BigNumber from 'bignumber.js'


export function weiToEth(wei: any, hardware: boolean): string {
   return hardware ? new BigNumber(wei._hex).div(1e18).toString() :
   wei.div(1e18).toString(10)
}