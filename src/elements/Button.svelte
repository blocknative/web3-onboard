<script lang="ts">
  import { app } from "../stores";
  export let highlight: boolean = false;
  export let onclick: () => void = () => {};
</script>

<style>
  button {
    background: inherit;
    font-size: 0.889em;
    border: 1px solid #4a90e2;
    border-radius: 40px;
    padding: 0.55em 1.4em;
    margin-top: 0.33em;
    cursor: pointer;
    color: #4a90e2;
    font-family: "Helvetica Neue";
    transition: background 150ms ease-in-out;
    line-height: 1.15;
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
  class:bn-onboard-dark-mode-link={$app.darkMode}
  class:bn-onboard-dark-mode-background-hover={$app.darkMode}>
  <slot />
</button>
