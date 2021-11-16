<script lang="ts">
  import successIcon from '../../icons/success'

  export let size: number // px
  export let color: 'green' | 'blue' = 'green'
  export let bottom: number | null = -4 // px
  export let right: number | null = -4 // px
</script>

<style>
  .icon {
    display: flex;
    color: var(--onboard-white, var(--white));
    border-radius: 50px;
    box-sizing: border-box;
    position: absolute;
    z-index: 1;
  }

  .green {
    background: var(--onboard-success-600, var(--success-600));
  }

  .blue {
    background: var(--onboard-blue-1, var(--blue-1));
  }
</style>

<div
  class:green={color === 'green'}
  class:blue={color === 'blue'}
  class="icon"
  style={`width: ${size}px; height: ${size}px; padding: ${size / 5}px; ${
    bottom !== null ? `bottom: ${bottom}px;` : ''
  } ${right !== null ? `right: ${right}px;` : ''}`}
>
  {@html successIcon}
</div>
