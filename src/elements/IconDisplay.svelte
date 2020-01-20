<script lang="ts">
  export let iconSrc: string
  export let iconSrcSet: string
  export let text: string
  export let svg: string
</script>

<style>
  /* .bn-onboard-icon-display */
  div {
    display: flex;
    align-items: center;
    border: none;
    margin: 0;
    font-size: inherit;
    font-family: inherit;
    background: inherit;
    padding: 0;
    width: 18em;
    border-radius: 40px;
    color: inherit;
  }

  img {
    width: auto;
    height: 3em;
  }

  span {
    margin-left: 0.66em;
    font-weight: bold;
    font-size: inherit;
    font-family: inherit;
    opacity: 0.7;
    text-align: left;
  }
</style>

<div class="bn-onboard-custom bn-onboard-icon-display">
  {#if svg}
    {@html svg}
  {:else}
    <img src={iconSrc} srcset={iconSrcSet} alt={text} />
  {/if}
  <span>{text}</span>
</div>
