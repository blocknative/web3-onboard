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
  :host {
    /* Component Variables */
    --font-family-normal: var(--w3o-font-family, Inter, sans-serif);
    --font-size-4: 1.25rem;
    --font-size-5: 1rem;
    --font-size-6: 0.875rem;
    --font-size-7: 0.75rem;
    --font-line-height-4: 12px;
    --success-500: #5aec99;
    --danger-400: #ff8080;
    --spacing-4: 1rem;
    --border-radius-5: 8px;
    --shadow-1: 0px 4px 12px rgba(0, 0, 0, 0.1);
    --tp-z-index: 10;
  }

  :global(.flex) {
    display: flex;
  }

  :global(.flex-column) {
    flex-direction: column;
  }

  :global(.items-center) {
    align-items: center;
  }

  :global(.justify-center) {
    justify-content: center;
  }

  :global(.relative) {
    position: relative;
  }

  :global(.pointer) {
    cursor: pointer;
  }

  :global(.shadow-1) {
    box-shadow: var(--onboard-shadow-1, var(--shadow-1));
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(button) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: calc(var(--onboard-spacing-4, var(--spacing-4)) - 1px);
    border-radius: 24px;
    cursor: pointer;
    font: inherit;
    border: none;
    transition: background-color 150ms ease-in-out, color 150ms ease-in-out;
  }

  .tp-main {
    --text-color: var(--w3o-text-color, white);
    --action-color: var(--w3o-action-color, var(--primary-400));
    --border-color: var(--w3o-border-color, var(--gray-500));
    --background-color: var(--w3o-background-color, var(--gray-700));
    --foreground-color: var(--w3o-foreground-color, var(--gray-600));
    --border-radius: var(--w3o-border-radius, 1rem);

    font-family: var(--onboard-font-family-normal, var(--font-family-normal));
    border: 1px solid transparent;
    border-color: var(--border-color);
    background: var(--foreground-color, var(--background-color));
    color: var(--text-color);
    border-radius: var(--border-radius);
    z-index: var(--tp-z-index, inherit);
  }
</style>

<div in:fade|local={{ duration: 250, easing: cubicOut }} class="tp-main">
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
