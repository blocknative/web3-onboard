<script>
  export let label = ''
</script>

<button type="button" style={$$props.style} on:click>
  <slot>
    {label}
  </slot>
</button>

<style>
  button {
    --text-color: #eff1fc;
    --bg-color: #6370e5;

    /* brand/blue */
    background: var(--bg-color);
    color: var(--text-color);

    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: var(--flex, auto);

    border: none;
    border-radius: 4px;
    padding: 1rem 2rem;

    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 16px;
  }

  button:hover {
    /* --text-color: black; */
    --bg-color: #454ea0;
  }

  button:focus {
  }
</style>
