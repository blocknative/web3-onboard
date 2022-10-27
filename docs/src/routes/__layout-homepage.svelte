<script context="module">
  export const prerender = true
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

  import { KitDocs, KitDocsLayout, SocialLink } from '@svelteness/kit-docs'
  import IconBN from '$lib/components/icons/blocknative.svelte'
  import SEO from '$lib/components/SEO/index.svelte'
  import { Algolia } from '@svelteness/kit-docs/client/algolia'

  /** @type {import('@svelteness/kit-docs').NavbarConfig} */
  const navbar = {
    links: [
      { title: 'Documentation', slug: '/docs', match: /\/docs/ },
      { title: 'Examples', slug: '/examples', match: /\/examples/ },
      { title: 'FAQ', slug: '/faq', match: /\/faq/ },
      { title: 'Blog', slug: 'https://www.blocknative.com/blog/tag/web3-onboard' }
    ]
  }

  const title = 'Web3-Onboard | The easy way to connect web3 users to dapps'
  const metadescription =
    'Open-source, framework-agnostic JavaScript library to onboard users to web3 apps. Help your users transact with ease by enabling wallet connection, real-time transaction states, and more.'
  const url = 'https://onboard.blocknative.com/'
</script>

<svelte:head>
  {#if title}
    <title>{title}</title>
  {/if}
  {#if metadescription}
    <meta name="description" content={metadescription} />
  {/if}
</svelte:head>

<SEO {title} {metadescription} {url} />

<KitDocs>
  <KitDocsLayout {navbar} --kd-content-max-width={'100%'} search>
    <div slot="navbar-left">
      <a href="/">
        <IconBN />
      </a>
    </div>
    <Algolia
      apiKey="1bce9c4755cea3698e16830544503ee2"
      appId="02BH13PRRI"
      indexName="dev_blocknative"
      placeholder="Search documentation"
      slot="search"
    />
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
