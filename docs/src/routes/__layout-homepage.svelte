<!-- layout-homepage -->
<script>
  let title = 'My Title'
  let description = 'My Description'
</script>

<svelte:head>
  {#if title}
    <title>{title}</title>
  {/if}
  {#if description}
    <meta name="description" content={description} />
  {/if}
</svelte:head>

<slot />

<style>
  :global(:root) {
    /* root styles */
  }
</style>
