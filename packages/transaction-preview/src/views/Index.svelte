<script lang="ts">
  import type { NetBalanceChange } from '../types'
  import Maximized from './Maximized.svelte'
  import Minimized from './Minimized.svelte'

  export let balanceChanges: NetBalanceChange[][]

  $: expanded = false

  function toggleExpanded(maximize: boolean) {
    expanded = maximize
  }
</script>

{#if !expanded}
  <Minimized {toggleExpanded}/>
{:else}
  <Maximized {toggleExpanded} {balanceChanges}/>
{/if}
