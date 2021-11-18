<script lang="ts">
  import infoIcon from '../../icons/info'
</script>

<style>
  .outer-container {
    padding: 1rem;
  }

  .container {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
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
    margin-left: 0.5rem;
  }

  p {
    margin: 0;
    width: fit-content;
  }
</style>

<div class="outer-container">
  <div class="container">
    <p>
      <slot />
    </p>

    <div class="icon">
      {@html infoIcon}
    </div>
  </div>
</div>
