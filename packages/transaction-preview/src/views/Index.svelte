<script lang="ts">
  import type { SimPlatformResponse } from '../types'
  import Maximized from './Maximized.svelte'
  import Minimized from './Minimized.svelte'
  import { getDevice } from '../utils'

  export let simResponse: SimPlatformResponse

  $: expanded = device.type === 'mobile' ? false : true

  const device = getDevice()
  const startTime = Date.now()

  function toggleExpanded(maximize: boolean) {
    expanded = maximize
  }
</script>

{#if expanded}
  <Maximized {toggleExpanded} {simResponse} {startTime} />
{:else}
  <Minimized {toggleExpanded} {startTime} />
{/if}
