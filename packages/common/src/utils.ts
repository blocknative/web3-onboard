import type { Address } from 'types'

const addressRegex = /^0x[a-fA-F0-9]{40}$/

export const isAddress = (address: string): address is Address => {
  return addressRegex.test(address)
}

export const weiHexToEth = (wei: string): string => {
  const weiBigInt = BigInt(parseInt(wei, 16))
  const ethBalance = divideBigIntWithDecimalResolution(
    weiBigInt,
    BigInt('1000000000000000000'),
    6
  )

  return ethBalance.toString()
}
export const weiToEth = (wei: string): string => {
  const weiBigInt = BigInt(parseInt(wei))
  const ethBalance = divideBigIntWithDecimalResolution(
    weiBigInt,
    BigInt('1000000000000000000'),
    6
  )

  return ethBalance.toString()
}

import type { Chain as ViemChain } from 'viem'
export const viemChainIdToImport = async (
  chainIdnumber: number
): Promise<ViemChain | null> => {
  switch (chainIdnumber) {
    case 5: {
      const { goerli } = await import('viem/chains')
      return goerli
    }
    case 1: {
      const { mainnet } = await import('viem/chains')
      return mainnet
    }
    default:
      return null
  }
}

function divideBigIntWithDecimalResolution(
  dividend: bigint,
  divisor: bigint,
  decimalPlaces = 6
): number {
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

// const handleBitIntChecks = value => {
//   let tempValue
//   // check if number is larger than safe
//   if (typeof value === 'number' && value > Number.MAX_SAFE_INTEGER) {
//     return BigInt(value)
//   } else {
//     console.log('The number is within the safe integer range.')
//   }

//   if (BigInt(value) > BigInt(Number.MAX_SAFE_INTEGER)) {
//     console.log(
//       'The string value is greater than the maximum safe integer value.'
//     )
//   } else {
//     console.log('The string value is within the safe integer range.')
//   }
// }

// function isNumericString(str) {
//   // Check if the string only contains digits and an optional decimal point
//   return /^-?\d+(\.\d+)?$/.test(str)
// }

// function checkStringValue(value) {
//   // Validate the string
//   if (!isNumericString(value)) {
//     console.error('The string is not a valid numeric value.')
//     return
//   }

//   // Parse the string value to a number or BigInt
//   const parsedValue = value.includes('.') ? parseFloat(value) : BigInt(value)

//   // Check if the parsed value is greater than the maximum safe integer value
//   if (
//     typeof parsedValue === 'bigint' ||
//     parsedValue > Number.MAX_SAFE_INTEGER
//   ) {
//     console.log(
//       'The string value is greater than the maximum safe integer value.'
//     )
//   } else {
//     console.log('The string value is within the safe integer range.')
//   }
// }

export const bigIntToHex = (value: bigint): string => {
  return `0x${value.toString(16)}`
}

export const bigIntToString = (
  value: bigint | number | string,
  decimals = 0,
  hexString = false
): string => {
  let tempDec = decimals
  if (!decimals && typeof value !== 'bigint') {
    tempDec = countDecimalPlaces(value)
  }
  const scaleFactor = BigInt(10 ** tempDec)
  const bigIntValue = BigInt(value) * scaleFactor
  return hexString ? `0x${bigIntValue.toString(16)}` : bigIntValue.toString()
}

const countDecimalPlaces = (value: number | string): number => {
  let decimalPlaces = 0

  if (typeof value === 'number') {
    const match = value.toString().match(/(?:\.(\d+))?$/)
    if (match) {
      decimalPlaces = match[1] ? match[1].length : 0
    }
  } else if (typeof value === 'string') {
    const match = value.match(/(?:\.(\d+))?$/)
    if (match) {
      decimalPlaces = match[1] ? match[1].length : 0
    }
  }

  return decimalPlaces
}
