<script>
  import { styles } from "../stores";
  export let iconSrc;
  export let iconSrcSet = null;
  export let text;
</script>

<style>
  /* .bn-onboard-icon-display */
  div {
    display: flex;
    align-items: center;
    border: none;
    margin: 0;
    background: inherit;
    padding: 0;
    width: 18rem;
    border-radius: 40px;
    color: inherit;
  }

  img {
    width: auto;
    height: 3rem;
  }

  span {
    margin-left: 0.66rem;
    font-weight: bold;
    opacity: 0.7;
    font-size: 1rem;
    text-align: left;
  }
</style>

<div
  class="bn-onboard-icon-display"
  class:bn-onboard-dark-mode-background={$styles.darkMode}>
  <img src={iconSrc} srcset={iconSrcSet} alt={text} />
  <span>{text}</span>
</div>
