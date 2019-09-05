<script>
  import { configuration } from "../stores";
  export let iconSrc;
  export let iconSrcSet = null;
  export let onclick = null;
  export let text;
</script>

<style>
  /* .bn-onboard-icon-button */
  button {
    display: flex;
    align-items: center;
    border: none;
    margin: 0.33rem 0;
    background: inherit;
    width: 18rem;
    padding: 0.625rem 1.25rem;
    transition: box-shadow 150ms ease-in-out, background 200ms ease-in-out;
    border-radius: 40px;
    cursor: pointer;
    color: inherit;
  }

  button:hover {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }

  button:focus {
    outline: none;
  }

  div {
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 40px;
    width: 40px;
    line-height: 40px;
  }

  img {
    max-height: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  span {
    margin-left: 0.66rem;
    font-weight: bold;
    font-size: 1rem;
    text-align: left;
  }

  @media only screen and (max-width: 700px) {
    button {
      width: 100%;
    }
  }
</style>

<button
  on:click={onclick}
  class="bn-onboard-custom bn-onboard-icon-button"
  class:bn-onboard-dark-mode-background-hover={$configuration.darkMode}>
  <div>
    <img src={iconSrc} srcset={iconSrcSet} alt={text} />
  </div>
  <span>{text}</span>
</button>
