import type {
  Balance,
  ChainId,
  EIP1193Provider,
  EIP3085Request,
  EIP3326Request,
  EthBalanceRequest,
  EthSignTransactionRequest,
  ProviderAccounts,
  ProviderInfo,
  ProviderMessage,
  ProviderRpcError
} from '@bn-onboard/types'

/**
 * Types for request patching methods. Ethereum RPC request is mapped to
 * the implementation that will replace the original.
 * If a method is not supported set it to `null`
 * and the appropriate error will get called.
 */
export type RequestPatch = {
  eth_accounts?:
    | ((request: EIP1193Provider['request']) => Promise<ProviderAccounts>)
    | null
  eth_getBalance?:
    | ((
        request: EIP1193Provider['request'],
        params: EthBalanceRequest['params']
      ) => Promise<Balance>)
    | null
  eth_requestAccounts?:
    | ((request: EIP1193Provider['request']) => Promise<ProviderAccounts>)
    | null
  eth_chainId?:
    | ((request: EIP1193Provider['request']) => Promise<string>)
    | null
  eth_signTransaction?:
    | ((
        request: EIP1193Provider['request'],
        params: EthSignTransactionRequest['params']
      ) => Promise<string>)
    | null
  wallet_switchEthereumChain?:
    | ((
        request: EIP1193Provider['request'],
        params: EIP3326Request['params']
      ) => Promise<null>)
    | null
  wallet_addEthereumChain?:
    | ((
        request: EIP1193Provider['request'],
        params: EIP3085Request['params']
      ) => Promise<null>)
    | null
}

export interface EventCallback {
  connect?: <T = ProviderInfo>(info: T) => ProviderInfo
  disconnect?: <T = ProviderRpcError>(error: T) => ProviderRpcError
  message?: <T = ProviderMessage>(message: T) => ProviderMessage
  chainChanged?: <T = ChainId>(chainId: T) => ChainId
  accountsChanged?: <T = ProviderAccounts>(accounts: T) => ProviderAccounts
}

// eslint-disable-next-line max-len
export type AccountSelectAPI = (options: SelectAccountOptions) => Promise<Account>

export type SelectAccountOptions = {
  basePaths: BasePath[] // the paths to display in the base path selector
  assets: Asset[] // the selectable assets to scan for a balance
  chains: Chain[] // the selectable chains/networks to scan for balance
  scanAccounts: ScanAccounts
  walletIcon: string
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

export type Chain = {
  label: string // eg - Ethereum, Rinkeby, Matic
  id: string 
  // 0x prefixed hex string | 
  // eg - 0x1 (mainnet ethereum), 0x4 (rinkeby), 0x89 (polygon matic)
}

export type ScanAccounts = (options: ScanAccountsOptions) => Promise<Account[]>

export type ScanAccountsOptions = {
  derivationPath: DerivationPath
  chainId: Chain['id']
  asset: Asset
}

export type Account = {
  address: string
  derivationPath: DerivationPath
  balance: {
    asset: Asset['label']
    value: string
  }
}

export type AccountsList = {
  all: Account[]
  filtered: Account[]
}
