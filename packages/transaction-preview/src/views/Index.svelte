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
    --text-color: var(--w3o-text-color, white);
    --action-color: var(--w3o-action-color, var(--primary-400));
    --border-color: var(--w3o-border-color, var(--gray-500));
    --background-color: var(--w3o-background-color, var(--gray-700));
    --foreground-color: var(--w3o-foreground-color, var(--gray-600));

    font-family: var(--onboard-font-family-normal, var(--font-family-normal));
    border: 1px solid transparent;
    border-color: var(--border-color);
    background: var(--foreground-color, var(--background-color));
    color: var(--text-color);
    border-radius: var(
      --w3o-tp-border-radius,
      var(--onboard-border-radius-4, var(--border-radius-4))
    );
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
