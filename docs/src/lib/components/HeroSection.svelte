<script>
  import Button from './base/Button.svelte'
  import Flexbox from './base/Flexbox.svelte'
  import CodeBlock from './base/CodeBlock.svelte'

  import heroBg from './svg/hero-bg.svg'
  import heroImg from './svg/hero-img.svg'
</script>

<section style="background-image: url({heroBg});">
  <div class="textblock">
    <div class="title">{"Web3-Onboard"}</div>
    <div class="text">
      {"Open-source, framework-agnostic JavaScript library to onboard users to web3 apps. Help your users transact with ease by enabling wallet connection, real-time transaction states, and more."}
    </div>
    <div>
      <CodeBlock>
        {'npm i @web3-onboard/core @web3-onboard/injected-wallets'}
      </CodeBlock>
    </div>
    <Flexbox --gap="1.5rem" --direction="row" --wrap="wrap">
      <Button href="#get-started" label={'Get Started'} />
      <Button href="/docs" label={'View Docs'} />
    </Flexbox>
  </div>
  <img src={heroImg} alt="onboard connect wallet" />
</section>

<style>
  section {
    position: relative;
    max-width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    background: radial-gradient(
        50% 50% at 50% 50%,
        rgba(0, 216, 255, 0.02) 0%,
        rgba(0, 0, 0, 0.2) 100%
      ),
      #060d20;
    background-size: cover;
    background-repeat: no-repeat;
  }

  img {
    position: relative;
    display: block;
    margin: 0 auto;
    padding: 0 1rem;
    width: 100%;
    max-width: 1240px;
  }

  .textblock {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 32px;

    width: 100%;
    max-width: 760px;
    padding: 5rem 2rem 4rem;
  }

  .textblock > div {
    width: 100%;
  }

  .title {
    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 800;
    font-size: 48px;
    line-height: 64px;
  }
  .text {
    /* F3 */
    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
  }
</style>
