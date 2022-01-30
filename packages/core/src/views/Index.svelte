<script lang="ts">
  import { connectWallet$, switchChainModal$ } from '../streams'
  import Connect from './connect/Index.svelte'
  import SwitchChain from './chain/SwitchChain.svelte'
</script>

<style>
  :global(.onboard-button-primary) {
    border-radius: 24px;
    background: var(--onboard-white, var(--white));
    padding: var(--onboard-spacing-5, var(--spacing-5))
      var(--onboard-spacing-4, var(--spacing-4));
    color: var(--onboard-gray-500, var(--gray-500));
    font-family: var(
      --onboard-font-family-semibold,
      var(--font-family-semibold)
    );
    font-size: var(--onboard-font-size-6, var(--font-size-6));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    border: 1px solid var(--onboard-gray-500, var(--gray-500));
  }

  :global(input, textarea) {
    background: var(--onboard-white, var(--white));
  }

  :global(input, textarea, select) {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 2px solid var(--onboard-gray-200, var(--gray-200));
    border-radius: 8px;
    font-size: 1rem;
    line-height: 1.5;
    color: var(--onboard-gray-600, var(--gray-600));
    transition: all 200ms ease-in-out;
  }

  :global(input[type='checkbox']) {
    -webkit-appearance: none;
    width: auto;
    background-color: var(--onboard-white, var(--white));
    border: 1px solid var(--onboard-gray-300, var(--gray-300));
    padding: 0.5em;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
  }

  :global(input[type='checkbox']:hover) {
    border-color: var(--onboard-blue-500, var(--blue-500));
  }

  :global(input[type='checkbox']:checked) {
    background-color: var(--onboard-blue-500, var(--blue-500));
    border-color: var(--onboard-blue-500, var(--blue-500));
    color: var(--onboard-white, var(--white));
  }

  :global(input[type='checkbox']:checked:after) {
    content: url("data:image/svg+xml,%3Csvg width='0.885em' height='0.6em' viewBox='0 0 14 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 6L5 11L14 2L12.59 0.58L5 8.17L1.41 4.59L0 6Z' fill='white'/%3E%3C/svg%3E");
    font-size: 12px;
    position: absolute;
    color: var(--onboard-white, var(--white));
  }

  :global(input:hover, textarea:hover, select:hover) {
    border-color: var(--onboard-blue-300, var(--blue-300));
  }

  :global(input:focus, textarea.focus, select:focus) {
    border-color: var(--onboard-blue-500, var(--blue-500));
    box-shadow: 0 0 1px 1px var(--onboard-blue-500, var(--blue-500));
    box-shadow: 0 0 0 1px -moz-mac-focusring;
    outline: none;
  }

  :global(input:disabled, textarea:disabled, select:disabled) {
    background-color: var(--grey-100);
  }

  :global(input::-moz-focus-inner) {
    border: 0;
    padding: 0;
    margin-top: -2px;
    margin-bottom: -2px;
  }

  :global(::-webkit-input-placeholder) {
    /* Chrome/Opera/Safari */
    color: var(--grey-300);
  }
  :global(::-moz-placeholder) {
    /* Firefox 19+ */
    color: var(--grey-300);
  }
  :global(:-ms-input-placeholder) {
    /* IE 10+ */
    color: var(--grey-300);
  }
  :global(:-moz-placeholder) {
    /* Firefox 18- */
    color: var(--grey-300);
  }

  :global(a) {
    color: var(--onboard-blue-500, var(--blue-500));
  }
</style>

{#if $connectWallet$.inProgress}
  <Connect options={$connectWallet$} />
{/if}

{#if $switchChainModal$}
  <SwitchChain />
{/if}
