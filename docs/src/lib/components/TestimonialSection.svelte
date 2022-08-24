<script>
  import TestimonialsGraphic from './svg/logos-group.svelte'
</script>

<section>
  <h1 class="text">
    {"Who's using web3-onboard?"}
  </h1>
  <div>
    <TestimonialsGraphic />
  </div>
</section>

<style>
  section {
    background: #1a1d26;
    text-align: center;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
  }

  section > div {
    display: flex;
    max-width: 100%;
  }

  .text {
    /* font-family: Sofia Pro; */
    font-size: 1rem;
    font-weight: 900;
  }

  @media screen and (min-width: 480px) {
    section {
      gap: 4rem;
      padding: 5rem;
    }
    .text {
      font-size: 2.5rem;
      /* font-size: 40px; */
    }
  }
</style>
