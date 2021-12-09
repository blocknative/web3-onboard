<script lang="ts">
  import { fade } from 'svelte/transition'
  import infoIcon from '../../icons/info'
</script>

<style>
  .container {
    display: flex;
    justify-content: space-between;
    padding: var(--onboard-spacing-5, var(--spacing-5));
    color: var(--onboard-warning-700, var(--warning-700));
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    border: 1px solid var(--onboard-warning-400, var(--warning-400));
    background-color: var(--onboard-warning-100, var(--warning-100));
    margin: 0;
    border-radius: 12px;
  }

  .icon {
    color: var(--onboard-warning-700, var(--warning-700));
    width: 1rem;
    height: 1rem;
    margin-left: var(--onboard-spacing-5, var(--spacing-5));
  }

  p {
    margin: 0;
    width: fit-content;
  }
</style>

<div in:fade class="container">
  <p>
    <slot />
  </p>

  <div class="icon">
    {@html infoIcon}
  </div>
</div>
