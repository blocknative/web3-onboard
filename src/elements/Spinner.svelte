<style>
  :global(.bn-onboard-loading) {
    display: inline-block;
    position: relative;
    width: 2em;
    height: 2em;
  }
  :global(.bn-onboard-loading) :global(div) {
    box-sizing: border-box;
    font-size: inherit;
    display: block;
    position: absolute;
    width: 2em;
    height: 2em;
    border: 3px solid;
    border-radius: 50%;
    animation: bn-onboard-loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: currentColor transparent transparent transparent;
  }
  :global(.bn-onboard-loading) :global(.bn-onboard-loading-first) {
    animation-delay: -0.45s;
  }
  :global(.bn-onboard-loading) :global(.bn-onboard-loading-second) {
    animation-delay: -0.3s;
  }
  :global(.bn-onboard-loading) :global(.bn-onboard-loading-third) {
    animation-delay: -0.15s;
  }
  @keyframes -global-bn-onboard-loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<div class="bn-onboard-custom bn-onboard-loading">
  <div class="bn-onboard-loading-first" />
  <div class="bn-onboard-loading-second" />
  <div class="bn-onboard-loading-third" />
</div>
