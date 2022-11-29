<script lang="ts">
  import { pendingIcon } from '../../icons'

  export let size: number // px
  export let color = 'yellow'
  let className = 'test'
  export { className as class }
</script>

<style>
  .icon {
    color: var(--onboard-white, var(--white));
    border-radius: 50px;
    bottom: -0.25rem;
    right: -0.25rem;
  }

  .yellow {
    background: var(--onboard-warning-500, var(--warning-500));
  }
</style>

<div
  class:yellow={color === 'yellow'}
  class={`${className} icon flex absolute`}
  style={`width: ${size}px; height: ${size}px; padding: ${size / 6}px;`}
>
  {@html pendingIcon}
</div>
