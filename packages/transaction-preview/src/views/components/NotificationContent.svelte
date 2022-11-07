<script lang="ts">
  import { _ } from 'svelte-i18n'
  import Timer from './Timer.svelte'

  export let startTime: number

</script>

<style>
  div.notify-transaction-data {
    font-size: var(
      --notify-onboard-transaction-font-size,
      var(--onboard-font-size-6, var(--font-size-6))
    );
    font-family: inherit;
    margin: 0px 20px 0px 8px;
    justify-content: center;
  }

  .timer {
    display: inline-flex;
    margin-top: 4px;
    font-size: var(
      --notify-onboard-hash-time-font-size,
      var(--onboard-font-size-7, var(--font-size-7))
    );
    line-height: var(
      --notify-onboard-hash-time-font-line-height,
      var(--onboard-font-line-height-4, var(--font-line-height-4))
    );
  }

  .transaction-status {
    color: var(
      --notify-onboard-transaction-status,
      var(--onboard-primary-100, var(--primary-100))
    );
    line-height: var(
      --notify-onboard-font-size-5,
      var(--onboard-font-size-5, var(--font-size-5))
    );
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>

<div class="flex flex-column notify-transaction-data">
  <span class="transaction-status">
    New Transaction Detected
  </span>

    <span class="timer">
      <Timer {startTime} />
    </span>
</div>
