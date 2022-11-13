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

    <div class="tos-section w-full flex flex-col text-center justify-between border-t border-t-gray-divider py-6">
      <div class="flex flex-col copyright">
        <div class="text-gray-300 text-sm mr-1">{text.copyright}</div>
        <div class="text-gray-300 text-sm ">{text.license}</div>
      </div>
      <div class="privacy flex justify-center items-center mt-4 ">
        <a
          target="_blank"
          href="https://www.blocknative.com/privacy-policy"
          class="text-gray-300 text-sm cursor-pointer hover:text-white">Privacy Policy</a
        >
        <div class="w-px bg-gray-divider mx-2 h-4" />
        <a
          target="_blank"
          href="https://www.blocknative.com/terms-conditions"
          class="text-gray-300 text-sm cursor-pointer hover:text-white">Terms of Service</a
        >
      </div>
    </div>
  </Flexbox>
</footer>

<style>
  footer {
    background: #1a1d26;
    min-height: 350px;
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

  @media screen and (min-width: 1024px) {
    .copyright {
      flex-flow: row nowrap;
    }
    .tos-section {
      flex-flow: row nowrap;
    }
    .privacy {
      margin: 0;
    }
  }
</style>
