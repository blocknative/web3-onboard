<!-- layout-homepage -->
<script>
  import '@svelteness/kit-docs/client/polyfills/index.js';
  import '@svelteness/kit-docs/client/styles/normalize.css';
  import '@svelteness/kit-docs/client/styles/theme.css';
  // import '@svelteness/kit-docs/client/styles/fonts.css';
  // import '@svelteness/kit-docs/client/styles/vars.css';
  import '$lib/styles/fonts.css';
  import '$lib/styles/kit-docs.css';
  import '../app.css'

  import {
    KitDocs,
    KitDocsLayout,
  } from '@svelteness/kit-docs'

  import IconBN from '$lib/components/icons/blocknative.svelte'

  /** @type {import('@svelteness/kit-docs').NavbarConfig} */
  const navbar = {
    links: [
      { title: 'Documentation', slug: '/docs', match: /\/docs/ },
      { title: 'Examples', slug: '/docs/examples/connect-wallet', match: /\/docs\/examples/ },
      { title: 'FAQS', slug: '/docs', match: /\/docs\/faqs/ }
    ]
  }

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


<KitDocs>
  <KitDocsLayout {navbar} --kd-content-max-width={'100%'}>
    <div slot="navbar-left">
      <a href="/">
        <IconBN />
      </a>
    </div>
    <slot />
  </KitDocsLayout>
</KitDocs>

<style>
  :global(:root) {
    --kd-color-brand-rgb: 99, 112, 229;
    /* --kd-font-family-sans: 'Sofia Pro'; */
  }
</style>
