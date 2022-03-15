<script lang="ts">
  import { fade } from 'svelte/transition'
  import { wallets$ } from '../../streams'
  import type { Dashboard } from '../../types'
  import Maximized from './Maximized.svelte'
  import Minimized from './Minimized.svelte'

  export let settings: Dashboard

  const dashboardPositions = {
    topLeft: 'top: 0; left: 0;',
    topRight: 'top: 0; right: 0;',
    bottomRight: 'bottom: 0; right: 0;',
    bottomLeft: 'bottom: 0; left: 0;'
  }
</script>

<style>
  .container {
    padding: 12px 24px;
    max-width: 400px;
    box-sizing: border-box;
    font-family: var(--onboard-font-family-normal, var(--font-family-normal));
  }
</style>

{#if $wallets$.length}
  <div
    class="container flex absolute"
    transition:fade
    style={dashboardPositions[settings.position]}
  >
    {#if !settings.expanded}
      <!-- minimized -->
      <Minimized />
    {:else}
      <!-- maximized -->
      <Maximized />
    {/if}
  </div>
{/if}
