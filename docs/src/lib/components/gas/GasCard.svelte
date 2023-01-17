<script lang="ts">
  import { blur } from 'svelte/transition'
  import type { GasPrice, RPCGasPrice } from './types'

  export let gasData: GasPrice | RPCGasPrice | undefined
  export let rpcGasForDiff: RPCGasPrice | undefined
  export let gasPriceFrom: string
  let className = ''
  export { className as class }
  export let backgroundStyle = ''

  // Holds refference to the background element node for animation
  export let cardBg = null

  const cardColors: Record<number, string> = {
    99: '#5aea98',
    95: '#5dea5a',
    90: '#bcea5a',
    80: '#ffe600',
    70: '#eab05a'
  }

  const gasDiff = (bnGas: GasPrice) => {
    if (!rpcGasForDiff || !bnGas || !bnGas.maxPriorityFeePerGas || !bnGas.maxFeePerGas) return
    const priFeeDiff = Number.parseInt(rpcGasForDiff.maxPriorityFeePerGas) - bnGas.maxPriorityFeePerGas
    const maxFeeDiff = Number.parseInt(rpcGasForDiff.maxFeePerGas) - bnGas.maxFeePerGas
    return priFeeDiff + maxFeeDiff
  }

  let cardColor: string | undefined = cardColors[gasData?.confidence]
</script>

<div
  class={`${className} p-1 mr-2 last:mr-0 flex flex-col border rounded-2xl justify-evenly text-center overflow-hidden w-full relative cursor-pointer before:absolute before:scale-0 before:transition-transform before:h-3 before:w-3 before:rounded-full before:top-2 before:left-2 before:bg-blue-500`}
  style={`border-color: ${cardColor}; `}
>
  {#if gasPriceFrom === 'bn'}
    <div>BN Gas</div>
  {:else}
    <div>Ethers.js Gas</div>
  {/if}
  <div class="text-base">priority fee</div>

  {#key gasData}
    <div in:blur={{ duration: 350, amount: 12 }} class="font-extrabold text-base">
      {gasData?.maxPriorityFeePerGas || '...'}
    </div>
  {/key}

  <div class="text-xs">max fee</div>
  {#key gasData}
    <div in:blur={{ duration: 350, amount: 12 }} class="font-extrabold text-base">
      {gasData?.maxFeePerGas ? Math.round(Number(gasData.maxFeePerGas)) : '...'}
    </div>
  {/key}

  {#if gasPriceFrom === 'bn'}
    <div class="text-sm m-1 whitespace-nowrap" style={`color: ${cardColor}`}>
      {(gasData && gasData?.confidence) ? `${gasData.confidence}% probability` : '...'}
    </div>
    <div class="text-sm m-1 whitespace-nowrap" style={`color: ${cardColor}`}>
      {rpcGasForDiff ? `${gasDiff(gasData)?.toFixed(2)} gwei saved` : '...'}
    </div>
  {/if}
  <div
    bind:this={cardBg}
    class="Gas--card-bg origin-bottom absolute w-full h-full left-0 opacity-10"
    style={`background-color: ${cardColor}; ${backgroundStyle}`}
  />
</div>
