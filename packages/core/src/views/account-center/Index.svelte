<script lang="ts">
  import { onDestroy } from 'svelte'
  import { updateAccountCenter } from '../../store/actions.js'
  import { state } from '../../store/index.js'
  import { shareReplay, startWith } from 'rxjs/operators'
  import Maximized from './Maximized.svelte'
  import Minimized from './Minimized.svelte'
  import Micro from './Micro.svelte'

  const accountCenter$ = state
    .select('accountCenter')
    .pipe(startWith(state.get().accountCenter), shareReplay(1))

  onDestroy(minimize)
  let visible = false

  function minimize() {
    if ($accountCenter$.expanded) {
      updateAccountCenter({ expanded: false })
      visible=false
    }
  }
</script>

{#if !$accountCenter$.minimal}
  <div class="container flex flex-column items-end" style="width: 315px;">
    {#if $accountCenter$.position.includes('bottom')}
      <Maximized />
    {/if}
    <!-- micro -->
    <Minimized />
    {#if $accountCenter$.position.includes('top')}
      <Maximized />
    {/if}
  </div>
{:else if $accountCenter$.minimal}
  <div class="container flex flex-column items-end" style="width: 315px;">
  <!-- micro -->
  {#if $accountCenter$.position.includes('bottom')}
    <Maximized />
  {/if}
  <Micro />
  {#if $accountCenter$.position.includes('top')}
    <Maximized />
  {/if}
  </div>
{/if}
