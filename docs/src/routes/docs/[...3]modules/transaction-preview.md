
<script>
  import previewGif from '$lib/assets/transaction-preview.gif'
  import previewImg from '$lib/assets/transaction-preview.png'
</script>

# Transaction Preview

A modular UI for previewing a single or set of unsigned Ethereum transactions.

<img src="{previewImg}" alt="Transaction Preview Flow image"/>

Full Simulation Platform API documentation can be found [here](https://docs.blocknative.com/transaction-preview-api)

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/core @web3-onboard/injected @web3-onboard/transaction-preview
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm i @web3-onboard/core @web3-onboard/injected @web3-onboard/transaction-preview
```

  </TabPanel>
</Tabs>

### Usage with Web3-Onboard Core package

<img src="{previewGif}" alt="Transaction Preview Flow gif"/>

To use the Transaction Preview package with web3-onboard all a developer needs to do is initialize web3-onboard with their [Blocknative API key](https://onboard.blocknative.com/docs/overview/introduction#optional-use-an-api-key-to-fetch-real-time-transaction-data-balances-gas) and pass in the module as shown below.

```typescript
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected'
import transactionPreviewModule from '@web3-onboard/transaction-preview'

const injected = injectedModule()
const transactionPreview = transactionPreviewModule(
  // Optional initialization object
  // {
    // Optional: Require balance change approval prior to sending transaction to wallet
    // Defaults to true
    // requireTransactionApproval?: false

    //  i18n?: i18nOptions - Internationalization options
  // }
)

const onboard = Onboard({
  transactionPreview,
  apiKey: 'xxx387fb-bxx1-4xxc-a0x3-9d37e426xxxx'
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
export type TransactionPreviewModule = (options: TransactionPreviewOptions) => TransactionPreviewAPI

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
   * Defaults to true
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

## Build Environments
For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
