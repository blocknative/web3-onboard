<script lang="ts">
  import anime from 'animejs'

  import GasCard from './GasCard.svelte'
  import gasModule from '@web3-onboard/gas/dist/index.js'
  import { onMount } from 'svelte'
  import { ethers } from 'ethers'
  import type { GasPrice, RPCGasPrice, GasData } from './types'

  let cardBg: any
  let animation: any
  $: if (cardBg) {
    animation = anime({
      targets: '.Gas--card-bg',
      scaleY: [0, 1],
      duration: 5000,
      loop: false,
      easing: 'linear',
      autoplay: false
    })
  }
  let ethMainnetGasBlockPrices
  let rpcGasData: RPCGasPrice
  onMount(() => {
    ethMainnetGasBlockPrices = gasModule.stream({
      chains: ['0x1'],
      apiKey: '7eeb406c-82cb-4348-8ab5-b8cd3b684fff',
      endpoint: 'blockPrices'
    })
    ethMainnetGasBlockPrices.subscribe(() => {
      async function getEtherGasFromRPC() {
        const INFURA_ID = '03af2f609bfd4782900a84da1ac65000'
        const infuraRPC = `https://mainnet.infura.io/v3/${INFURA_ID}`
        const customHttpProvider = new ethers.providers.JsonRpcProvider(infuraRPC)
        const fee = await customHttpProvider.getFeeData()
        if (fee.gasPrice && fee.maxFeePerGas && fee.maxPriorityFeePerGas) {
          rpcGasData = {
            price: ethers.utils.formatUnits(fee.gasPrice, 'gwei'),
            maxPriorityFeePerGas: ethers.utils.formatUnits(fee.maxPriorityFeePerGas, 'gwei'),
            maxFeePerGas: ethers.utils.formatUnits(fee.maxFeePerGas, 'gwei')
          }
        }
      }
      getEtherGasFromRPC()
      animation?.restart()
    })
  })

  const CONF_PERCENTAGES: number[] = [99, 95, 90, 80, 70]

  const gasPricesDefaults: GasPrice[] = CONF_PERCENTAGES.map((confidence) => ({
    confidence,
    price: null,
    maxFeePerGas: null,
    maxPriorityFeePerGas: null
  }))

  const GAS_DATA_DEFAULT: GasData = {
    estimatedPrices: gasPricesDefaults,
    baseFeePerGas: null,
    blockNumber: null,
    maxPrice: null,
    estimatedTransactionCount: null,
    seconds: null
  }
</script>

<div class="Gas px-6  p-4">
  <div class="flex whitespace-nowrap mb-3 text-sm select-none">
    <span class="flex items-center">MORE LIKELY</span>
    <span
      class="bg-gradient-to-r from-conf-99 via-conf-95 via-conf-90 via-conf-80 to-conf-70 h-[1px] mx-2 my-3 w-full rounded-full"
    />
    <span class="flex items-center">LESS LIKELY</span>
  </div>
  <div class="w-0 h-0 text-transparent selection:bg-none">.</div>
  <div class="flex flex-nowrap justify-evenly ">
    {#each ($ethMainnetGasBlockPrices && $ethMainnetGasBlockPrices[0]?.blockPrices[0]?.estimatedPrices) || GAS_DATA_DEFAULT.estimatedPrices as gasData}
      <GasCard bind:cardBg {gasData} rpcGasForDiff={rpcGasData} gasPriceFrom={'bn'} />
    {/each}
  </div>
  <div class="flex mt-4">
    <GasCard bind:cardBg gasData={rpcGasData} rpcGasForDiff={undefined} gasPriceFrom={'rpc'} />
  </div>
</div>
