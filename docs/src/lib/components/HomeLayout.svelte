<script>
  import NavBar from './NavBar.svelte'
  import Footer from './Footer.svelte'
  import HeroSection from './HeroSection.svelte'
  import FeaturesSection from './FeaturesSection.svelte'
  import ThemingSection from './ThemingSection.svelte'
  import TestimonialSection from './TestimonialSection.svelte'
  import GettingStarted from './GettingStarted.svelte'
</script>

<div class="layout-container">
  <!-- <NavBar /> -->
  <div class="body">
    <HeroSection />
    <FeaturesSection />
    <ThemingSection />
    <TestimonialSection />
    <GettingStarted />
  </div>
  <Footer />
</div>

<style>
  .layout-container {
    --text-color: #fff;
    --background-color: #000;

    display: flex;
    flex-flow: column;

    /* height: auto; */
    /* min-height: 100vh; */

    color: var(--text-color);
    background-color: var(--background-color);
  }

  .body {
    flex: 1 1 auto;
    overflow: hidden;
  }

  /* nav, footer {
    flex: 0 0 auto;
  } */

  :global(html, body) {
    margin: 0;
    padding: 0;
  }

  :global(a) {
    /* blue/400 */
    color: #929bed;
  }
</style>
