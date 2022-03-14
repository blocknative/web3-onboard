<script>
  export let description = ''
  export let size = '2rem'
</script>

<style>
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    margin: auto;
  }

  span {
    font-family: inherit;
    font-size: 0.889em;
    margin-top: 1rem;
  }

  .loading {
    display: inline-block;
    position: relative;
  }

  .loading div {
    box-sizing: border-box;
    font-size: inherit;
    display: block;
    position: absolute;
    border: 3px solid;
    border-radius: 50%;
    animation: bn-loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: currentColor transparent transparent transparent;
  }

  .loading .loading-first {
    animation-delay: -0.45s;
  }

  .loading .loading-second {
    animation-delay: -0.3s;
  }

  .loading .loading-third {
    animation-delay: -0.15s;
  }

  @keyframes bn-loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<div class="loading-container">
  <div class="loading" style={`height: ${size}; width: ${size};`}>
    <div class="loading-first" style={`height: ${size}; width: ${size};`} />
    <div class="loading-second" style={`height: ${size}; width: ${size};`} />
    <div class="loading-third" style={`height: ${size}; width: ${size};`} />
  </div>
  {#if description}<span>{description}</span>{/if}
</div>
