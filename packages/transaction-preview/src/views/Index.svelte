<script lang="ts">
  import { onDestroy } from 'svelte'
  import Maximized from './Maximized.svelte'
  import Minimized from './Minimized.svelte'

  $: expanded = false

  function toggleExpanded(maximize: boolean) {
    expanded = maximize
  }
</script>

{#if !expanded}
  <Minimized {toggleExpanded}/>
{:else}
  <Maximized {toggleExpanded}/>
{/if}
