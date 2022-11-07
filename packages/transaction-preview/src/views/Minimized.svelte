<script lang="ts">
  import NotificationContent from './components/NotificationContent.svelte'
  import StatusIconBadge from './components/StatusIconBadge.svelte'

  export let toggleExpanded: (maximize: boolean) => void
  export let startTime: number
</script>

<style>
  .minimized {
    font-family: var(--onboard-font-family-normal, var(--font-family-normal));
    transition: background 300ms ease-in-out, color 300ms ease-in-out;
    pointer-events: all;
    backdrop-filter: blur(5px);
    width: 100%;
    min-height: 56px;
    background: var(
      --transaction-sim-background,
      var(--onboard-gray-600, var(--gray-600))
    );
    border-radius: var(
      --transaction-sim-border-radius,
      var(--onboard-border-radius-4, var(--border-radius-4))
    );
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    margin: 8px 0;
  }

  .radius {
    border-radius: var(
      --transaction-sim-border-radius,
      var(--onboard-border-radius-3, var(--border-radius-3))
    );
  }

  .bn-notify-notification-inner {
    padding: 0.75rem;
  }
  .details {
    background: var(
      --transaction-sim-details-background,
      var(--onboard-gray-700, var(--gray-700))
    );
    display: flex;
    justify-content: flex-end;
  }
  .details-cta {
    margin: 0.75rem 1rem;
    color: var(
      --transaction-sim-details-cta-color,
      var(--onboard-primary-400, var(--primary-400))
    );
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
  }
</style>

<div class="minimized pointer radius padding-5">
  <div class="flex bn-notify-notification-inner">
    <StatusIconBadge />
    <NotificationContent {startTime} />
  </div>
  <section class="details">
    <div
      class="details-cta"
      on:click|stopPropagation={() => toggleExpanded(true)}
    >
      Show details
    </div>
  </section>
</div>
