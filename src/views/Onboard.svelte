<script lang="ts">
  import WalletSelect from './WalletSelect.svelte'
  import WalletCheck from './WalletCheck.svelte'
  import accountSelect from '../modules/check/accounts'
  import derivationPath from '../modules/check/derivation-path'
  import { app } from '../stores'

  import {
    WalletSelectModule,
    WalletSelectFunction,
    WalletCheck as WalletCheckType
  } from '../interfaces'

  export let walletSelectModule: WalletSelectModule
  export let walletSelect: WalletSelectFunction
  export let walletCheck: WalletCheckType
</script>

<style>
  :global(.bn-onboard-custom.bn-onboard-dark-mode) {
    background: #283944;
    color: #ffffff;
  }

  :global(.bn-onboard-custom.bn-onboard-dark-mode-background-hover:hover, .bn-onboard-custom.bn-onboard-dark-mode-background) {
    background: #0e212a;
  }

  :global(.bn-onboard-clickable) {
    text-decoration: none;
  }

  :global(.bn-onboard-clickable:hover) {
    cursor: pointer;
    text-decoration: underline;
  }

  :global(.bn-onboard-custom.bn-onboard-dark-mode-link) {
    color: #91bced;
    border-color: #91bced;
  }

  :global(.bn-onboard-wallet-check-section select) {
    padding: 0.5rem;
  }
</style>

{#if $app.walletSelectInProgress}
  <WalletSelect module={walletSelectModule} />
{/if}

{#if $app.walletCheckInProgress}
  <WalletCheck modules={undefined} {walletSelect} {walletCheck} />
{/if}

{#if $app.accountSelectInProgress}
  <WalletCheck
    modules={[derivationPath(), accountSelect()]}
    {walletSelect}
    {walletCheck}
  />
{/if}
