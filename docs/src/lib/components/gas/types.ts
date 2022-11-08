export type GasPrice = {
  confidence: number
  price: number | null
  maxFeePerGas: number | null
  maxPriorityFeePerGas: number | null
}

export type RPCGasPrice = {
  price: string
  maxFeePerGas: string
  maxPriorityFeePerGas: string
}

export interface GasData {
  estimatedPrices: GasPrice[]
  baseFeePerGas: number| null
  blockNumber: number | null
  maxPrice: number | null
  estimatedTransactionCount: number | null
  seconds: number | null
  estimatedBaseFees?: [EstimatedBaseFee]
  isTrendingUp?: boolean
}

export interface EstimatedBaseFee {
  confidence: number
  baseFee: number
}