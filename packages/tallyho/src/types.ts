import type { ExternalProvider } from '@ethersproject/providers'
export interface CustomWindow extends Window { 
    tally: ExternalProvider
  }

  /**
 * Types for request patching methods. Ethereum RPC request is mapped to
 * the implementation that will replace the original.
 * If a method is not supported set it to `null`
 * and the appropriate error will get called.
 */
export type RequestPatch = {
  eth_accounts?:
    | ((args: {
        baseRequest: EIP1193Provider['request']
      }) => Promise<ProviderAccounts>)
    | null
  eth_getBalance?:
    | ((args: { baseRequest: EIP1193Provider['request'] }) => Promise<Balance>)
    | null
  eth_requestAccounts?:
    | ((args: {
        baseRequest: EIP1193Provider['request']
      }) => Promise<ProviderAccounts>)
    | null
  eth_selectAccounts?:
    | ((args: {
        baseRequest: EIP1193Provider['request']
      }) => Promise<ProviderAccounts>)
    | null
  eth_chainId?:
    | ((args: { baseRequest: EIP1193Provider['request'] }) => Promise<string>)
    | null
  eth_signTransaction?:
    | ((args: {
        baseRequest: EIP1193Provider['request']
        params: EthSignTransactionRequest['params']
      }) => Promise<string>)
    | null
  eth_sendTransaction?:
    | ((args: {
        baseRequest: EIP1193Provider['request']
        params: EthSignTransactionRequest['params']
      }) => Promise<string>)
    | null
  eth_sign?:
    | ((args: {
        baseRequest: EIP1193Provider['request']
        params: EthSignMessageRequest['params']
      }) => Promise<string>)
    | null
  personal_sign?:
    | ((args: {
        baseRequest: EIP1193Provider['request']
        params: PersonalSignMessageRequest['params']
      }) => Promise<string>)
    | null
  eth_signTypedData?:
    | ((args: {
        baseRequest: EIP1193Provider['request']
        params: EIP712Request['params']
      }) => Promise<string>)
    | null
  wallet_switchEthereumChain?:
    | ((args: {
        baseRequest: EIP1193Provider['request']
        params: EIP3326Request['params']
      }) => Promise<null>)
    | null
  wallet_addEthereumChain?:
    | ((args: {
        baseRequest: EIP1193Provider['request']
        params: EIP3085Request['params']
      }) => Promise<null>)
    | null
}

/**
 * The hexadecimal representation of the users
 */
 export type Balance = string

 export type ChainId = string


 export interface EIP1193Provider extends SimpleEventEmitter {
  on(event: 'connect', listener: ConnectListener): void
  on(event: 'disconnect', listener: DisconnectListener): void
  on(event: 'message', listener: MessageListener): void
  on(event: 'chainChanged', listener: ChainListener): void
  on(event: 'accountsChanged', listener: AccountsListener): void
  request(args: EthAccountsRequest): Promise<ProviderAccounts>
  request(args: EthBalanceRequest): Promise<Balance>
  request(args: EIP1102Request): Promise<ProviderAccounts>
  request(args: SelectAccountsRequest): Promise<ProviderAccounts>
  request(args: EIP3326Request): Promise<null>
  request(args: EIP3085Request): Promise<null>
  request(args: EthChainIdRequest): Promise<ChainId>
  request(args: EthSignTransactionRequest): Promise<string>
  request(args: EthSignMessageRequest): Promise<string>
  request(args: PersonalSignMessageRequest): Promise<string>
  request(args: EIP712Request): Promise<string>
  request(args: { method: string; params?: Array<unknown> }): Promise<unknown>
  disconnect?(): void
}


/**
 * An array of addresses
 */
 export type ProviderAccounts = AccountAddress[]

export type ConnectListener = (info: ProviderInfo) => void
export type DisconnectListener = (error: ProviderRpcError) => void
export type MessageListener = (message: ProviderMessage) => void
export type ChainListener = (chainId: ChainId) => void
export type AccountsListener = (accounts: ProviderAccounts) => void

interface BaseRequest {
  params?: never
}

export interface EthAccountsRequest extends BaseRequest {
  method: 'eth_accounts'
}

export interface EthChainIdRequest extends BaseRequest {
  method: 'eth_chainId'
}

export interface EthSignTransactionRequest {
  method: 'eth_signTransaction'
  params: [TransactionObject]
}

type Address = string
type Message = string
export interface EthSignMessageRequest {
  method: 'eth_sign'
  params: [Address, Message]
}

//https://geth.ethereum.org/docs/rpc/ns-personal#personal_sign
export interface PersonalSignMessageRequest {
  method: 'personal_sign'
  params: [Message, Address]
}

// request -> signTypedData_v3`
export interface EIP712Request {
  method: 'eth_signTypedData'
  params: [Address, EIP712TypedData]
}

export interface EthBalanceRequest {
  method: 'eth_getBalance'
  params: [string, (number | 'latest' | 'earliest' | 'pending')?]
}

export interface EIP1102Request extends BaseRequest {
  method: 'eth_requestAccounts'
}

export interface SelectAccountsRequest extends BaseRequest {
  method: 'eth_selectAccounts'
}

export interface EIP3085Request {
  method: 'wallet_addEthereumChain'
  params: AddChainParams[]
}

export interface EIP3326Request {
  method: 'wallet_switchEthereumChain'
  params: [{ chainId: ChainId }]
}

export interface ProviderRpcError extends Error {
  message: string
  code: number
  data?: unknown
}

export enum ProviderRpcErrorCode {
  ACCOUNT_ACCESS_REJECTED = 4001,
  ACCOUNT_ACCESS_ALREADY_REQUESTED = -32002,
  UNAUTHORIZED = 4100,
  INVALID_PARAMS = -32602,
  UNSUPPORTED_METHOD = 4200,
  DISCONNECTED = 4900,
  CHAIN_DISCONNECTED = 4901,
  CHAIN_NOT_ADDED = 4902,
  DOES_NOT_EXIST = -32601
}