# @web3-onboard/transaction-preview

## A modular UI for previewing a single or set of unsigned Ethereum transactions.

#### Full Transaction Preview package documentation available [here](https://onboard.blocknative.com/docs/packages/transaction-preview)

Full Simulation Platform API documentation can be found [here](https://docs.blocknative.com/transaction-preview-api)

### Install

**NPM**
`npm i @web3-onboard/core @web3-onboard/injected @web3-onboard/transaction-preview`

**Yarn**
`yarn add @web3-onboard/core @web3-onboard/injected @web3-onboard/transaction-preview`

### Usage with Web3-Onboard Core package

To use the Transaction Preview package with web3-onboard all a user needs to do is initialize with their Blocknative API key and the associated [Secret Key](https://docs.blocknative.com/account#secret-key) and the package handles the rest!

```typescript
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected'
import transactionPreviewModule from '@web3-onboard/transaction-preview'

const injected = injectedModule({})
const transactionPreview = transactionPreviewModule({
  // Optional: Require balance change approval prior to sending transaction to wallet
  requireTransactionApproval: true
  //  i18n?: i18nOptions - Internationalization options
})

const onboard = Onboard({
  transactionPreview,
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum',
      rpcUrl: 'https://mainnet.infura.io/v3/17c1e1500e384acfb6a72c5d2e67742e'
    }
  ]
  // ... other Onboard options
})

// Transaction code here using Ether.js or Web3.js or custom
// The transaction will automatically be picked up and simulated with a UI displaying in the upper right corner
```

### Options & Types

```typescript
export type TransactionPreviewModule = (
  options: TransactionPreviewOptions
) => TransactionPreviewAPI

export type TransactionPreviewAPI = {
  /**
   * Pass this method a standard EIP1193 provider
   * (such as an injected wallet from window.ethereum)
   * and it will be patched to allow for transaction previewing
   */
  patchProvider: (provider: PatchedEIP1193Provider) => PatchedEIP1193Provider
  /**
   * Pass this method a standard EIP1193 provider
   * (such as an injected wallet from window.ethereum)
   * and it will be patched to allow for transaction previewing
   */
  init: (initializationOptions: TransactionPreviewInitOptions) => void
}

export type PatchedEIP1193Provider = EIP1193Provider & { simPatched: boolean }

export interface ProviderReq {
  method: string
  params?: Array<unknown>
}

export type RequestOptions = Pick<TransactionPreviewInitOptions, 'apiKey'>

export type TransactionPreviewInitOptions = {
  /**
   * Blocknative API key (https://explorer.blocknative.com/account)
   */
  apiKey: string
  /**
   * Your Blocknative SDK instance
   * */
  sdk: SDK
  /**
   * Optional dom query string to mount UI to
   * */
  containerElement: string
}

export type TransactionPreviewOptions = {
  /**
   * Optional requirement for user to accept transaction balance changes
   * prior to sending the transaction to the wallet
   * */
  requireTransactionApproval?: boolean
  /**
   * An optional internationalization object that defines the display
   * text for different locales. Can also be used to override the default text.
   * To override the default text, pass in a object for the en locale
   */
  i18n?: i18nOptions
}

export type Locale = string
export type i18nOptions = Record<Locale, i18n>
export type i18n = typeof en

export type DeviceNotBrowser = {
  type: null
  os: null
  browser: null
}

export type TransactionForSim = SimulationTransaction & {
  data?: string
}

export interface SimulationTransaction {
  from: string
  to: string
  value: number
  gas: number
  input: string
  // Either Type 1 Gas (gasPrice) or Type 2 Gas (maxPriorityFeePerGas & maxFeePerGas)
  // must be included in the payload
  gasPrice?: number
  maxPriorityFeePerGas?: number
  maxFeePerGas?: number
}

export type MultiSimOutput = {
  id?: string
  contractCall: ContractCall[]
  error?: any
  gasUsed: number[]
  internalTransactions: InternalTransaction[][]
  netBalanceChanges: NetBalanceChange[][]
  network: Network
  simDetails: SimDetails
  serverVersion: string
  system: System
  status: Status
  simulatedBlockNumber: number
  transactions: InternalTransaction[]
}

export interface ContractCall {
  contractType?: string
  contractAddress?: string
  methodName: string
  params: Record<string, unknown>
  contractName?: string
  contractDecimals?: number
  decimalValue?: string
}

export interface InternalTransaction {
  type: string
  from: string
  to: string
  input: string
  gas: number
  gasUsed: number
  value: string
  contractCall: ContractCall
}

export interface NetBalanceChange {
  address: string
  balanceChanges: BalanceChange[]
}

export interface BalanceChange {
  delta: string
  asset: Asset
  breakdown: BreakDown[]
}

export interface Asset {
  type: string
  symbol: string
  contractAddress: string
}

export interface BreakDown {
  counterparty: string
  amount: string
}

export interface InternalTransaction {
  type: string
  from: string
  to: string
  input: string
  gas: number
  gasUsed: number
  value: string
  contractCall: ContractCall
}

export type System = 'bitcoin' | 'ethereum'
export type Network =
  | 'main'
  | 'testnet'
  | 'ropsten'
  | 'rinkeby'
  | 'goerli'
  | 'kovan'
  | 'xdai'
  | 'bsc-main'
  | 'matic-main'
  | 'fantom-main'
  | 'matic-mumbai'
  | 'local'

export type Status =
  | 'pending'
  | 'confirmed'
  | 'speedup'
  | 'cancel'
  | 'failed'
  | 'dropped'
  | 'simulated'

export interface SimDetails {
  blockNumber: number
  e2eMs: number
  performanceProfile: any
}
```
