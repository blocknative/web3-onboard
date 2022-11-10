<script lang="ts">
  import type {
    SimPlatformResponse,
    TransactionPreviewInitOptions
  } from '../types'
  import Maximized from './Maximized.svelte'
  import Minimized from './Minimized.svelte'
  import { getDevice } from '../utils'
  import type { Subject } from 'rxjs'

  export let simResponse: SimPlatformResponse
  export let requireTransactionApproval: boolean
  export let approved$: Subject<boolean>

  $: expanded = device.type === 'mobile' ? false : true

  const device = getDevice()
  const startTime = Date.now()

  function toggleExpanded(maximize: boolean) {
    expanded = maximize
  }

  const transactionApproved = (approved: boolean) => {
    approved$.next(approved)
  }
</script>

{#if expanded || requireTransactionApproval}
  <Maximized
    {toggleExpanded}
    {simResponse}
    {startTime}
    {transactionApproved}
    {requireTransactionApproval}
  />
{:else}
  <Minimized {toggleExpanded} {startTime} />
{/if}
