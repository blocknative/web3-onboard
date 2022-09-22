<script lang="ts">
  export let onclick: () => void = () => {}
  export let position = ''
  export let disabled = false
  // If this is a CTA Button then we want to emphasize it
  export let cta = true
</script>

<style>
  button {
    outline: none;
    background: inherit;
    font-size: 0.889em;
    font-family: inherit;
    padding: 0.55em 1.4em;
    cursor: pointer;
    color: #4a90e2;
    font-family: inherit;
    transition: background 150ms ease-in-out;
    line-height: 1.15;
    opacity: 1;
    transition: opacity 200ms;
  }
  button:focus {
    outline: none;
  }
  .bn-onboard-prepare-button-right {
    position: absolute;
    right: 0;
  }
  .bn-onboard-prepare-button-left {
    position: absolute;
    left: 0;
  }
  .disabled {
    cursor: inherit;
    pointer-events: none;
    opacity: 0.4;
  }
  .cta {
    outline: 1px solid #4a90e2;
    border-radius: 40px;
  }
  .cta:hover {
    background: #ecf3fc;
  }
</style>

<button
  on:click={onclick}
  {disabled}
  class:disabled
  class:cta
  class="bn-onboard-custom bn-onboard-prepare-button"
  class:bn-onboard-prepare-button-right={position === 'right'}
  class:bn-onboard-prepare-button-left={position === 'left'}
  class:bn-onboard-prepare-button-center={position !== 'left' &&
    position !== 'right'}
>
  <slot />
</button>
