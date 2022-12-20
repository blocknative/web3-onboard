<script lang="ts">
  import { fade } from 'svelte/transition'
  import { cubicOut } from 'svelte/easing'
  import Maximized from './Maximized.svelte'
  import Minimized from './Minimized.svelte'
  import { getDevice } from '../utils'
  import type { Subject } from 'rxjs'
  import type { MultiSimOutput } from 'bnc-sdk'

  export let simResponse: MultiSimOutput
  export let requireTransactionApproval: boolean
  export let approved$: Subject<boolean>
  export let destroyApp: () => void

  $: expanded = device.type === 'mobile' ? false : true

  const device = getDevice()
  const startTime = Date.now()

  function toggleExpanded(maximize: boolean) {
    expanded = maximize
  }

  const transactionApproved = (approved: boolean) => {
    approved$.next(approved)
  }
</script>
<style>
  .tp-main {
    font-family: var(--onboard-font-family-normal, inherit);
    background: var(--w3o-tp-background, --grey-700)
  }
</style>

<div in:fade={{ duration: 250, easing: cubicOut }} class="tp-main">
  {#if expanded || requireTransactionApproval}
    <Maximized
      {toggleExpanded}
      {transactionApproved}
      {destroyApp}
      {simResponse}
      {startTime}
      {requireTransactionApproval}
    />
  {:else}
    <Minimized {toggleExpanded} {destroyApp} {startTime} />
  {/if}
</div>
