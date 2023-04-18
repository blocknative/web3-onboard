import type { Address } from 'types'

const addressRegex = /^0x[a-fA-F0-9]{40}$/

export const isAddress = (address: string): address is Address => {
  return addressRegex.test(address)
}

export const weiHexToEth = (wei: string): string => {
  const weiBigInt = BigInt(parseInt(wei, 16))
  const ethBalance = divideBigIntWithDecimalResolution(
    weiBigInt,
    BigInt('1000000000000000000')
  )

  return ethBalance.toString()
}
export const weiToEth = (wei: string): string => {
  const weiBigInt = BigInt(parseInt(wei))
  const ethBalance = divideBigIntWithDecimalResolution(
    weiBigInt,
    BigInt('1000000000000000000')
  )

  return ethBalance.toString()
}

const divideBigIntWithDecimalResolution = (
  dividend: bigint,
  divisor: bigint,
  decimalPlaces = 8
): number => {
  if (typeof dividend !== 'bigint' || typeof divisor !== 'bigint') {
    throw new Error('dividend and divisor must be BigInt values')
  }

  if (typeof decimalPlaces !== 'number' || decimalPlaces < 0) {
    throw new Error('decimalPlaces must be a non-negative number')
  }

  // Multiply the dividend by 10 ** decimalPlaces to add precision
  const adjustedDividend = dividend * BigInt(10 ** decimalPlaces)

  const quotient = adjustedDividend / divisor

  // Convert the result back to a decimal number
  const decimalPart = String(quotient % BigInt(10 ** decimalPlaces)).padStart(
    decimalPlaces,
    '0'
  )
  const integerPart = quotient / BigInt(10 ** decimalPlaces)
  const result = `${integerPart}.${decimalPart}`

  return parseFloat(result)
}

export const ethToWeiBigInt = (eth: string | number): bigint => {
  if (typeof eth !== 'string' && typeof eth !== 'number') {
    throw new Error('eth must be a string or number value')
  }

  const ethString = typeof eth === 'number' ? eth.toString() : eth

  const decimalSplit = ethString.split('.')
  const integerPart = BigInt(decimalSplit[0])
  const decimalPart =
    decimalSplit.length > 1 ? BigInt(decimalSplit[1]) : BigInt(0)

  const decimalLength = decimalSplit.length > 1 ? decimalSplit[1].length : 0
  const weiFactor = BigInt(10 ** (18 - decimalLength))

  // Perform the conversion from Eth to Wei
  const weiValue = integerPart * BigInt(10 ** 18) + decimalPart * weiFactor

  return weiValue
}

export const bigIntToHex = (value: bigint): string => {
  return `0x${value.toString(16)}`
}
