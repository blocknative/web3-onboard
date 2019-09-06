<script>
  import { configuration } from "../stores";
  export let highlight = false;
  export let onclick = null;
</script>

<style>
  button {
    background: inherit;
    font-size: 0.889rem;
    border: 1px solid #4a90e2;
    border-radius: 40px;
    padding: 0.55rem 1.4rem;
    margin-top: 0.33rem;
    cursor: pointer;
    color: #4a90e2;
    transition: background 150ms ease-in-out;
  }

  button:focus {
    outline: none;
  }
  button:hover {
    background: #ecf3fc;
  }
</style>

<button
  on:click={onclick}
  class="bn-onboard-custom bn-onboard-button"
  class:bn-onboard-dark-mode-link={$configuration.darkMode}
  class:bn-onboard-dark-mode-background-hover={$configuration.darkMode}>
  <slot />
</button>
