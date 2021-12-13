<script lang="ts">
  import blocknative from '../icons/blocknative'
  import CloseButton from '../elements/CloseButton.svelte'
  import AddressTable from '../elements/AddressTable.svelte'
  
  import type { Subject } from 'rxjs'
  import type { ScanAccountsOptions, SelectAccountOptions, Account, AccountsList } from '../types';

  export let selectAccountOptions: SelectAccountOptions
  export let accounts$: Subject<Account[]>

  const { basePaths, assets, chains, scanAccounts, walletIcon } = selectAccountOptions
  
  let accountsList: AccountsList;
  let accountSelected: Account;
  let showEmptyAddresses: boolean = false;

  let scanAccountOptions: ScanAccountsOptions = {
    derivationPath : basePaths[0]?.value || '',
    chainId: chains[0]?.id || '',
    asset: assets[0] || null
  };

  const connectAccounts = () => {
    if (!accountSelected) return;
    accounts$.next([accountSelected]);
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      // Submit it!
    }
  }

  const setAccountsList = (newAccountsList: AccountsList) => {
    accountsList = newAccountsList;
  }

  const dismiss = () => accounts$.next([]);

  console.log(showEmptyAddresses)

</script>

<style>

  select {
    display: block;
    margin: 0;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23242835%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, transparent 0%, transparent 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 1rem top 1rem, 0 0;
    background-size: 0.65em auto, 100%;
    scrollbar-width: none;
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 1rem;
    line-height: 1.5;
    color: var(--account-select-gray-600, var(--grey-600));
    transition: all 200ms ease-in-out;
    border: 2px solid var(--account-select-gray-200, var(--gray-200));
    box-sizing: border-box;
    height: 3rem;
    -ms-overflow-style: none;
  }

  select::-webkit-scrollbar {
    display: none;
  }

  select::-ms-expand {
    display: none;
  }

  button {
    align-items: center;
    padding: .75rem 1.5rem;
    color: var(--account-select-white, var(--white));
    border-radius: 1.5rem;
    font-family: var(--account-select-font-family-normal, var(--font-family-normal));
    font-style: normal;
    font-weight: bold;
    font-size: var(--account-select-font-size-5, var(--font-size-5));
    line-height: var(--account-select-font-line-height-1, var(--line-height-1));
    border: none;
  }

  .connect-btn:disabled {
    background-color: var(--account-select-blue-300, var(--blue-300));
    cursor: default;
  }

  .connect-btn {
    background-color: var(--account-select-blue-500, var(--blue-500));
    cursor: pointer;
  }

  .dismiss-action {
    color: var(--account-select-blue-500, var(--blue-500));
    cursor: pointer;
    margin-left: var(--account-select-margin-5);
  }

  select:hover {
    border-color: var(--blue-300);
  }

  select:focus {
    border-color: var(--blue-500);
    box-shadow: 0 0 1px 1px var(--blue-500);
    box-shadow: 0 0 0 1px -moz-mac-focusring;
    outline: none;
  }

  select:disabled {
    background-color: var(--grey-100);
  }

  option {
    font-weight: 300;
  }

  .close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 2rem;
    height: 2rem;
    background: var(--account-select-gray-200, var(--gray-200));
    border-radius: 40px;
  }

  .hardware-connect-modal {
    position: absolute;
    width: 42rem;
    height: 51.75rem;
    margin:0 auto;
    display:table;
    left: 0;
    right:0;
    top: 50%; 
    -webkit-transform:translateY(-50%);
    -moz-transform:translateY(-50%);
    -ms-transform:translateY(-50%);
    -o-transform:translateY(-50%);
    transform:translateY(-50%);
    background: var(--account-select-white, var(--white));
    box-shadow: var(--account-select-shadow-1, var(--shadow-1));
    border-radius: 1.5rem;
  }

  .connect-wallet-header {
    background-color: var(--account-select-gray-100);
    height: 5rem;
    border-radius: 1.5rem 1.5rem 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bn-logo {
    height: 3.2rem;
    position: absolute;
    left: .5rem;
  }

  .wallet-icon {
    width: 4rem;
    height: 4rem;
  }

  .modal-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }

  .control-label {
    font-family: var(--account-select-font-family-normal, var(--font-family-normal));
    font-style: normal;
    font-weight: bold;
    font-size: 1rem;
    line-height: 1.5rem;
    margin-top: .5rem;
    margin-bottom: .5rem;
    color: var(--account-select-gray-700, var(--gray-700));
  }

  .base-path-select {
    width: 25rem;
  }
  .asset-select {
    width: 6rem
  }
  
  .network-select {
    width: 8rem
  }

  .w-100 {
    width: 100%
  }
  .base-path-container {
    flex-grow: 1;
    margin-right: 0.5rem;
  }
  .asset-container {
    flex-grow: 0;
    margin-right: 0.5rem;
  }
  .network-container {
    flex-grow: 0;
  }

  .address-found-count {
    padding: 1rem;
    color: var(--account-select-gray-500, var(--gray-500));
  }

</style>

<div class='hardware-connect-modal'>
  <header class='connect-wallet-header'>
    <div class='bn-logo'>{@html blocknative}</div>
    <div class='wallet-icon'>{@html walletIcon}</div>
    <div class="close" on:click={dismiss}><CloseButton /></div>
  </header>
  <section class='modal-controls'>
    <div class="w-100 base-path-container" on:keydown={handleKeyDown}>
        <h4 class="control-label">
          Select Base Path
        </h4>
        <select
          class='base-path-select'
          bind:value={scanAccountOptions['derivationPath']}
        >
          {#each basePaths as path, pathIndex}

          <option
            value={path.value}
          >
            {path.label} - {path.value}
          </option>
          {/each}
        </select>
    </div>


    <div class="w-100 asset-container" on:keydown={handleKeyDown}>
      <h4 class="control-label">
        Asset
      </h4>
      <select
        class='asset-select'
        bind:value={scanAccountOptions['asset']}
      >
        {#each assets as asset, assetIndex}
          <option
            value={asset}
          >
            {asset.label}
          </option>
        {/each}
      </select>
    </div>


    <div class="network-container w-100" on:keydown={handleKeyDown}>
      <h4 class="control-label">
        Network
      </h4>
      <select
        bind:value={scanAccountOptions['chainId']}
        class='network-select'
      >
        {#each chains as chain, chainIndex}
          <option
            value={chain.id}
          >
            {chain.label}
          </option>
        {/each}
      </select>
    </div>
  </section>

  <AddressTable scanAccounts={scanAccounts} 
    scanAccountOptions={scanAccountOptions} 
    accountsList={accountsList}
    setAccountsList={setAccountsList}
    bind:showEmptyAddresses={showEmptyAddresses}
    bind:accountSelected={accountSelected}
  />
  <section>
    <div class='address-found-count'>
      {#if showEmptyAddresses}
        {accountsList?.all?.length || 0} total address{accountsList?.all?.length !== 1 ? 'es' : ''} found
      {/if}
      {#if !showEmptyAddresses}
        {accountsList?.filtered?.length || 0} total address{accountsList?.filtered?.length !== 1 ? 'es' : ''} found
      {/if}
    </div>
    <div class='modal-controls'>
      <div
        class="dismiss-action"
        id="dismiss-account-select"
        on:click={dismiss}
      >
        Dismiss
    </div>
      <button
        class="connect-btn"
        id="connect-accounts"
        disabled={!accountSelected}
        on:click={connectAccounts}
      >
        Connect
      </button>
    </div>
  </section>
</div>
