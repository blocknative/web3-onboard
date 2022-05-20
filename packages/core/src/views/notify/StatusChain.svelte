<script lang='ts'>
  import ProtocolLogo from './ProtocolLogo.svelte'
  export let chainIcon: string
  export let statusIcon: string
  export let backgroundColor: string = '#323873'
  export let borderColor: string = '#6370E5'
</script>

<style>
  div.status-icons-wrapper {
    height: 32px;
    min-width: 32px;
  }

  .border {
    border: 2px solid;
    border-radius: 8px;
  }

  div.status-icon {
    height: 14px
  }

</style>

<div class="flex items-center justify-center border relative status-icons-wrapper" style="background:{backgroundColor}; border:2px solid {borderColor};">
  <div class="status-icon flex items-center justify-center">
    {@html statusIcon}
  </div>
  <div class="absolute" style="left: 16px; top: 16px;">
    <ProtocolLogo icon={chainIcon} size={16} background={'#627EEA'} borderColorVar={"--onboard-gray-600, var(--gray-600)"} padding={4}/>
  </div>
</div>