<script>
  import '../app.css'
  import '@docsearch/css' // Must come first.
  import '@svelteness/kit-docs/client/polyfills/index.js'
  import '@svelteness/kit-docs/client/styles/normalize.css'
  import '@svelteness/kit-docs/client/styles/theme.css'
  import '$lib/styles/fonts.css'
  import '$lib/styles/kit-docs.css'
  import '$lib/styles/docsearch.css'
  import { Algolia } from '@svelteness/kit-docs/client/algolia'

  import { page } from '$app/stores'

  import { KitDocs, KitDocsLayout, createSidebarContext, SocialLink } from '@svelteness/kit-docs'
  import ConnectWalletButton from '$lib/components/ConnectWalletButton.svelte'
  import SEO from '$lib/components/SEO/index.svelte'

  import IconBN from '$lib/components/icons/blocknative.svelte'

  /** @type {import('./$types').LayoutData} */
  export let data

  $: ({ meta, sidebar } = data)

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

  const title = 'Web3-Onboard | Framework-agnostic Web3 Connect Wallet Button'
  const metadescription =
    'Open-source, framework-agnostic JavaScript library to onboard users to web3 apps. Help your users transact with ease by enabling wallet connection, real-time transaction states, and more.'
  const url = 'https://onboard.blocknative.com/'
</script>

<svelte:head>
  {#key $page.url.pathname}
    {#if title}
      <title>{title}</title>
    {/if}
    {#if metadescription}
      <meta name="description" content={metadescription} />
    {/if}
  {/key}
</svelte:head>

<SEO {title} {metadescription} {url} />

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
        <SocialLink type="gitHub" href="//github.com/blocknative/web3-onboard" class="socialIcon" />
        <SocialLink type="discord" href="//discord.com/invite/KZaBVME" class="socialIcon" />
      </div>
    </div>

    <slot />
  </KitDocsLayout>
</KitDocs>

<style>
  :global(:root) {
    --kd-color-brand-rgb: 99, 112, 229;
    --kd-font-family-sans: 'Sofia Pro';
    --account-center-position-top: 5rem;
  }

  :global(a) {
    /* blue/400 */
    color: #929bed;
  }
</style>
