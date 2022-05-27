<script lang="ts">
  import { onDestroy } from 'svelte'
import { fix_position } from 'svelte/internal'
  import { state } from '../../store'
  import { updateAccountCenter } from '../../store/actions'
  import type { AccountCenter } from '../../types'
  import Maximized from './Maximized.svelte'
  import Minimized from './Minimized.svelte'

  export let settings: {AccountCenter, Notify}

  const {notifySettings, accountCenterSettings} = settings

  const accountCenterPositions = {
    topLeft: 'top: 0; left: 0;',
    topRight: 'top: 0; right: 0;',
    bottomRight: 'bottom: 0; right: 0;',
    bottomLeft: 'bottom: 0; left: 0;'
  }

  onDestroy(minimize)

  function minimize() {
    const { accountCenter } = state.get()
    if (accountCenter.expanded) {
      updateAccountCenter({ expanded: false })
    }
  }
</script>

<style>
  .container {
    padding: 16px;
    max-width: 364px;
    min-width: 348px;
    font-family: var(--onboard-font-family-normal, var(--font-family-normal));
  }
</style>

<svelte:window on:click={minimize} />

<div
  class="container flex flex-column absolute"
  style={accountCenterPositions[accountCenterSettings.position]}
>
  {#if notifySettings.enabled && accountCenterSettings.fix_position.contains('bottom')}
    <Notify settings={notifySettings} dappId={} />
  {/if}
  {#if !accountCenterSettings.expanded}
    <!-- minimized -->
    <Minimized />
  {:else}
    <!-- maximized -->
    <Maximized />
  {/if}

  {#if notifySettings.enabled && accountCenterSettings.fix_position.contains('top')}
    <Notify settings={notifySettings} dappId={} />
  {/if}
</div>
