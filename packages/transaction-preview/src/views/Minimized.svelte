<script lang="ts">
  import { fade } from 'svelte/transition'

  function maximize() {
    // updateTransactionPreview({ expanded: true })
  }
</script>

<style>
  .minimized {
    background: var(
      --account-center-minimized-background,
      var(--onboard-white, var(--white))
    );
    border: 1px solid
      var(--account-center-border, var(--onboard-gray-100, var(--gray-100)));
    width: 100%;
    box-shadow: var(
      --account-center-box-shadow,
      var(--onboard-shadow-3, var(--shadow-3))
    );
    pointer-events: auto;
  }

  .radius {
    border-radius: var(
      --account-center-border-radius,
      var(--onboard-border-radius-3, var(--border-radius-3))
    );
  }

</style>

<div
  in:fade={{ duration: 250 }}
  out:fade={{ duration: 100 }}
  class="minimized pointer radius padding-5"
  on:click|stopPropagation={maximize}
>
  <div class="flex items-center justify-between" style="padding: 0 4px;">
  </div>
</div>
