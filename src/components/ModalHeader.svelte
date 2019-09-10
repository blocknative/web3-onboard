<script>
  import { configuration } from "../stores";
  export let heading;
  export let icon;
</script>

<style>
  /* .bn-onboard-modal-header */
  header {
    display: flex;
    align-items: center;
    margin-bottom: 0.66rem;
  }

  /* .bn-onboard-modal-content-header-icon */
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.6rem;
    border-radius: 30px;
    background: #eeeeee;
  }

  /* .bn-onboard-modal-content-header-heading */
  h3 {
    font-weight: bold;
    font-size: 1.33rem;
    margin: 0 0 0 0.5rem;
  }
</style>

<header class="bn-onboard-custom bn-onboard-modal-content-header">
  <div
    class:bn-onboard-dark-mode-background={$configuration.darkMode}
    class="bn-onboard-custom bn-onboard-modal-content-header-icon">
    {@html icon}
  </div>
  <h3 class="bn-onboard-custom bn-onboard-modal-content-header-heading">
    {heading}
  </h3>
</header>
