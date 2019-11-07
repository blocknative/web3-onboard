<style>
  .bn-onboard-loading {
    display: inline-block;
    position: relative;
    width: 2em;
    height: 2em;
  }
  .bn-onboard-loading div {
    box-sizing: border-box;
    font-size: inherit;
    display: block;
    position: absolute;
    width: 2em;
    height: 2em;
    border: 3px solid #4a90e2;
    border-radius: 50%;
    animation: bn-onboard-loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #4a90e2 transparent transparent transparent;
  }
  .bn-onboard-loading div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .bn-onboard-loading div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .bn-onboard-loading div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes bn-onboard-loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<div class="bn-onboard-custom bn-onboard-loading">
  <div />
  <div />
  <div />
  <div />
</div>
