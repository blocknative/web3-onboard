<script context="module">
  export const prerender = true

  export const load = createKitDocsLoader({
    sidebar: {
      '/': '/',
      '/docs': '/docs',
      '/faq': '/faq',
      '/examples': '/examples',
      '/theming-tool': '/theming-tool'
    }
  })
</script>

<script>
  import '../app.css'
  import '@svelteness/kit-docs/client/polyfills/index.js'
  import '@svelteness/kit-docs/client/styles/normalize.css'
  import '@svelteness/kit-docs/client/styles/theme.css'
  import '$lib/styles/fonts.css'
  import '$lib/styles/kit-docs.css'
  import '@docsearch/css'
  import '@svelteness/kit-docs/client/styles/docsearch.css'

  import { page } from '$app/stores'

  import {
    KitDocs,
    KitDocsLayout,
    SocialLink,
    createKitDocsLoader,
    createSidebarContext
  } from '@svelteness/kit-docs'
  import { Algolia } from '@svelteness/kit-docs/client/algolia'
  import ConnectWalletButton from '$lib/components/ConnectWalletButton.svelte'

  import IconBN from '$lib/components/icons/blocknative.svelte'

  /** @type {import('@svelteness/kit-docs').MarkdownMeta | null} */
  export let meta = null

  /** @type {import('@svelteness/kit-docs').ResolvedSidebarConfig | null} */
  export let sidebar = null

  /** @type {import('@svelteness/kit-docs').NavbarConfig} */
  const navbar = {
    links: [
      { title: 'Documentation', slug: '/docs', match: /\/docs/ },
      { title: 'Examples', slug: '/examples', match: /\/examples/ },
      { title: 'FAQ', slug: '/faq', match: /\/faq/ },
      { title: 'Blog', slug: 'https://www.blocknative.com/blog/tag/web3-onboard' }
    ]
  }

  const { activeCategory } = createSidebarContext(sidebar)

  $: category = $activeCategory ? `${$activeCategory}: ` : ''
  $: title = meta ? `${category}${meta.title} | Web3-Onboard` : null
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
  <KitDocsLayout {navbar} {sidebar} search>
    <div slot="navbar-left">
      <a class="text-base flex items-center" href="/">
        <IconBN />
        <span class="ml-4">{'Web3-Onboard'}</span>
      </a>
    </div>
    <Algolia
      apiKey="1bce9c4755cea3698e16830544503ee2"
      appId="02BH13PRRI"
      indexName="blocknative"
      placeholder="Search documentation"
      slot="search"
    />
    <div slot="navbar-right-alt">
      <div class="flex items-center">
        <ConnectWalletButton />
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
