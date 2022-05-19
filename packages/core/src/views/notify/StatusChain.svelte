<script lang='ts'>
  import ProtocolLogo from './ProtocolLogo.svelte'
  export let chainIcon: string
  export let statusIcon: string
  export let backgroundColor: string = '#323873'
  export let borderColor: string = '#6370E5'
</script>

<style>
  div {
    height: 32px;
    width: 32px;
  }

  .border {
    border: 2px solid;
    border-radius: 8px;
    overflow: hidden;
  }

  .protocol-border {
    border: 2px solid #33394b;
    border-radius: 50%;
  }
</style>

<div class="inline-flex border" style="background:{backgroundColor}; border:{borderColor};">
  <div class="plus-icon flex items-center justify-center">
    {@html statusIcon}
  </div>
  <div class="relative" style="left: -16px; top: 16px;">
    <ProtocolLogo icon={chainIcon} size={16} />
  </div>
</div>