<script lang="ts">
  import { onDestroy } from 'svelte'
  import { updateAccountCenter } from '../../store/actions.js'
  import { state } from '../../store/index.js'
  import { shareReplay, startWith } from 'rxjs/operators'
  import AccountCenterPanel from './AccountCenterPanel.svelte'
  import TriggerLarge from './AcctCenterTriggerLarge.svelte'
  import TriggerSmall from './AcctCenterTriggerSmall.svelte'

  let expanded = false

  const accountCenter$ = state
    .select('accountCenter')
    .pipe(startWith(state.get().accountCenter), shareReplay(1))

  onDestroy(minimize)

  function minimize() {
    if ($accountCenter$.expanded) {
      updateAccountCenter({ expanded: false })
      expanded = false
    }
  }

  function toggle(){
    updateAccountCenter({ expanded: !$accountCenter$.expanded })
    expanded = !expanded
  }
</script>

<style>
.ac-container {
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  gap: 0.5rem;
}
</style>

<svelte:window on:click={minimize} />

<div class="ac-container">
  {#if $accountCenter$.position.includes('bottom')}
    <AccountCenterPanel expanded={expanded}/>
  {/if}
  {#if $accountCenter$.minimal}
    <TriggerSmall toggle={toggle}/>
  {:else}
    <TriggerLarge toggle={toggle}/>
  {/if}
  {#if $accountCenter$.position.includes('top')}
    <AccountCenterPanel expanded={expanded}/>
  {/if}
</div>
