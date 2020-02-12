<script lang="ts">
  import Spinner from './Spinner.svelte'
  import { app } from '../stores'
  export let iconSrc: string
  export let iconSrcSet: string
  export let svg: string
  export let onclick: () => void = () => {}
  export let text: string
  export let loadingWallet: string | undefined
  export let currentlySelected: boolean = false
</script>

<style>
  /* .bn-onboard-icon-button */
  button {
    display: flex;
    align-items: center;
    border: none;
    margin: 0.33em 0;
    background: inherit;
    font-size: inherit;
    width: 18em;
    padding: 0.625em 1.25em;
    transition: box-shadow 150ms ease-in-out, background 200ms ease-in-out;
    border-radius: 40px;
    cursor: pointer;
    color: inherit;
    line-height: 1.15;
    font-family: inherit;
  }

  button:hover {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }

  button:focus {
    outline: none;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 40px;
    width: 40px;
    line-height: 40px;
    font-family: inherit;
  }

  img {
    max-height: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  span {
    font-size: inherit;
    margin-left: 0.66em;
    font-weight: bold;
    text-align: left;
    font-family: inherit;
  }

  i {
    font-size: 1.6rem;
    margin-left: 0.5rem;
  }

  @media only screen and (max-width: 450px) {
    button {
      width: 100%;
    }
  }
</style>

<button
  on:click={onclick}
  class="bn-onboard-custom bn-onboard-icon-button"
  class:bn-onboard-dark-mode-background-hover={$app.darkMode}>
  <div>
    {#if loadingWallet === text}
      <Spinner />
    {:else if svg}
      {@html svg}
    {:else}
      <img src={iconSrc} srcset={iconSrcSet} alt={text} />
    {/if}
  </div>
  <span>{text}</span>
  {#if currentlySelected}
    <i>*</i>
  {/if}
</button>
