<script lang="ts">
  import ChainBadge from './ChainBadge.svelte'
  import { defaultNotifyEventStyles, unrecognizedChainStyle } from '../../utils'
  import type { NotificationObject, ChainStyle } from '../../types'
  export let chainStyles: ChainStyle = unrecognizedChainStyle
  export let notification: NotificationObject
</script>

<style>
  div.notification-icons-wrapper {
    height: 32px;
    width: 32px;
  }

  .border {
    border-radius: 8px;
  }

  div.notification-icon {
    padding: 5px;
  }
  div.pending-icon {
    animation: blink 2s ease-in infinite;
    height: 100%;
    width: 100%;
    padding: 7px;
  }

  @keyframes blink {
    from,
    to {
      opacity: 1;
    }
    50% {
      opacity: 0.2;
    }
  }
  div.border-action {
    height: 32px;
    min-width: 32px;
    border-radius: 8px;
    overflow: hidden;
  }
  div.border-action:before {
    content: '';
    background-image: conic-gradient(#b1b7f2 20deg, #6370e5 120deg);
    height: 140%;
    width: 140%;
    position: absolute;
    left: -25%;
    top: -25%;
    animation: rotate 2s infinite linear;
  }

  div.chain-icon-container {
    left: 18px;
    top: 18px;
  }
  @keyframes rotate {
    100% {
      transform: rotate(-360deg);
    }
  }
</style>

{#if notification.type}
  <div class="relative">
    {#if notification.type === 'pending'}
      <div class="border-action absolute" />
    {/if}

    <div
      class="flex items-center justify-center border relative notification-icons-wrapper"
      style={`background:${
        defaultNotifyEventStyles[notification.type]['backgroundColor']
      }; color: ${
        defaultNotifyEventStyles[notification.type]['iconColor'] || ''
      }; ${
        notification.type === 'pending'
          ? 'height: 28px; width: 28px; margin: 2px;'
          : `border: 2px solid ${
              defaultNotifyEventStyles[notification.type]['borderColor']
            }`
      }; `}
    >
      <div
        class={`notification-icon flex items-center justify-center ${
          notification.type === 'pending' ? 'pending-icon' : ''
        }`}
      >
        {@html defaultNotifyEventStyles[notification.type]['eventIcon']}
      </div>
    </div>
    {#if !notification.id.includes('custom')}
      <div class="absolute chain-icon-container">
        <ChainBadge
          icon={chainStyles.icon}
          size={16}
          background={chainStyles.color}
          borderColorVar={'--onboard-gray-600, var(--gray-600)'}
          padding={3}
        />
      </div>
    {/if}
  </div>
{/if}
