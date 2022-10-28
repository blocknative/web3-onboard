<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { fly } from 'svelte/transition'
  import { quartOut } from 'svelte/easing'
  // import { configuration } from '../../configuration.js'
  // const { appMetadata } = configuration
  // const { device } = configuration
  import blocknative from '../icons/blocknative.js'
  import en from '../i18n/en.json'


</script>

<style>
  .outer-container {
    background: var(
      --account-center-maximized-upper-background,
      var(--onboard-gray-600, var(--gray-600))
    );
    border-radius: var(
      --account-center-border-radius,
      var(--onboard-border-radius-3, var(--border-radius-3))
    );
    width: 100%;
    filter: drop-shadow(0px 4px 16px rgba(178, 178, 178, 0.2));
    padding: 0 1px 1px 1px;
    pointer-events: auto;
  }

  a {
    font-weight: 700;
  }

  .powered-by-container {
    margin-top: 12px;
  }

  .powered-by {
    color: var(--onboard-gray-400, var(--gray-400));
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
  }
</style>

<div
  in:fly={{
    // delay: position.includes('top') ? 100 : 0,
    duration: 600,
    // y: position.includes('top') ? 56 : -76,
    easing: quartOut,
    opacity: 0
  }}
  class="outer-container"
>
  <a
    href="https://blocknative.com"
    target="_blank"
    rel="noopener noreferrer"
    class="flex justify-center items-center powered-by-container"
  >
    <span class="powered-by"
      >{$_('accountCenter.poweredBy', {
        default: en.poweredBy
      })}</span
    >
    <div class="flex items-center" style="width: 83px; margin-left: 4px;">
      {@html blocknative}
    </div>
  </a>
</div>
