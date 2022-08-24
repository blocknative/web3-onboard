<script>
  import Flexbox from './base/Flexbox.svelte'
  import PoweredByBadge from './svg/PoweredByBadge.svelte'

  import DiscordIcon from '~icons/ri/discord-fill'
  import GitHubIcon from '~icons/ri/github-fill'
  import TwitterIcon from '~icons/ri/twitter-fill'
  import YoutubeIcon from '~icons/ri/youtube-fill'

  export let iconSize = 40

  let text = {
    license: 'Released under the MIT License.',
    copyright: 'Copyright © 2022'
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
      <PoweredByBadge />
      <span class="sr-only">Powered by Blocknative</span>
    </a>
  </Flexbox>
  <div class="copyright-box">
    <div class="text">{text.license}</div>
    <div class="text">{text.copyright}</div>
  </div>
</footer>

<style>
  footer {
    background: #1a1d26;
    min-height: 400px;

    display: flex;
    flex-flow: column;
  }

  .copyright-box {
    /* grey/600 */
    background: #242835;

    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem 2rem;
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
