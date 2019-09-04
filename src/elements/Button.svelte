<script>
  export let highlight = false;
  export let onclick = null;
</script>

<style>
  button {
    background: inherit;
    font-size: 0.889rem;
    border: 1px solid #eeeeee;
    border-radius: 40px;
    padding: 0.55rem 1.4rem;
    margin-top: 0.33rem;
    cursor: pointer;
    color: #4a90e2;
  }

  button:focus {
    outline: none;
  }
</style>

<button on:click={onclick} class="bn-onboard-custom bn-onboard-button">
  <slot />
</button>
