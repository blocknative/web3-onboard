<script lang="ts">
  import { fade } from 'svelte/transition'
  import { isSVG } from '../../utils'
  import Spinner from './Spinner.svelte'
  export let size: number // px
  export let icon: Promise<string> | string // svg string or url string
  export let loading = false
  export let padding = size / 6

  export let border:
    | 'yellow'
    | 'gray'
    | 'green'
    | 'darkGreen'
    | 'blue'
    | 'darkBlue'
    | 'none' = 'blue'

  export let background:
    | 'gray'
    | 'lightGray'
    | 'lightBlue'
    | 'green'
    | 'white'
    | 'transparent'
    | 'custom' = 'white'

  export let customBackgroundColor = ''
  export let backgroundOpaque = false
</script>

<style>
  .icon-container {
    position: relative;
    border-radius: 12px;
    box-sizing: border-box;
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .border-yellow {
    border: 1px solid var(--onboard-warning-500, var(--warning-500));
  }

  .border-gray {
    border: 1px solid var(--onboard-gray-300, var(--gray-300));
  }

  .border-green {
    border: 1px solid var(--onboard-success-500, var(--success-500));
  }

  .border-dark-green {
    border: 1px solid var(--onboard-success-700, var(--success-700));
  }

  .border-blue {
    border: 1px solid
      var(
        --onboard-wallet-app-icon-border-color,
        var(--onboard-primary-300, var(--primary-300))
      );
  }

  .border-dark-blue {
    border: 1px solid
      var(
        --onboard-wallet-app-icon-border-color,
        var(--onboard-primary-600, var(--primary-600))
      );
  }

  .background-gray {
    background: var(--onboard-gray-500, var(--gray-500));
  }

  .background-light-gray {
    background: var(--onboard-gray-100, var(--gray-100));
  }

  .background-light-blue {
    background: var(--onboard-primary-100, var(--primary-100));
  }

  .background-green {
    background: var(--onboard-success-100, var(--success-100));
  }

  .background-white {
    background: var(--onboard-white, var(--white));
  }

  .background-transparent {
    background: transparent;
  }

  @keyframes pulse {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .placeholder-icon {
    width: 100%;
    height: 100%;
    background: var(--onboard-gray-100, var(--gray-100));
    border-radius: 32px;
    animation: pulse infinite 750ms alternate ease-in-out;
  }

  .spinner-container {
    color: var(--onboard-primary-300, var(--primary-300));
  }

  img {
    max-width: 100%;
    height: auto;
  }
</style>

<div
  class:opaque={backgroundOpaque}
  class:border-yellow={border === 'yellow'}
  class:border-gray={border === 'gray'}
  class:border-green={border === 'green'}
  class:border-dark-green={border === 'darkGreen'}
  class:border-blue={border === 'blue'}
  class:border-dark-blue={border === 'darkBlue'}
  class:background-gray={background === 'gray'}
  class:background-light-gray={background === 'lightGray'}
  class:background-light-blue={background === 'lightBlue'}
  class:background-green={background === 'green'}
  class:background-white={background === 'white'}
  class:background-transparent={background === 'transparent'}
  class="icon-container"
  style={`${background === 'custom' ? customBackgroundColor : ''}; padding: ${
    padding - 1
  }px; width: ${size}px; height: ${size}px;`}
>
  {#if loading}
    <div class="spinner-container">
      <Spinner size="2rem" />
    </div>
  {:else}
    {#await icon}
      <div class="placeholder-icon" />
    {:then iconLoaded}
      <div in:fade class="icon">
        {#if isSVG(iconLoaded)}
          <!-- render svg string -->
          {@html iconLoaded}
        {:else}
          <!-- load img url -->
          <img src={iconLoaded} alt="logo" />
        {/if}
      </div>
    {/await}
  {/if}
  <slot name="status" />
</div>
