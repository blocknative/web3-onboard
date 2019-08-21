<script>
  export let highlight = false;
  export let onclick = null;
</script>

<style>
  .bn-button {
    background: #ffffff;
    font-size: 0.889rem;
    border: 1px solid #eeeeee;
    border-radius: 40px;
    padding: 0.55rem 1.4rem;
  }

  .bn-button:hover {
    cursor: pointer;
  }

  .bn-secondary-font-color {
    color: #727272;
  }

  .bn-highlight-font-color {
    color: #4a90e2;
  }
</style>

<button
  on:click={onclick}
  class="bn-button bn-secondary-font-color"
  class:bn-highlight-font-color={highlight}>
  <slot />
</button>
