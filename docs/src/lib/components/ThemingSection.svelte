<script>
  import Container from './Container.svelte'
  import TextBlock from './TextBlock.svelte'
  import CodeBlock from './CodeBlock.svelte'

  import ThemeCode from './svg/ThemeCode.svelte'
  import ThemeCarousel from './svg/ThemeCarousel.svelte'

  let examplecode = `:root {
  /* COLORS */
  --account-select-modal-white: white;
  --account-select-modal-black: black;
  --account-select-modal-primary-100: #eff1fc;
  --account-select-modal-primary-200: #d0d4f7;
  --account-select-modal-primary-300: #b1b8f2;
  --account-select-modal-primary-500: #6370e5;
  --account-select-modal-primary-600: #454ea0;
  --account-select-modal-gray-100: #ebebed;
  --account-select-modal-gray-200: #c2c4c9;
  --account-select-modal-gray-300: #999ca5;
  --account-select-modal-gray-500: #33394b;
  --account-select-modal-gray-700: #1a1d26;
  --account-select-modal-danger-500: #ff4f4f;
}`
</script>

<section>
  <Container>
    <div class="flexbox">
      <TextBlock
        title={'Themeable'}
        subtitle={'Powerfull customization options for all your needs'}
        text={'Style web3-onboard to fit into your existing designs, or pick from our pre-made themes.'}
      />
      <div class="code-box">
        <CodeBlock>{examplecode}</CodeBlock>
      </div>
    </div>
  </Container>
  <div class="scroll-container">
    <ThemeCarousel />
  </div>
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

  /* section pre {
    max-height: 20rem;
  } */

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
      /* display: flex; */
      flex-direction: row;
      /* align-items: flex-start; */
    }
  }

  .scroll-container {
    overflow-x: scroll;
    width: 100%;
    padding: 0 2rem;
  }
</style>
