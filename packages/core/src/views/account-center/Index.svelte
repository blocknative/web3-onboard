<script lang="ts">
  import { onDestroy } from 'svelte'
  import { fade } from 'svelte/transition'
  import { updateAccountCenter } from '../../store/actions'
  import type { AccountCenter } from '../../types'
  import Maximized from './Maximized.svelte'
  import Minimized from './Minimized.svelte'

  export let settings: AccountCenter

  const accountCenterPositions = {
    topLeft: 'top: 0; left: 0;',
    topRight: 'top: 0; right: 0;',
    bottomRight: 'bottom: 0; right: 0;',
    bottomLeft: 'bottom: 0; left: 0;'
  }

  onDestroy(() => updateAccountCenter({ expanded: false }))
</script>

<style>
  .container {
    padding: 12px;
    max-width: 400px;
    min-width: 364px;
    font-family: var(--onboard-font-family-normal, var(--font-family-normal));
  }
</style>

<div
  class="container flex absolute"
  transition:fade
  style={accountCenterPositions[settings.position]}
>
  {#if !settings.expanded}
    <!-- minimized -->
    <Minimized />
  {:else}
    <!-- maximized -->
    <Maximized />
  {/if}
</div>
