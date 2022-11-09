<script lang="ts">
  import { _ } from 'svelte-i18n'
  import en from '../i18n/en.json'
  import { getDevice } from '../utils'

  import SimulationHeader from './components/SimulationHeader.svelte'
  import IconBadge from './components/IconBadge.svelte'
  import closeIcon from '../icons/close-circle.js'

  export let toggleExpanded: (maximize: boolean) => void
  export let startTime: number

  const device = getDevice()
  let nodeRef: HTMLElement
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

  div.tp-close-btn {
    visibility: visible;
    opacity: 1;
  }

  div.tp-close-btn {
    margin-left: auto;
    margin-bottom: auto;
    height: 24px;
    width: 24px;
    position: absolute;
    top: 8px;
    right: 8px;
    justify-content: center;
    align-items: center;
  }

  div.minimized:hover > div.tp-close-btn-desktop {
    visibility: visible;
    opacity: 1;
  }

  div.tp-close-btn-desktop {
    visibility: hidden;
    transition: visibility 0.15s linear, opacity 0.15s linear;
    opacity: 0;
  }

  .tp-close-btn .close-icon {
    width: 20px;
    margin: auto;
  }

  .tp-close-btn > .close-icon {
    color: var(
      --notify-onboard-close-icon-color,
      var(--onboard-gray-300, var(--gray-300))
    );
  }

  .tp-close-btn:hover > .close-icon {
    color: var(
      --notify-onboard-close-icon-hover,
      var(--onboard-gray-100, var(--gray-100))
    );
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

<div class="minimized pointer radius padding-5" bind:this={nodeRef}>
  <div
    on:click|stopPropagation={() => {
      nodeRef.parentNode.removeChild(nodeRef)
    }}
    class="tp-close-btn tp-close-btn-{device.type} pointer flex"
  >
    <div class="flex items-center close-icon">
      {@html closeIcon}
    </div>
  </div>
  <div class="flex bn-notify-notification-inner">
    <IconBadge />
    <SimulationHeader {startTime} />
  </div>
  <section class="details">
    <div
      class="details-cta"
      on:click|stopPropagation={() => toggleExpanded(true)}
    >
      {$_('minimized.show', {
        default: en.minimized.show
      })}
    </div>
  </section>
</div>
