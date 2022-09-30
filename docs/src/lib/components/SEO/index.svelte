<script>
  import OpenGraph from './OpenGraph.svelte';
  import Twitter from './Twitter.svelte';
  import MetaImage from '$lib/assets/blocknative-onboard-og-image.png'

  export let metadescription;
  export let title;
  export let url;

  export let image = {
    url: MetaImage,
    alt: 'Web3-Onboard Connect Wallet Button'
  }

  console.log(MetaImage)

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
