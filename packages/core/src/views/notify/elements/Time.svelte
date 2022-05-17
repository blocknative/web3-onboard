<script lang="ts">
  import { app } from '../../../stores'
  export let time: string
</script>

<style>
  span {
    font-size: inherit;
    font-family: inherit;
    margin-right: 0.5em;
  }
</style>

<span
  class="bn-notify-custom bn-notify-notification-info-meta-timestamp {$app.name ? `bn-notify-${$app.name}` : ''}">
  {time}
</span>
