<script>
  // import Container from './Container.svelte';
  import TextBlock from './TextBlock.svelte'

  import TestimonialsGroup from './svg/testimonials-group.svelte'
</script>

<section>
  <div class="flexbox">
    <TextBlock title={"Who's using web3-onboard?"} subtitle={''} text={''} />
  </div>
  <div class="scroll-container">
    <TestimonialsGroup />
  </div>
</section>

<style>
  section {
    /* min-height: 500px; */
    background: radial-gradient(88.3% 88.3% at 50% 0%, rgba(255, 255, 255, 0.6) 0%, #d1d5f8 100%),
      #d0d4f7;
    /* grey/200 */
    /* border: 1px solid #C2C4C9; */
    color: black;
    text-align: center;
  }

  .scroll-container {
    overflow-x: scroll;
  }

  .flexbox {
    display: flex;
    flex-flow: column;
    gap: 2rem;
    padding: 5rem 2rem;

    align-items: center;
    /* justify-content: center; */
  }
</style>
