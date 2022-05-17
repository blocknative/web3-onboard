<script lang="ts">
  import { app } from '../../../stores'
  export let value: string
</script>

<style>
  span {
    font-size: inherit;
    font-family: inherit;
  }
</style>

<span
  class="bn-notify-custom bn-notify-notification-info-meta-duration-time {$app.name ? `bn-notify-${$app.name}` : ''}">
  {value}
</span>
