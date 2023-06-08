<script lang="ts">
  import { slide } from 'svelte/transition'
  import infoIcon from '../../icons/info.js'
</script>

<style>
  .container {
    gap: 1rem;
    padding: 0.75rem;
    color: var(--onboard-warning-700, var(--warning-700));
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: 16px;
    border: 1px solid var(--onboard-warning-400, var(--warning-400));
    background: var(--onboard-warning-100, var(--warning-100));
    border-radius: 12px;
  }

  .icon {
    color: var(--onboard-warning-700, var(--warning-700));
    width: 1rem;
    height: 1rem;
    flex: 0 0 auto;
  }
	
  
</style>

<div in:slide|local="{{delay: 50, duration: 500}}" class="container flex justify-between">
  <div>
    <slot />
  </div>

  <div class="icon">
    {@html infoIcon}
  </div>
</div>
