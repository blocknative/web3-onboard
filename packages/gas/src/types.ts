export type GasInit = {
  apiKey: string
}

export type BlockPricesOptions = {
  chainId: string
  poll?: number
}

export type GasPrice = {
  confidence: number
  price: number | null
  maxFeePerGas: number | null
  maxPriorityFeePerGas: number | null
}

export type BlockPrices = {
  blockNumber: number
  estimatedTransactionCount: number
  baseFeePerGas: number
  estimatedPrices: GasPrice[]
}

export type EstimatedBaseFee = {
  confidence: number
  baseFee: number
}

export type EstimatedBaseFees = [
  { ['pending+1']: [EstimatedBaseFee] },
  { ['pending+2']: [EstimatedBaseFee] },
  { ['pending+3']: [EstimatedBaseFee] },
  { ['pending+4']: [EstimatedBaseFee] },
  { ['pending+5']: [EstimatedBaseFee] }
]

export type BlockPriceData = {
  system: string
  network: string
  unit: string
  maxPrice: number
  currentBlockNumber: number
  msSinceLastBlock: number
  blockPrices: BlockPrices[]
  estimatedBaseFees?: [EstimatedBaseFees]
}
