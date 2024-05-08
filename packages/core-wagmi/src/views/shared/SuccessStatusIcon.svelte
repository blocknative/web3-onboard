<script lang="ts">
  import successIcon from '../../icons/success.js'

  export let size: number // px
  export let color: 'green' | 'blue' = 'green'
</script>

<style>
  .icon {
    color: var(--onboard-white, var(--white));
    border-radius: 50px;
  }

  .green {
    background: var(--onboard-success-600, var(--success-600));
  }

  .blue {
    background: var(--onboard-primary-1, var(--primary-1));
  }
</style>

<div
  class:green={color === 'green'}
  class:blue={color === 'blue'}
  class="icon flex"
  style={`width: ${size}px; height: ${size}px; padding: ${size / 5}px;`}
>
  {@html successIcon}
</div>
