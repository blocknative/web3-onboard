<script lang="ts">
  import { onDestroy } from 'svelte'
  import { state } from '../../store'
  import { updateAccountCenter } from '../../store/actions'
  import type { AccountCenter } from '../../types'
  import Maximized from './Maximized.svelte'
  import Minimized from './Minimized.svelte'
  import Micro from './Micro.svelte'
  import Notify from '../notify/Index.svelte'
  import { shareReplay, startWith } from 'rxjs'

  export let settings: AccountCenter

  const notify$ = state
    .select('notify')
    .pipe(startWith(state.get().notify), shareReplay(1))

  notify$.subscribe(x => console.log('notify sub', x))

  const accountCenterPositions = {
    topLeft: 'top: 0; left: 0;',
    topRight: 'top: 0; right: 0;',
    bottomRight: 'bottom: 0; right: 0;',
    bottomLeft: 'bottom: 0; left: 0;'
  }

  onDestroy(minimize)

  function minimize() {
    const { accountCenter } = state.get()
    if (settings.expanded) {
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
    settings.position
  ]} width: {!settings.expanded && settings.minimal ? 'auto' : '100%'}"
>
  {#if $notify$.enabled && settings.position.includes('bottom')}
    <Notify
      settings={{ notifySettings: $notify$, position: settings.position }}
    />
  {/if}

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

  {#if $notify$.enabled && settings.position.includes('top')}
    <Notify
      settings={{ notifySettings: $notify$, position: settings.position }}
    />
  {/if}
</div>
