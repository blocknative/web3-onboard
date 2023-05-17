<script lang="ts">
  import { onDestroy } from 'svelte'
  import { updateAccountCenter } from '../../store/actions.js'
  import { state } from '../../store/index.js'
  import { shareReplay, startWith } from 'rxjs/operators'
  import AccountCenterPanel from './AccountCenterPanel.svelte'
  import TriggerLarge from './AcctCenterTriggerLarge.svelte'
  import TriggerSmall from './AcctCenterTriggerSmall.svelte'

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

{#key $accountCenter$}
<div class="container flex flex-column items-end" style="width: 315px;">
  {#if $accountCenter$.position.includes('bottom')}
    <AccountCenterPanel />
  {/if}
  {#if $accountCenter$.minimal}
    <TriggerSmall />
  {:else}
    <TriggerLarge />
  {/if}
  {#if $accountCenter$.position.includes('top')}
    <AccountCenterPanel />
  {/if}
</div>
{/key}
