<script setup>
import { useOnboard } from '@web3-onboard/vue';

const { connectedWallet } = useOnboard();
</script>
<template>
  <div class="about">
    <div class="connected-wallet">
      Connected wallet:
      <span style="font-weight: 700">
        {{ connectedWallet?.label ?? 'None' }}
      </span>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    align-items: center;
  }
  .connected-wallet {
    display: flex;
    justify-content: center;
  }
}
</style>
