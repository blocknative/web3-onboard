# @web3-onboard/transaction-preview

## A modular UI for previewing a single or set of unsigned Ethereum transactions.

#### Full Transaction Preview package documentation available [here](https://onboard.blocknative.com/docs/packages/transaction-preview)

Full Simulation Platform API documentation can be found [here](https://docs.blocknative.com/transaction-preview-api)

### Install

**NPM**
`npm i @web3-onboard/core @web3-onboard/injected @web3-onboard/transaction-preview`

**Yarn**
`yarn add @web3-onboard/core @web3-onboard/injected @web3-onboard/transaction-preview`

### Usage with Web3-Onboard Core package (recommended)

```typescript
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected'
import transactionPreviewModule from '@web3-onboard/transaction-preview'

const injected = injectedModule({})
const transactionPreview = transactionPreviewModule({
  apiKey: 'xxxxx-4729-457a-8d76-d6d15692657b',
  secretKey: 'xxxxx-f0e8-40ec-b49a-2571715642cb'
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

### Standalone Usage

If you would like to use outside of web3-onboard wallet connect more steps are required

```typescript
import transactionPreviewModule from '@web3-onboard/transaction-preview'
const transactionPreview = transactionPreviewModule({
  apiKey: 'xxxxx-4729-457a-8d76-d6d15692657b',
  secretKey: 'xxxxx-f0e8-40ec-b49a-2571715642cb',
  // Require balance change confirmation prior to sending to wallet
  requireTransactionApproval: true
})

transactionPreview.setContainerElement(
  '#existing-html-element-to-append-preview-ui'
)

// Can be any standardized EIP1193 Wallet Provider
transactionPreview.patchProvider(window.ethereum)

// Transaction code here using Ether.js or Web3.js or custom

// UI will display within DOM element specified as containerElement
```

Alternatively Transaction Preview can be ran headless without a UI

```typescript
import transactionPreviewModule from '@web3-onboard/transaction-preview'
const transactionPreview = transactionPreviewModule({
  apiKey: 'xxxxx-4729-457a-8d76-d6d15692657b',
  secretKey: 'xxxxx-f0e8-40ec-b49a-2571715642cb'
})

// Transaction code here using Ether.js or Web3.js or custom
// Pass unsigned transactions into the below method to receive a transaction preview for each transaction passed

transactionPreview.simTransactions(unsignedTransaction)
```

### Options & Types

```typescript
type TransactionPreviewModule = (
  options: TransactionPreviewInitOptions
) => TransactionPreviewAPI

type TransactionPreviewInitOptions = {
  /**
   * Blocknative API key (https://explorer.blocknative.com/account)
   */
  apiKey: string
  /**
   * Your Blocknative API secret key: Add a Secret Key to your API key
   * by using the three dot menu next to the name of your API key.
   * (https://docs.blocknative.com/account#secret-key)
   * */
  secretKey: string
  /**
   * Optional dom query string to mount UI to
   * */
  containerElement?: string
  /**
   * Optional requirement for user to accept transaction balance changes
   * prior to sending the transaction to the wallet
   * */
  requireTransactionApproval?: boolean
  /**
   * An optional internationalization object that defines the display
   * text for different locales. Can also be used to override the default text.
   *  To override the default text, pass in a object for the en locale
   */
  i18n?: i18nOptions
}

type TransactionPreviewAPI = {
  /**
   * Pass this method a standard EIP1193 provider
   * (such as an injected wallet from window.ethereum)
   * and it will be patched to allow for transaction previewing
   */
  patchProvider: (provider: PatchedEIP1193Provider) => PatchedEIP1193Provider
  /**
   * Pass this method any full, presigned ethereum transaction
   * for previewing and simulation
   */
  simTransactions: (txs: [TransactionObject]) => Promise<SimPlatformResponse>
  /**
   * Pass this method an HTML element ID to allow for
   * the Transaction Preview UI to mount to it.
   * Note: The element must exist within the DOM tree
   *  at time of preview/rendering
   */
  setContainerElement: (elementId: string) => void
  /**
   * This property will return the container element HTML ID
   *  set for the Transaction Preview UI to mount to
   */
  containerElement?: string
}

type PatchedEIP1193Provider = EIP1193Provider & { simPatched: boolean }

interface ProviderReq {
  method: string
  params?: Array<unknown>
}

type RequestOptions = Pick<TransactionPreviewInitOptions, 'apiKey'>

interface TransactionObject {
  data?: string
  from: string
  gas?: string
  gasLimit?: string
  to: string
  chainId: number
  value?: string
  nonce?: string

  /**
   *  Either include gasPrice or maxFeePerGas and maxPriorityFeePerGas
   * to differentiate between a type 0 and type 2 (EIP1559) transaction
   */
  gasPrice?: string
  maxFeePerGas?: string
  maxPriorityFeePerGas?: string
}

type SimPlatformResponse = {
  contractCall: ContractCall[]
  error: unknown[]
  gasUsed: number[]
  internalTransactions: TransactionObject[][]
  netBalanceChanges: NetBalanceChange[][]
  network: string
  simDetails: SimDetails
  system: string
  status: string
  simulatedBlockNumber: number
  transactions: TransactionObject[]
}

interface NetBalanceChange {
  address: string
  balanceChanges: BalanceChange[]
}

interface BalanceChange {
  delta: string
  asset: Asset
  breakdown: Breakdown[]
}

interface Asset {
  type: string
  symbol: string
  contractAddress: string
}

interface Breakdown {
  counterparty: string
  amount: string
}

interface SimDetails {
  blockNumber: number
  performanceProfile: PerformanceProfile
  e2eMs: number
}

interface PerformanceProfile {
  breakdown: SimDetailsBreakdown[]
}

interface SimDetailsBreakdown {
  label: string
  timeStamp: string
}

interface ContractCall {
  status: string
  value: ContractCallValue[]
}

interface ContractCallValue {
  methodName: string
  params: {
    _amount?: string
    _spender?: string
    amountIn?: string
    amountOutMin?: string
    deadline?: string
    path?: string[]
    to?: string
  }
  contractAddress: string
  contractType?: string
  contractAlias?: string
  contractDecimals?: string
  contractName?: string
}

type Locale = string
type i18nOptions = Record<Locale, i18n>
```
