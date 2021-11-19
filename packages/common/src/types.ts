import {
  Balance,
  ChainId,
  EIP1193Provider,
  EIP3085Request,
  EIP3326Request,
  EthAccountsRequest,
  EthBalanceRequest,
  EthChainIdRequest,
  ProviderAccounts,
  ProviderInfo,
  ProviderMessage,
  ProviderRpcError
} from '@bn-onboard/types'

/**
 * Types for request patching methods. Ethereum RPC request is mapped to
 * the implementation that will replace the original.
 * If a method is not supported set it to `null` and the appropriate error will get called.
 */
export type RequestPatch = {
  eth_accounts?:
    | ((request: EIP1193Provider['request']) => Promise<ProviderAccounts>)
    | null
  eth_getBalance?:
    | ((request: EIP1193Provider['request']) => Promise<Balance>)
    | null
  eth_requestAccounts?:
    | ((request: EIP1193Provider['request']) => Promise<ProviderAccounts>)
    | null
  eth_chainId?:
    | ((request: EIP1193Provider['request']) => Promise<string>)
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
