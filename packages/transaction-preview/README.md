# @web3-onboard/transaction-preview

## A modular UI for previewing a single or set of unsigned Ethereum transactions.

![Transaction Preview Flow](https://github.com/blocknative/web3-onboard/blob/develop/assets/transaction-preview.gif?raw=true 'Transaction Preview Flow')

#### Full Transaction Preview package documentation available [here](https://onboard.blocknative.com/docs/packages/transaction-preview)

Full Simulation Platform API documentation can be found [here](https://docs.blocknative.com/transaction-preview-api)

### Install

**NPM**
`npm i @web3-onboard/core @web3-onboard/injected @web3-onboard/transaction-preview`

**Yarn**
`yarn add @web3-onboard/core @web3-onboard/injected @web3-onboard/transaction-preview`

### Usage with Web3-Onboard Core package

To use the Transaction Preview package with web3-onboard all a developer needs to do is initialize web3-onboard with their [Blocknative API key](https://onboard.blocknative.com/docs/overview/introduction#optional-use-an-api-key-to-fetch-real-time-transaction-data-balances-gas) and pass in the module as shown below.

```typescript
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected'
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

To use the Transaction Preview package with web3-onboard all a developer needs to do is initialize web3-onboard with their [Blocknative API key](https://onboard.blocknative.com/docs/overview/introduction#optional-use-an-api-key-to-fetch-real-time-transaction-data-balances-gas) and pass in the module as shown below.

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
  const amountOutMinHex = ethers.BigNumber.from(amountOutMin.toString())._hex

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
  await previewTransaction(transactions)
}

simulate(ethereumProvider)
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
    /**
   * Pass this method a transaction that would be passed to a wallet provider
   * (such as transaction built using a lib like Ethers or Web3)
   * and the transaction will be simulated and a UI generated
   * Note: the package will need to initialized with the `init`
   * function prior to usage
   */
  previewTransaction: (
    transaction: TransactionForSim[]
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
