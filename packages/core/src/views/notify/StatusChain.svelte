<script lang="ts">
  import ProtocolLogo from './ProtocolLogo.svelte'
  export let chainIcon: string
  export let statusIcon: string
  export let backgroundColor: string = '#323873'
  export let borderColor: string = '#6370E5'
  export let pending: boolean = true // will be false in final
</script>

<style>
  div.status-icons-wrapper {
    height: 32px;
    min-width: 32px;
  }

  .border {
    border-radius: 8px;
  }

  div.status-icon {
    height: 14px;
  }
  div.pending-icon {
    animation: blink 2s ease-in infinite;
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

<div class="relative">
  {#if pending}
    <div class="border-action absolute" />
  {/if}

  <div
    class="flex items-center justify-center border relative status-icons-wrapper"
    style={`background:${backgroundColor};  ${
      pending
        ? 'height: 28px; min-width: 28px; margin: 2px;'
        : `border: 2px solid ${borderColor}`
    }; `}
  >
    <div
      class={`status-icon flex items-center justify-center ${
        pending ? 'pending-icon' : ''
      }`}
    >
      {@html statusIcon}
    </div>
  </div>
  <div class="absolute chain-icon-container">
    <ProtocolLogo
      icon={chainIcon}
      size={16}
      background={'#627EEA'}
      borderColorVar={'--onboard-gray-600, var(--gray-600)'}
      padding={4}
    />
  </div>
</div>
