import type BigNumber from 'bignumber.js'

export function weiToEth(wei: BigNumber): string {
    return wei.div(1e18).toString()
}