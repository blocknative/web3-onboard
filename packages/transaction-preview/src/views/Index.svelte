<script lang="ts">
  import type { SimPlatformResponse } from '../types'
  import Maximized from './Maximized.svelte'
  import Minimized from './Minimized.svelte'

  export let simResponse: SimPlatformResponse

  $: expanded = false

  const startTime = Date.now()

  function toggleExpanded(maximize: boolean) {
    expanded = maximize
  }
</script>

{#if !expanded}
  <Minimized {toggleExpanded} {startTime} />
{:else}
  <Maximized {toggleExpanded} {simResponse} {startTime} />
{/if}
