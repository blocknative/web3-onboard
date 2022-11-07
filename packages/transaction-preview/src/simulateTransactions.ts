import { catchError, firstValueFrom, map, of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { ethers } from 'ethers'
import { hexFieldsToNumber } from './utils'
import type { SimPlatformResponse, TransactionObject, TransactionPreviewInitOptions } from './types.js'

const simulateTransactions = async (
  options: Omit<TransactionPreviewInitOptions, 'provider'>,
  transactions: [TransactionObject]
): Promise<SimPlatformResponse> => {
  const { secretKey, apiKey } = options
  const cleanedTransactions = transactions.map(transaction => {
    const convertedTransaction = hexFieldsToNumber(transaction as TransactionObject)
  
    const cleanedTrans = {
      ...transaction,
      ...convertedTransaction,
      input: transaction.data || '0x'
    }
    return transaction
  })

  const addressFrom = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'

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
  const dai = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
  let swapTxData
  let approveTxData
  const createTransaction = async () => {
    const swapContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      uniswapV2router_interface
    )
    const erc20_contract = new ethers.Contract(weth, erc20_interface)
    const oneEther = ethers.BigNumber.from("1591000000000000000000");
    approveTxData = await erc20_contract.populateTransaction.approve(
      CONTRACT_ADDRESS,
      oneEther
    )

    const amountOutMin = 0
    const amountOutMinHex = ethers.BigNumber.from(amountOutMin.toString())._hex

    const path = [dai, weth]
    const deadline = Math.floor(Date.now() / 1000) + 60 * 1 // 1 minutes from the current Unix time

    const inputAmountHex = oneEther.toHexString()

    swapTxData = await swapContract.populateTransaction.swapExactTokensForETH(
      inputAmountHex,
      amountOutMinHex,
      path,
      addressFrom,
      deadline
    )
  }
  await createTransaction()
  const account_address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
  const uniswapV2Router = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'

  const stubTrans = [
    {
      type: '0x0',
      chainId: 1,
      from: account_address,
      to: dai,
      input: approveTxData.data,
      gas: 1000000,
      gasPrice: 48000000000,
      value: 0
    },
    {
      type: '0x0',
      chainId: 1,
      from: account_address,
      to: uniswapV2Router,
      input: swapTxData.data,
      gas: 1000000,
      gasPrice: 48000000000,
      value: 0
    }
  ]
  const body = {
    system: 'ethereum',
    network: 'main',
    transactions: stubTrans
  }
  console.log(body)
  const headers = {
    'Content-Type': 'application/json',
    credentials: `${apiKey}:${secretKey}`
  }

  const sim = ajax({
    url: 'https://api.blocknative.com/simulate',
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  }).pipe(
    map(response => response.response),

    catchError(error => {
      console.error('Error previewing transaction: ', error)
      return of(error)
    })
  )
  return await firstValueFrom(sim)
}

export default simulateTransactions
