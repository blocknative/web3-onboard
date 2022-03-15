<script lang="ts">
  import pendingIcon from '../../icons/pending'

  export let size: number // px
  export let color = 'yellow'
</script>

<style>
  .icon {
    color: var(--onboard-white, var(--white));
    border-radius: 50px;
    box-sizing: border-box;
    bottom: -0.25rem;
    right: -0.25rem;
  }

  .yellow {
    background: var(--onboard-warning-500, var(--warning-500));
  }
</style>

<div
  class:yellow={color === 'yellow'}
  class="icon flex absolute"
  style={`width: ${size}px; height: ${size}px; padding: ${size / 6}px;`}
>
  {@html pendingIcon}
</div>
