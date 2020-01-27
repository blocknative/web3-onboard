<script lang="ts">
  import WalletSelect from './WalletSelect.svelte'
  import WalletCheck from './WalletCheck.svelte'
  import accountSelect from '../modules/check/account-select'
  import { app } from '../stores'

  import {
    WalletSelectModule,
    WalletCheckModule,
    WalletSelectFunction
  } from '../interfaces'

  export let walletSelectModule: WalletSelectModule
  export let walletCheckModules: WalletCheckModule
  export let walletSelect: WalletSelectFunction
</script>

<style>
  :global(.bn-onboard-custom.bn-onboard-dark-mode) {
    background: #283944;
    color: #ffffff;
  }

  :global(.bn-onboard-custom.bn-onboard-dark-mode-background-hover:hover, .bn-onboard-custom.bn-onboard-dark-mode-background) {
    background: #0e212a;
  }

  :global(.bn-onboard-clickable:hover) {
    cursor: pointer;
    text-decoration: underline;
  }

  :global(.bn-onboard-custom.bn-onboard-dark-mode-link) {
    color: #91bced;
    border-color: #91bced;
  }
</style>

{#if $app.walletSelectInProgress}
  <WalletSelect module={walletSelectModule} />
{/if}

{#if $app.walletCheckInProgress}
  <WalletCheck modules={walletCheckModules} {walletSelect} />
{/if}

{#if $app.accountSelectInProgress}
  <WalletCheck modules={[accountSelect()]} />
{/if}
