export type GasPrice = {
  confidence: number
  price: number
  maxFeePerGas: number
  maxPriorityFeePerGas: number
}

export type RPCGasPrice = {
  price: string
  maxFeePerGas: string
  maxPriorityFeePerGas: string
}