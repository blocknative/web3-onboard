<script>
  import { styles } from "../stores";
  export let iconSrc;
  export let iconSrcSet = null;
  export let text;
</script>

<style>
  /* .bn-onboard-icon-display */
  button {
    display: flex;
    align-items: center;
    border: none;
    margin: 0;
    background: inherit;
    padding: 0;
    width: 18rem;
    transition: box-shadow 150ms ease-in-out, background 200ms ease-in-out;
    border-radius: 40px;
    color: inherit;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
  }

  img {
    width: auto;
    height: 100%;
  }

  span {
    margin-left: 0.66rem;
    font-weight: bold;
    opacity: 0.7;
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
  class="bn-onboard-icon-display"
  class:bn-onboard-dark-mode-background={$styles.darkMode}>
  <div>
    <img src={iconSrc} srcset={iconSrcSet} alt={text} />
  </div>
  <span>{text}</span>
</button>
