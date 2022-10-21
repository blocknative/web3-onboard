<script lang="ts">
  import { blur } from 'svelte/transition'
  // import type { GasPrice } from '../types'

  export let gasData
  export let gasDiff
  let className = ''
  export { className as class }
  export let backgroundStyle = ''

  export let minimal = false

  // Holds refference to the background element node
  export let cardBg = null

  const cardColors = {
    99: '#5aea98',
    95: '#5dea5a',
    90: '#bcea5a',
    80: '#ffe600',
    70: '#eab05a'
  }

  let cardColor = cardColors[gasData?.confidence]
</script>

<div
  class={`${className} p-1 mr-2 last:mr-0 flex flex-col border rounded-2xl justify-evenly text-center overflow-hidden w-full relative cursor-pointer before:absolute before:scale-0 before:transition-transform before:h-3 before:w-3 before:rounded-full before:top-2 before:left-2 before:bg-blue-500`}
  style={`border-color: ${cardColor}; `}
>
  {#if gasData?.confidence}
    <div>BN Gas</div>
  {:else}
    <div>Ethers.js Gas</div>
  {/if}
  <div class={`${minimal ? 'text-xs' : 'text-base'}`}>priority fee</div>

  {#key gasData}
    <div
      in:blur={{ duration: 350, amount: 12 }}
      class={`font-extrabold ${minimal ? 'text-base' : 'text-3xl'}`}
    >
      {gasData?.maxPriorityFeePerGas || '...'}
    </div>
  {/key}

  <div class={`${minimal ? 'text-xs' : 'text-base'}`}>max fee</div>
  {#key gasData}
    <div in:blur={{ duration: 350, amount: 12 }} class={`font-extrabold text-base`}>
      {Math.round(gasData?.maxFeePerGas) || '...'}
    </div>
  {/key}

  {#if gasData?.confidence}
    <div class="text-sm m-1 whitespace-nowrap" style={`color: ${cardColor}`}>
      {gasData?.confidence}% probability
    </div>
  {/if}
  {#if gasDiff}
    <div class="text-sm m-1 whitespace-nowrap" style={`color: ${cardColor}`}>
      {gasDiff} gwei saved
    </div>
  {/if}
  <div
    bind:this={cardBg}
    class="Gas--card-bg origin-bottom absolute w-full h-full left-0 opacity-10"
    style={`background-color: ${cardColor}; ${backgroundStyle}`}
  />
</div>
