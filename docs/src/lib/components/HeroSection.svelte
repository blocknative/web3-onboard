<script>
  import heroBg from './svg/hero-bg.svg';
  import heroImg from './svg/hero-img.svg';

  import CodeBlock from './CodeBlock.svelte';

  import Flexbox from './Flexbox.svelte';
  import Button from './Button.svelte';
</script>

<section style="background-image: url({heroBg});">
  <div class="textblock">
    <div class="title">
      Web3-Onboard
    </div>
    <div class="text">
      Open-source, framework-agnostic JavaScript library to onboard users to web3 apps. Help your users transact with ease by enabling wallet connection, real-time transaction states, and more.
    </div>
    <div>
      <CodeBlock>
        {"npm i @web3-onboard/core @web3-onboard/injected-wallets"}
      </CodeBlock>
    </div>
    <Flexbox --gap="1.5rem" --direction="row" --wrap="wrap">
      <Button>Get Started</Button>
      <Button label={'View Docs'} />
    </Flexbox>
  </div>

  <img src={heroImg} alt="">
</section>

<style>
  section {
    position: relative;
    max-width: 100%;
    /* height: auto; */
    /* width: 1440px; */
    min-height: 1140px;
    padding: 2rem;
    padding-top: 80px;

    background: radial-gradient(50% 50% at 50% 50%, rgba(0, 216, 255, 0.02) 0%, rgba(0, 0, 0, 0.2) 100%), #060D20;
    background-size: cover;
    background-repeat: no-repeat;

    display: flex;
    flex-flow: column;
    align-items: center;
    /* justify-content: center; */
  }

  img {
    position: absolute;
    bottom: 0;
    display: block;
    margin: 0 auto;
    width: 100%;
    max-width: 1243px;
  }

  .textblock {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 32px;

    width: 100%;
    max-width: 760px;
    margin: 32px;
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
