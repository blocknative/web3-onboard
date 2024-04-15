# @web3-onboard/transaction-preview

## A modular UI for previewing a single or set of unsigned Ethereum transactions.

![Transaction Preview Flow](https://github.com/blocknative/web3-onboard/blob/develop/assets/transaction-preview.gif?raw=true 'Transaction Preview Flow')

#### Give Transaction Preview a test run by previewing Vitalik swapping tokens and find full package documentation [here](https://onboard.blocknative.com/docs/packages/transaction-preview)

Full Simulation Platform API documentation can be found [here](https://docs.blocknative.com/transaction-preview-api)

### Install

**NPM**
`npm i @web3-onboard/core @web3-onboard/injected-wallets @web3-onboard/transaction-preview`

**Yarn**
`yarn add @web3-onboard/core @web3-onboard/injected-wallets @web3-onboard/transaction-preview`

### Usage with Web3-Onboard Core package

![Transaction Preview Image with Account Center](https://github.com/blocknative/web3-onboard/blob/develop/assets/transaction-preview.png?raw=true 'Transaction Preview Image with Account Center')

To use the Transaction Preview package with web3-onboard all a developer needs to do is initialize web3-onboard with their [Blocknative API key](https://onboard.blocknative.com/docs/overview/introduction#optional-use-an-api-key-to-fetch-real-time-transaction-data-balances-gas) and pass in the module as shown below.

```typescript
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import transactionPreviewModule from '@web3-onboard/transaction-preview'

const injected = injectedModule()
const transactionPreview = transactionPreviewModule({
  // Optional: Require balance change approval prior to sending transaction to wallet
  // Defaults to true
  // requireTransactionApproval?: false

  //  i18n?: i18nOptions - Internationalization options
})

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

### Standalone Usage

To use the Transaction Preview package without web3-onboard all a developer needs to do is: 
- Execute the entry function from the `@web3-onboard/transaction-preview` package and optional params
- Run the returned `init` function with their [Blocknative API key](https://onboard.blocknative.com/docs/overview/introduction#optional-use-an-api-key-to-fetch-real-time-transaction-data-balances-gas), an initialized instance of their [Blocknative SDK](https://www.npmjs.com/package/bnc-sdk) and a containerElement string with the html ID of the target element to append the visualization to
- Finally pass a transaction meant for a wallet provider (created using libraries like Ethers or Web3)

With the above steps a UI will be rendered with the balance changes and gas used.

```typescript
import transactionPreviewModule from '@web3-onboard/transaction-preview'

const {init, previewTransaction} = transactionPreviewModule({
  // Optional: Require balance change approval prior to sending transaction to wallet
  // Defaults to true
  // requireTransactionApproval?: false

  //  i18n?: i18nOptions - Internationalization options
})
await init({
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
containerElement: string})

// Transaction code here using Ether.js or Web3.js or construct your own transactions
const simulate = async provider => {
  // if using ethers v6 this is:
  // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
  const ethersProvider = new ethers.providers.Web3Provider(provider, 'any')

  const signer = ethersProvider.getSigner()
  const addressFrom = '0xcxxxxxx11111999991111'

  // Uniswap V2
  const CONTRACT_ADDRESS = '0x7a250d5630b4cf539739df2c5dacb4c659f2488d'
  const erc20_interface = [
    'function approve(address _spender, uint256 _value) public returns (bool success)',
    'function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)',
    'function balanceOf(address owner) view returns (uint256)'
  ]

  const uniswapV2router_interface = [
    'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
  ]

  const weth = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
  const oneInch = '0x111111111117dc0aa78b770fa6a738034120c302'
  let swapTxData
  let approveTxData
  const swapContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    uniswapV2router_interface
  )
  const erc20_contract = new ethers.Contract(oneInch, erc20_interface)
  const oneEther = ethers.BigNumber.from('9000000000000000000')
  approveTxData = await erc20_contract.populateTransaction.approve(
    CONTRACT_ADDRESS,
    oneEther
  )

  const amountOutMin = 0
  const amountOutMinHex = ethers.BigNumber.from(amountOutMin).toHexString()

  const path = [oneInch, weth]
  const deadline = Math.floor(Date.now() / 1000) + 60 * 1 // 1 minutes from the current Unix time

  const inputAmountHex = oneEther.toHexString()

  swapTxData = await swapContract.populateTransaction.swapExactTokensForETH(
    inputAmountHex,
    amountOutMinHex,
    path,
    addressFrom,
    deadline
  )
  const uniswapV2Router = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'

  const popApproveTransaction = await signer.populateTransaction(approveTxData)
  const popTransaction = await signer.populateTransaction(swapTxData)
  const transactions = [
    { ...popApprovedTransaction, value: 0 },
    {
      ...popTransaction,
      from: addressFrom,
      to: uniswapV2Router,
      value: 0
    }
  ]
  return await previewTransaction(transactions)
}

const simData = simulate(ethereumProvider)
console.log(simData)
```

### Options & Types

```typescript
export type TransactionPreviewModule = (
  options: TransactionPreviewOptions
) => TransactionPreviewAPI

export type FullPreviewOptions = TransactionPreviewOptions &
  TransactionPreviewInitOptions

export type TransactionPreviewAPI = {
  /**
   * This Method accepts a standard EIP1193 provider
   * (such as an injected wallet from window.ethereum)
   * and it will be patched to allow for transaction previewing
   */
  patchProvider: (provider: PatchedEIP1193Provider) => PatchedEIP1193Provider

  /**
   * This Method accepts:
   * apiKey: string - Blocknative API key (https://explorer.blocknative.com/)
   * sdk: instance of an initialized bnc-sdk (www.npmjs.com/package/bnc-sdk)
   * containerElement: string of an html id selector (e.g. "#my-html-el")
   */
  init: (initializationOptions: TransactionPreviewInitOptions) => void

  /**
   * This method accepts a transaction meant for a wallet provider
   * (created using libraries like Ethers or Web3),
   * simulates the transaction and generates a corresponding UI and
   * return a response from the Blocknative Transaction Preview API.
   * Note: the package will need to initialized with the `init`
   * function prior to usage
   */
  previewTransaction: (
    transaction: TransactionForSim[]
  ) => Promise<MultiSimOutput>
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
   * Your Blocknative SDK instance (https://www.npmjs.com/package/bnc-sdk)
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
  contractAlias?: string
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
  error?: string
  errorReason?: string
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
  | 'sepolia'
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
