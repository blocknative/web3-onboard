<script>
  export let iconSrc;
  export let iconSrcSet = null;
  export let onclick = null;
  export let text;
</script>

<style>
  .bn-icon-button {
    display: flex;
    align-items: center;
    border: none;
    background: #ffffff;
    margin: 0.33rem 0;
    padding: 0;
    width: 18rem;
  }

  .bn-clickable {
    padding: 0.66rem 1rem;
    transition: box-shadow 150ms ease-in-out;
    border-radius: 40px;
  }

  .bn-clickable:hover {
    cursor: pointer;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }

  .bn-icon-button div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
  }

  .bn-icon-button div img {
    width: auto;
    height: 100%;
  }

  .bn-icon-button span {
    margin-left: 0.66rem;
    font-weight: bold;
    color: #727272;
    font-size: 1rem;
    text-align: left;
  }

  @media only screen and (max-width: 700px) {
    .bn-icon-button {
      width: 100%;
    }

    .bn-clickable {
      background: #f9f9f9;
    }
  }
</style>

<button on:click={onclick} class:bn-clickable={onclick} class="bn-icon-button">
  <div>
    <img src={iconSrc} srcset={iconSrcSet} alt={text} />
  </div>
  <span>{text}</span>
</button>
