<script>
  export let image;
  export let metadescription;
  export let pageTitle;
  export let url;
</script>

<svelte:head>
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content={pageTitle} />
  <meta property="twitter:description" content={metadescription} />
  <meta property="twitter:url" content={url} />
  {#if image}
    <meta name="twitter:image" content={image.url} />
    <meta name="twitter:image:alt" content={image.alt} />
  {/if}
</svelte:head>
