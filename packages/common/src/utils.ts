import Bignumber from 'bignumber.js'
import type { Address } from 'types'

const addressRegex = /^0x[a-fA-F0-9]{40}$/

export function isAddress(address: string): address is Address {
  return addressRegex.test(address)
}

export function weiToEth(wei: string): string {
  return new Bignumber(wei).div(1e18).toString(10)
}
