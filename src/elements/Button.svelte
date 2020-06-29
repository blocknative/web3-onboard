<script lang="ts">
  import { app } from '../stores'
  export let onclick: () => void = () => {}
  export let position: string
</script>

<style>
  button {
    background: inherit;
    font-size: 0.889em;
    font-family: inherit;
    border: 1px solid #4a90e2;
    border-radius: 40px;
    padding: 0.55em 1.4em;
    cursor: pointer;
    color: #4a90e2;
    font-family: inherit;
    transition: background 150ms ease-in-out;
    line-height: 1.15;
  }

  button:focus {
    outline: none;
  }
  button:hover {
    background: #ecf3fc;
  }

  .bn-onboard-prepare-button-right {
    position: absolute;
    right: 0;
  }

  .bn-onboard-prepare-button-left {
    position: absolute;
    left: 0;
  }
</style>

<button
  on:click={onclick}
  class="bn-onboard-custom bn-onboard-prepare-button"
  class:bn-onboard-prepare-button-right={position === 'right'}
  class:bn-onboard-prepare-button-left={position === 'left'}
  class:bn-onboard-prepare-button-center={position !== 'left' && position !== 'right'}
  class:bn-onboard-dark-mode-link={$app.darkMode}
  class:bn-onboard-dark-mode-background-hover={$app.darkMode}>
  <slot />
</button>
