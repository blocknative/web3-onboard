<script lang="ts">
  import { fade } from 'svelte/transition'
  import { isSVG } from '../../utils'
  import Spinner from './Spinner.svelte'
  export let size: number // px
  export let icon: Promise<string> | string // svg string or url string
  export let loading = false
  export let padding = size / 6
  export let color: string = 'black'

  export let border:
    | 'yellow'
    | 'gray'
    | 'green'
    | 'darkGreen'
    | 'blue'
    | 'darkBlue'
    | 'transparent'
    | 'black'
    | 'none' = 'transparent'

  export let background:
    | 'gray'
    | 'lightGray'
    | 'lightBlue'
    | 'green'
    | 'white'
    | 'transparent'
    | 'custom' = 'transparent'

  export let customBackgroundColor = ''
  export let radius = 12
</script>

<style>
  .icon {
    height: 100%;
  }

  .border-yellow {
    border: 1px solid var(--onboard-warning-500, var(--warning-500));
  }

  .border-gray {
    border: 1px solid var(--onboard-gray-400, var(--gray-400));
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

  .border-transparent {
    border: 1px solid transparent;
  }

  .border-black {
    border: 1px solid var(--onboard-gray-600, var(--gray-600));
  }

  .background-gray {
    background: var(--onboard-wallet-app-icon-background, var(--onboard-gray-500, var(--gray-500)));
  }

  .background-light-gray {
    background: var(--onboard-wallet-app-icon-background, var(--onboard-gray-100, var(--gray-100)));
  }

  .background-light-blue {
    background: var(--onboard-wallet-app-icon-background, var(--onboard-primary-100, var(--primary-100)));
  }

  .background-green {
    background: var(--onboard-wallet-app-icon-background, var(--onboard-success-100, var(--success-100)));
  }

  .background-white {
    background: var(--onboard-wallet-app-icon-background, var(--onboard-white, var(--white)));
  }

  .background-transparent {
    background: var(--onboard-wallet-app-icon-background, transparent);
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
  class:border-yellow={border === 'yellow'}
  class:border-gray={border === 'gray'}
  class:border-green={border === 'green'}
  class:border-dark-green={border === 'darkGreen'}
  class:border-blue={border === 'blue'}
  class:border-dark-blue={border === 'darkBlue'}
  class:border-transparent={border === 'transparent'}
  class:border-black={border === 'black'}
  class:background-gray={background === 'gray'}
  class:background-light-gray={background === 'lightGray'}
  class:background-light-blue={background === 'lightBlue'}
  class:background-green={background === 'green'}
  class:background-white={background === 'white'}
  class:background-transparent={background === 'transparent'}
  class="relative"
  style={`${
    background === 'custom' ? `background-color: ${customBackgroundColor}` : ''
  }; padding: ${
    padding - 1
  }px; width: ${size}px; height: ${size}px; border-radius: ${radius}px; color: ${color};`}
>
  {#if loading}
    <div class="spinner-container">
      <Spinner size="2rem" />
    </div>
  {:else}
    {#await icon}
      <div class="placeholder-icon" />
    {:then iconLoaded}
      <div in:fade class="icon flex justify-center items-center">
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
