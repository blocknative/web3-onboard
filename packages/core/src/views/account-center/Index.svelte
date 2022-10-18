<script lang="ts">
  import { onDestroy } from 'svelte'
  import { updateAccountCenter } from '../../store/actions.js'
  import { wallets$ } from '../../streams.js'
  import { state } from '../../store/index.js'
  import { shareReplay, startWith } from 'rxjs/operators'
  import Maximized from './Maximized.svelte'
  import Minimized from './Minimized.svelte'
  import Micro from './Micro.svelte'
  
  export let mountInContainer: boolean = false

  const accountCenter$ = state
    .select('accountCenter')
    .pipe(startWith(state.get().accountCenter), shareReplay(1))

  onDestroy(minimize)

  function minimize() {
    if ($accountCenter$.expanded) {
      updateAccountCenter({ expanded: false })
    }
  }
</script>

<svelte:window on:click={minimize} />

{#if mountInContainer}
  {#if $wallets$.length}
    <div class="container flex flex-column fixed z-indexed">
      <svelte:self />
    </div>
  {/if}
{:else if !$accountCenter$.expanded && !$accountCenter$.minimal}
  <!-- minimized -->
  <Minimized />
{:else if !$accountCenter$.expanded && $accountCenter$.minimal}
  <!-- micro -->
  <Micro />
{:else}
  <!-- maximized -->
  <Maximized />
{/if}
