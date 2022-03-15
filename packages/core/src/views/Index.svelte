<script lang="ts">
  import { shareReplay, startWith } from 'rxjs/operators'
  import { connectWallet$, switchChainModal$ } from '../streams'
  import { state } from '../store'
  import Connect from './connect/Index.svelte'
  import SwitchChain from './chain/SwitchChain.svelte'
  import ActionRequired from './connect/ActionRequired.svelte'
  import Dashboard from './dashboard/Index.svelte'

  const dashboard$ = state
    .select('dashboard')
    .pipe(startWith(state.get().dashboard), shareReplay(1))
</script>

<style>
  :global(.flex) {
    display: flex;
  }

  :global(.flex-column) {
    flex-direction: column;
  }

  :global(.items-center) {
    align-items: center;
  }

  :global(.items-end) {
    align-items: flex-end;
  }

  :global(.justify-center) {
    justify-content: center;
  }

  :global(.justify-between) {
    justify-content: space-between;
  }

  :global(.justify-around) {
    justify-content: space-around;
  }

  :global(.relative) {
    position: relative;
  }

  :global(.absolute) {
    position: absolute;
  }

  :global(.fixed) {
    position: fixed;
  }

  :global(.pointer) {
    cursor: pointer;
  }
  :global(input) {
    background: var(--onboard-white, var(--white));
  }

  :global(input) {
    width: 100%;
    padding: 0.5rem 1rem;
    outline: 2px solid var(--onboard-gray-200, var(--gray-200));
    border: none;
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
    outline: 1px solid var(--onboard-gray-300, var(--gray-300));
    border: none;
    padding: 0.5em;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
  }

  :global(input[type='checkbox']:hover) {
    border-color: var(
      --onboard-checkbox-background,
      var(--onboard-primary-500, var(--primary-500))
    );
  }

  :global(input[type='checkbox']:checked) {
    background-color: var(
      --onboard-checkbox-background,
      var(--onboard-primary-500, var(--primary-500))
    );
    border-color: var(
      --onboard-checkbox-background,
      var(--onboard-primary-500, var(--primary-500))
    );
    color: var(--onboard-checkbox-color, var(--onboard-white, var(--white)));
  }

  :global(input[type='checkbox']:checked:after) {
    content: url("data:image/svg+xml,%3Csvg width='0.885em' height='0.6em' viewBox='0 0 14 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 6L5 11L14 2L12.59 0.58L5 8.17L1.41 4.59L0 6Z' fill='white'/%3E%3C/svg%3E");
    font-size: 12px;
    position: absolute;
    color: var(--onboard-checkbox-color, var(--onboard-white, var(--white)));
  }

  :global(input:hover) {
    border-color: var(
      --onboard-checkbox-color,
      var(--onboard-white, var(--white))
    );
  }

  :global(input:focus) {
    border-color: var(--onboard-primary-500, var(--primary-500));
    box-shadow: 0 0 1px 1px
      var(
        --onboard-checkbox-background,
        var(--onboard-primary-500, var(--primary-500))
      );
    box-shadow: 0 0 0 1px -moz-mac-focusring;
  }

  :global(input:disabled, textarea:disabled, select:disabled) {
    background-color: var(--gray-100);
  }

  :global(input::-moz-focus-inner) {
    outline: 0;
    padding: 0;
    margin-top: -2px;
    margin-bottom: -2px;
  }

  :global(a) {
    color: var(
      --onboard-link-color,
      var(--onboard-primary-500, var(--primary-500))
    );
    text-decoration: none;
  }

  :global(button) {
    display: flex;
    align-items: center;
    padding: calc(var(--onboard-spacing-4, var(--spacing-4)) - 1px);
    border-radius: 24px;
    cursor: pointer;
    font: inherit;
    border: none;
  }

  :global(.onboard-button-primary) {
    background: var(--onboard-white, var(--white));
    padding: calc(var(--onboard-spacing-5, var(--spacing-5)) - 1px)
      calc(var(--onboard-spacing-4, var(--spacing-4)) - 1px);
    color: var(--onboard-gray-500, var(--gray-500));
    font-size: var(--onboard-font-size-6, var(--font-size-6));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    border: 1px solid var(--onboard-gray-500, var(--gray-500));
    font-weight: 700;
  }
</style>

{#if $connectWallet$.inProgress}
  <Connect autoSelect={$connectWallet$.autoSelect} />
{/if}

{#if $connectWallet$.actionRequired}
  <ActionRequired wallet={$connectWallet$.actionRequired} />
{/if}

{#if $switchChainModal$}
  <SwitchChain />
{/if}

{#if $dashboard$.enabled}
  <Dashboard settings={$dashboard$} />
{/if}
