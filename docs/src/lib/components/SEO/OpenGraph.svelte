<script>
  export let image;
  export let metadescription;
  export let pageTitle;
  export let url;
  export let siteTitle;
  export let ogLanguage;
</script>

<svelte:head>
  <meta property="og:site_name" content={siteTitle} />
  <meta property="og:locale" content={ogLanguage} />
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={metadescription} />
  {#if image}
    <meta property="og:image" content={image.url} />
    <meta property="og:image:alt" content={image.alt} />
  {/if}
</svelte:head>
