<script lang="ts">
  import { app } from '../../../stores'
  let hovered: boolean
</script>

<style>
  /* .bn-notify-notification-close-icon */
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: inherit;
    font-family: inherit;
    padding: 0.3em;
    border-radius: 40px;
    transition: background 150ms ease-in-out;
  }

  div:hover {
    background: #eeeeee;
    cursor: pointer;
  }

  .bn-notify-dark-mode-close-background:hover {
    background: #00222c;
  }
</style>

<div
  class="bn-notify-custom bn-notify-notification-close-icon {$app.name ? `bn-notify-${$app.name}` : ''}"
  class:bn-notify-dark-mode-close-background={$app.darkMode}
  on:mouseenter={() => (hovered = true)}
  on:mouseleave={() => (hovered = false)}>
  <svg
    height="8"
    viewBox="0 0 12 12"
    width="8"
    xmlns="http://www.w3.org/2000/svg">
    <g
      fill="none"
      stroke={hovered ? ($app.darkMode ? '#ffffff' : '#4a4a4a') : '#9B9B9B'}
      stroke-linecap="square"
      stroke-width="2"
      style="transition: stroke 150ms ease-in-out;"
      transform="translate(2 2)">
      <path d="m.1.1 7.82304289 7.82304289" />
      <path d="m.1.1 7.82304289 7.82304289" transform="matrix(-1 0 0 1 8 0)" />
    </g>
  </svg>
</div>
