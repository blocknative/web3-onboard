<script>
  import Button from './base/Button.svelte'
  import Flexbox from './base/Flexbox.svelte'
  import ScrollContainer from './base/ScrollContainer.svelte'
  import TextBlock from './TextBlock.svelte'
  import Container from './Container.svelte'

  import ThemingCode from './theming-code.md'
  import ThemeCarousel from './svg/themes-carousel.svelte'
</script>

<section>
  <Container>
    <div class="flexbox">
      <TextBlock
        title={'Themeable'}
        subtitle={'Powerfull customization options for all your needs'}
        text={'Style web3-onboard to fit into your existing designs, or pick from our pre-made themes.'}
      >
        <Flexbox --wrap="wrap">
          <Button href="/docs" buttonStyle={'link'}>{'Learn More'}</Button>
          <Button href="/examples/connect-wallet" buttonStyle={'link'}>{'View Demo'}</Button>
        </Flexbox>
      </TextBlock>
      <div class="prose">
        <ThemingCode />
      </div>
    </div>
  </Container>
  <ScrollContainer style={'padding: 0 2rem'}>
    <ThemeCarousel />
  </ScrollContainer>
</section>

<style>
  section {
    /* min-height: 991px; */
    background: radial-gradient(
        137.29% 137.29% at 50% -37.29%,
        rgba(99, 112, 229, 0.5) 0%,
        rgba(53, 60, 123, 0.269089) 49.81%,
        rgba(0, 0, 0, 0) 100%
      ),
      #060d20;

    display: flex;
    flex-flow: column;
    gap: 5rem;
    padding: 5rem 0;

    position: relative;
    overflow: hidden;
  }

  .flexbox {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4rem;
    padding: 0 2rem;
  }

  .flexbox div {
    width: 100%;
    flex: 50%;
  }

  @media screen and (min-width: 1024px) {
    .flexbox {
      flex-direction: row;
    }
  }
</style>
