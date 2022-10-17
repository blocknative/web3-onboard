<script lang="ts">
  import { onDestroy } from 'svelte'
  import { updateAccountCenter } from '../../store/actions.js'
  import type { AccountCenter } from '../../types.js'
  import { wallets$ } from '../../streams.js'
  import Maximized from './Maximized.svelte'
  import Minimized from './Minimized.svelte'
  import Micro from './Micro.svelte'
  

  export let settings: AccountCenter
  export let mountInContainer: boolean = false
  console.log('ac settings', settings, mountInContainer)

  onDestroy(minimize)

  function minimize() {
    console.log('clicked')
    if (settings.expanded) {
      updateAccountCenter({ expanded: false })
    }
  }
</script>

<svelte:window on:click={minimize} />

{#if mountInContainer}
  {#if $wallets$.length}
    <div class="container flex flex-column fixed z-indexed">
      <div>
        <svelte:self settings={settings} mountInContainer={false}/>
      </div>
    </div>
  {/if}
{:else if !settings.expanded && !settings.minimal}
  <!-- minimized -->
  <Minimized />
{:else if !settings.expanded && settings.minimal}
  <!-- micro -->
  <Micro />
{:else}
  <!-- maximized -->
  <Maximized />
{/if}
