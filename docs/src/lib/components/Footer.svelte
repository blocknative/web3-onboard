<script>
  import Flexbox from './base/Flexbox.svelte'
  import PoweredByBn from './svg/powered-by-blocknative.svg'

  import DiscordIcon from '~icons/ri/discord-fill'
  import GitHubIcon from '~icons/ri/github-fill'
  import TwitterIcon from '~icons/ri/twitter-fill'
  import YoutubeIcon from '~icons/ri/youtube-fill'

  export let iconSize = 40

  let text = {
    license: 'Released under the MIT License.',
    copyright: '© 2022 Blocknative. All Rights Reserved.'
  }
</script>

<footer>
  <Flexbox
    --direction="column"
    --justify-content="center"
    --align-items="center"
    --gap="2rem"
    --flex="1"
    --padding="2rem"
  >
    <Flexbox --direction="row" --gap="2rem" --padding="0">
      <a class="icon-link" href="//github.com/blocknative/web3-onboard" target="_blank">
        <GitHubIcon width={iconSize} height={iconSize} />
        <span class="sr-only">Github</span>
      </a>
      <a class="icon-link" href="//discord.com/invite/KZaBVME" target="_blank">
        <DiscordIcon width={iconSize} height={iconSize} />
        <span class="sr-only">Discord</span>
      </a>
      <a class="icon-link" href="//twitter.com/blocknative" target="_blank">
        <TwitterIcon width={iconSize} height={iconSize} />
        <span class="sr-only">Twitter</span>
      </a>
      <a class="icon-link" href="//www.youtube.com/c/Blocknative" target="_blank">
        <YoutubeIcon width={iconSize} height={iconSize} />
        <span class="sr-only">Youtube</span>
      </a>
    </Flexbox>
    <a href="//www.blocknative.com/" target="_blank">
      <img src={PoweredByBn} alt="Powered by Blocknative" />
      <span class="sr-only">Powered by Blocknative</span>
    </a>
  </Flexbox>
  <div class="copyright-box">
    <div class="flex flex-row flex-wrap justify-center">
      <div class="text">{text.license}</div>
      <div class="text">{text.copyright}</div>
    </div>
    <div class="flex">
      <a
        target="_blank"
        href="https://www.blocknative.com/privacy-policy"
        class="text-sm hover:text-white">Privacy Policy</a
      >
      <div class="w-px bg-gray-divider mx-2 h-4" />
      <a
        target="_blank"
        href="https://www.blocknative.com/terms-conditions"
        class="text-sm hover:text-white">Terms of Service</a
      >
    </div>
  </div>
</footer>

<style>
  footer {
    background: #1a1d26;
    min-height: 400px;
    display: flex;
    flex-flow: column;
  }

  a.icon-link {
    color: rgba(255, 255, 255, 0.8);
    transition: transform 200ms ease-in-out;
  }
  a.icon-link:hover {
    color: rgba(255, 255, 255, 1);
    transform: scale(1.2);
  }
  a.icon-link:focus {
    transform: none;
  }

  .copyright-box {
    /* grey/600 */
    background: #242835;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem 2rem;
    gap: 1rem;
  }
  @media screen and (min-width: 1024px) {
    .copyright-box {
      flex-flow: row;
      justify-content: space-between;
      gap: 0.5rem;
    }
  }

  .text {
    /* F6 */
    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    /* grey/300 */
    color: #999ca5;
  }

  /* screen reader class */
  /* can be moved elsewhere */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

</style>
