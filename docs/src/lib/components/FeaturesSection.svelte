<script>
  import Button from './base/Button.svelte'
  import Flexbox from './base/Flexbox.svelte'
  import CodeBlock from './base/CodeBlock.svelte'
  import ScrollContainer from './base/ScrollContainer.svelte'
  import Container from './Container.svelte'
  import TextBlock from './TextBlock.svelte'
  import FeatureCard from './FeatureCard.svelte'

  import FigFrameworksGroup from './svg/frameworks-group.svelte'
  import NetworksGraphic from './svg/networks-group.svelte'
  import WalletsGraphic from './svg/wallets-group.svelte'
  import NotifyGraphic from './svg/notify-group.svelte'
  import AccountCenterGraphic from './svg/account-center-group.svelte'
</script>

<section class="features-a">
  <Container>
    <div class="flexbox">
      <TextBlock
        title={'Framework Agnostic'}
        subtitle={'Support all your favorite frameworks.'}
        text={'Use web3-onboard with any of your favorite Javascript libraries.'}
      >
        <Flexbox>
          <Button href="#!" buttonStyle={"link"}>{"Learn More"}</Button>
          <Button href="#!" buttonStyle={"link"}>{"View Demo"}</Button>
        </Flexbox>
      </TextBlock>
      <Flexbox --direction="column" --gap="3rem" >
        <CodeBlock>
          {'npm i @web3-onboard/core @web3-onboard/injected-wallets'}
        </CodeBlock>
        <FigFrameworksGroup />
      </Flexbox>
    </div>
  </Container>
</section>

<section class="features-b">
  <Container>
    <div class="flexbox">
      <FeatureCard
        title={'Minimal Dependencies'}
        text={'All wallet dependencies are included in separate packages, so you only include the ones you want to use in your app.'}
      />
      <FeatureCard
        title={'Dynamic Imports'}
        text={"Supporting multiple wallets in your app requires a lot of dependencies. Onboard dynamically imports a wallet and it's dependencies only when the user selects it, so that minimal bandwidth is used."}
      />
      <FeatureCard
        title={'Wallet Provider Standardization'}
        text={'All wallet modules expose a provider that is patched to be compliant with the EIP-1193, EIP-1102, EIP-3085 and EIP-3326 specifications.'}
      />
      <FeatureCard
        title={'Multiple Chain Support'}
        text={'Allow users to switch between chains/networks with ease.'}
      />
    </div>
  </Container>
</section>

<!-- Features Section -->
<section class="features-c">
  <Container>
    <div class="flexbox" style:padding={'4rem 1rem'}>
      <TextBlock
        title={'Enable Multi-Wallet and Multi-Chain functionality with one library '}
        subtitle={''}
        text={'Web3-Onboard is the quickest and easiest way to add multi-wallet and multi-chain support to your project. With built-in modules for more than 35 unique hardware and software wallets, Web3-Onboard saves you time and headaches.'}
      />
      <NetworksGraphic />
    </div>
  </Container>
  <ScrollContainer>
    <WalletsGraphic />
  </ScrollContainer>
  <Container>
    <div class="flexbox" style:padding={'4rem 1rem'}>
      <TextBlock
        title={'Real-time transaction notifications'}
        subtitle={''}
        text={'Real-time transaction notifications for all connected wallet addresses and all transaction states.'}
      />
      <NotifyGraphic />
    </div>
  </Container>
  <Container>
    <div class="flexbox" style:gap={'4rem'} style:padding={'2rem'}>
      <AccountCenterGraphic />
      <div>
        <div>
          <TextBlock
            title={'Account Center'}
            subtitle={'Multiple Wallets and Accounts Connection:'}
            text={'Allow your users to connect multiple wallets and multiple accounts within each wallet at the same time to your dapp.'}
          />
          <CodeBlock>
            {'npm i @web3-onboard/core @web3-onboard/injected-wallets'}
          </CodeBlock>
        </div>
      </div>
    </div>
  </Container>
</section>

<style>
  .features-a {
    padding: 3rem;
    /* height: 328px; */
    background: conic-gradient(
        from 195.62deg at 100% 0%,
        rgba(85, 204, 254, 0.1) 0deg,
        rgba(0, 0, 0, 0) 360deg
      ),
      #060d20;
  }
  .features-a .flexbox {
    /* gap: 2rem; */
    padding: 0;
  }

  .features-b {
    padding: 2rem;
    /* gap: 16px; */
    height: auto;
    /* min-height: 288px; */
    background: linear-gradient(87.71deg, rgba(0, 0, 0, 0) 0%, rgba(0, 209, 255, 0.02) 100%),
      #060d20;
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0px -8px 16px rgba(0, 0, 0, 0.2);
  }
  .features-b .flexbox {
    display: flex;
    flex-flow: column wrap;
    gap: 1rem;
    padding: 0;
    align-items: stretch;
  }

  @media screen and (min-width: 1024px) {
    .features-b .flexbox {
      flex-flow: row nowrap;
    }
  }

  .features-c {
    /* width: 1440px; */
    /* height: 1698px; */
    /* min-height: 1698px; */
    background: radial-gradient(
        93.49% 93.49% at 50% 93.49%,
        rgba(20, 29, 107, 0.25) 0%,
        rgba(53, 60, 123, 0.125) 66.67%,
        rgba(0, 0, 0, 0) 100%
      ),
      #15171e;
  }

  .flexbox {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
    padding: 2rem;
  }
  .flexbox > div {
    min-width: 50%;
    max-width: 100%;
    /* display: flex; */
  }

  @media screen and (min-width: 640px) {
    .flexbox {
      /* display: flex; */
      flex-direction: row;
      /* align-items: center; */
      /* gap: 4rem; */
      /* padding: 2rem; */
    }
  }


</style>
