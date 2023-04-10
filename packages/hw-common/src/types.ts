import type { Chain, AccountAddress } from '@web3-onboard/common'
import type { BigNumber } from 'ethers'

export interface CustomNetwork {
  networkId: number
  genesis: GenesisBlock
  hardforks: Hardfork[]
  bootstrapNodes: BootstrapNode[]
}

export interface GenesisBlock {
  hash: string
  timestamp: string | null
  gasLimit: number
  difficulty: number
  nonce: string
  extraData: string
  stateRoot: string
}

export interface Hardfork {
  name: string
  block: number | null
}

export interface BootstrapNode {
  ip: string
  port: number | string
  network?: string
  chainId?: number
  id: string
  location: string
  comment: string
}

export type AccountSelectAPI = (
  options: SelectAccountOptions
) => Promise<Account>

export type SelectAccountOptions = {
  basePaths: BasePath[] // the paths to display in the base path selector
  assets: Asset[] // the selectable assets to scan for a balance
  chains: Chain[] // the selectable chains/networks to scan for balance
  scanAccounts: ScanAccounts
  supportsCustomPath?: boolean
  containerElement?: string
}

export type BasePath = {
  label: string // eg - Ethereum Ledger Live
  value: DerivationPath
}

export type DerivationPath = string // eg - m/44'/60'

export type Asset = {
  label: string // eg - ETH
  address?: string // if is a token, address to query contract
}

export type ScanAccounts = (options: ScanAccountsOptions) => Promise<Account[]>

export type ScanAccountsOptions = {
  derivationPath: DerivationPath
  chainId: Chain['id']
  asset: Asset
}

export type Account = {
  address: AccountAddress
  derivationPath: DerivationPath
  balance: {
    asset: Asset['label']
    value: BigNumber
  }
}

export type AccountsList = {
  all: Account[]
  filtered: Account[]
}
