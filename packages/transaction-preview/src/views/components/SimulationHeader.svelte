<script lang="ts">
  import { _ } from 'svelte-i18n'
  import Timer from './Timer.svelte'
  import en from '../../i18n/en.json'
  export let startTime: number
</script>

<style>
  div.notify-transaction-data {
    font-size: var(--onboard-font-size-6, var(--font-size-6));
    font-family: inherit;
    margin: 0px 20px 0px 8px;
    justify-content: center;
    gap: 4px;
  }

  .timer {
    display: inline-flex;
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-font-line-height-4, var(--font-line-height-4));
  }

  .transaction-status {
    color: var(
      --w3o-tp-text-color,
      var(--onboard-primary-100, var(--primary-100))
    );
    line-height: var(--onboard-font-size-5, var(--font-size-5));
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
    {$_('header', {
      default: en.header
    })}
  </span>

  <span class="timer">
    <Timer {startTime} />
  </span>
</div>
