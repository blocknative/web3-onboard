<script context="module">
  export const prerender = true

  export const load = createKitDocsLoader({
    sidebar: {
      '/': null,
      '/docs': '/docs'
    }
  })
</script>

<script>
  import '../app.css'
  import '@svelteness/kit-docs/client/polyfills/index.js'
  import '@svelteness/kit-docs/client/styles/normalize.css'
  import '@svelteness/kit-docs/client/styles/theme.css'
  // import '@svelteness/kit-docs/client/styles/fonts.css';
  // import '@svelteness/kit-docs/client/styles/vars.css';
  import '$lib/styles/fonts.css'
  import '$lib/styles/kit-docs.css'

  import { page } from '$app/stores'

  import {
    KitDocs,
    KitDocsLayout,
    SocialLink,
    createKitDocsLoader,
    createSidebarContext
  } from '@svelteness/kit-docs'

  import IconBN from '$lib/components/icons/blocknative.svelte'

  /** @type {import('@svelteness/kit-docs').MarkdownMeta | null} */
  export let meta = null

  /** @type {import('@svelteness/kit-docs').ResolvedSidebarConfig | null} */
  export let sidebar = null

  /** @type {import('@svelteness/kit-docs').NavbarConfig} */
  const navbar = {
    links: [
      { title: 'Documentation', slug: '/docs', match: /\/docs/ },
      { title: 'Examples', slug: '/docs/examples/connect-wallet', match: /\/docs\/examples/ },
      { title: 'FAQ', slug: '/faq', match: /\/faq/ },
      { title: 'Blog', slug: 'https://www.blocknative.com/blog' }
    ]
  }

  const { activeCategory } = createSidebarContext(sidebar)

  $: category = $activeCategory ? `${$activeCategory}: ` : ''
  $: title = meta ? `${category}${meta.title} | KitDocs` : null
  $: description = meta?.description
</script>

<svelte:head>
  {#key $page.url.pathname}
    {#if title}
      <title>{title}</title>
    {/if}
    {#if description}
      <meta name="description" content={description} />
    {/if}
  {/key}
</svelte:head>

<KitDocs {meta}>
  <KitDocsLayout {navbar} {sidebar}>
    <div slot="navbar-left">
      <a class="text-base flex items-center" href="/">
        <IconBN />
        <span class="ml-4">{'Web3-Onboard'}</span>
      </a>
    </div>
    <div slot="navbar-right-alt">
      <div class="flex">
        <SocialLink type="gitHub" href="//github.com/blocknative/web3-onboard" />
        <SocialLink type="discord" href="//discord.com/invite/KZaBVME" />
      </div>
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
