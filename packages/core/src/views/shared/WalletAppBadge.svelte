<script lang="ts">
  export let size: number // px
  export let icon: string // svg string
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
    | 'custom' = 'white'
  export let customBackgroundColor: string = ''
  export let backgroundOpaque: boolean = false
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
    border: 1px solid var(--onboard-blue-300, var(--blue-300));
  }

  .border-dark-blue {
    border: 1px solid var(--onboard-blue-600, var(--blue-600));
  }

  .background-gray {
    background: var(--onboard-gray-500, var(--gray-500));
  }

  .background-light-gray {
    background: var(--onboard-gray-100, var(--gray-100));
  }

  .background-light-blue {
    background: var(--onboard-blue-100, var(--blue-100));
  }

  .background-green {
    background: var(--onboard-success-100, var(--success-100));
  }

  .background-white {
    background: var(--onboard-white, var(--white));
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
  class="icon-container"
  style={`${background === 'custom' ? customBackgroundColor : ''}; padding: ${
    size / 6
  }px; width: ${size}px; height: ${size}px;`}
>
  <div class="icon">
    {@html icon}
  </div>
  <slot name="status" />
</div>
