<script>
  import OpenGraph from './OpenGraph.svelte';
  import Twitter from './Twitter.svelte';

  export let metadescription;
  export let title;
  export let url;

  export let image = {
    url: 'https://onboard.blocknative.com/blocknative-onboard-og-image.png',
    alt: 'Web3-Onboard Connect Wallet Button'
  }

  const twitterProps = {
    image,
    metadescription,
    pageTitle: title,
    url
  }

  const openGraphProps = {
    siteTitle: title,
    ogLanguage: 'en_us',
    image,
    metadescription,
    pageTitle: title,
    url
  }
</script>

<Twitter {...twitterProps} />
<OpenGraph {...openGraphProps} />
