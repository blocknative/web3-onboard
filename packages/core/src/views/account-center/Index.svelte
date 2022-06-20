<script lang="ts">
  import { onDestroy } from 'svelte'
  import { updateAccountCenter } from '../../store/actions'
  import type { AccountCenter } from '../../types'
  import Maximized from './Maximized.svelte'
  import Minimized from './Minimized.svelte'
  import Micro from './Micro.svelte'

  export let settings: AccountCenter

  onDestroy(minimize)

  function minimize() {
    if (settings.expanded) {
      updateAccountCenter({ expanded: false })
    }
  }
</script>

<svelte:window on:click={minimize} />

{#if !settings.expanded && !settings.minimal}
  <!-- minimized -->
  <Minimized />
{:else if !settings.expanded && settings.minimal}
  <!-- micro -->
  <Micro />
{:else}
  <!-- maximized -->
  <Maximized />
{/if}
