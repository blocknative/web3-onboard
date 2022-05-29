<script lang="ts">
  import { onDestroy } from 'svelte'
  import { state } from '../../store'
  import { updateAccountCenter } from '../../store/actions'
  import type { AccountCenter, NotifyInitOptions } from '../../types'
  import Maximized from './Maximized.svelte'
  import Minimized from './Minimized.svelte'
  import Micro from './Micro.svelte'
  import Notify from '../notify/Index.svelte'

  export let settings: {
    accountCenterSettings: AccountCenter
    notifySettings: NotifyInitOptions
  }

  const { notifySettings, accountCenterSettings } = settings

  const accountCenterPositions = {
    topLeft: 'top: 0; left: 0;',
    topRight: 'top: 0; right: 0;',
    bottomRight: 'bottom: 0; right: 0;',
    bottomLeft: 'bottom: 0; left: 0;'
  }

  onDestroy(minimize)

  function minimize() {
    const { accountCenter } = state.get()
    if (accountCenterSettings.expanded) {
      updateAccountCenter({ expanded: false })
    }
  }
</script>

<style>
  .container {
    padding: 16px;
    font-family: var(--onboard-font-family-normal, var(--font-family-normal));
    width: 100%;
  }

  @media all and (min-width: 428px) {
    .container {
      max-width: 352px;
    }
  }
</style>

<svelte:window on:click={minimize} />

<div
  class="container flex flex-column fixed"
  style="{accountCenterPositions[
    accountCenterSettings.position
  ]} width: {!accountCenterSettings.expanded && accountCenterSettings.minimal
    ? 'auto'
    : '100%'}"
>
  {#if notifySettings.enabled && accountCenterSettings.position.includes('bottom')}
    <Notify settings={notifySettings} />
  {/if}

  {#if !accountCenterSettings.expanded && !accountCenterSettings.minimal}
    <!-- minimized -->
    <Minimized />
  {:else if !accountCenterSettings.expanded && accountCenterSettings.minimal}
    <!-- micro -->
    <Micro />
  {:else}
    <!-- maximized -->
    <Maximized />
  {/if}

  {#if notifySettings.enabled && accountCenterSettings.position.includes('top')}
    <Notify settings={notifySettings} />
  {/if}
</div>
