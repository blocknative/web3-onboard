<script>
  // import Container from './Container.svelte';
  import PoweredByBadge from './svg/PoweredByBadge.svelte'
  import SocialIcons from './svg/social-icons.svelte'
  import IconGithub from './icons/github.svelte'

  let text = {
    license: 'Released under the MIT License.',
    copyright: 'Copyright © 2022'
  }
</script>

<footer>
  <div class="flexbox link-box">
    <div>
      <a href="#!">
        Github
        <IconGithub />
      </a>
      <a href="#!">Discord</a>
      <a href="#!">Twitter</a>
    </div>
    <SocialIcons />
    <a href="#!"><PoweredByBadge /></a>
  </div>
  <div class="flexbox copyright-box">
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

  .link-box {
    flex: 1;
    gap: 4rem;
  }

  .copyright-box {
    /* grey/600 */
    background: #242835;
    /*
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem 2rem; */
  }

  .flexbox {
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
</style>
