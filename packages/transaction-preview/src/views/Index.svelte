<script lang="ts">
  import { onDestroy } from 'svelte'
  import Maximized from './Maximized.svelte'
  import Minimized from './Minimized.svelte'

  onDestroy(minimize)

  $: expanded = false

  function minimize() {
    expanded = !expanded
  }
</script>

<svelte:window on:click={minimize} />

{#if !expanded}
  <Minimized />
{:else}
  <Maximized />
{/if}
