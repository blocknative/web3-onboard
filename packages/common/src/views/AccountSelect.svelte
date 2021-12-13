<script lang="ts">
  import blocknative from '../icons/blocknative'
  import CloseButton from './CloseButton.svelte'
  import { fade } from 'svelte/transition'
  import { Subject } from 'rxjs'

  import type { Asset, DerivationPath, ScanAccountsOptions, SelectAccountOptions, Account, Chain, AccountsList } from '../types';
  export let selectAccountOptions: SelectAccountOptions
  export let accounts$: Subject<Account[]>

  const { basePaths, assets, chains, scanAccounts, walletIcon } = selectAccountOptions
  
  console.log(basePaths, assets, chains, scanAccounts, walletIcon)

  let showEmptyAddresses: boolean = false;
  let selectionsMade: boolean = false;
  let accountsList: AccountsList;

  let scanAccountOptions: ScanAccountsOptions = {
    derivationPath : basePaths[0]?.value || '',
    chainId: chains[0]?.id || '',
    asset: assets[0] || null
  };

  // $: filtersAreValid = $filters.every(
  //   ({ properties, values, comparison, value }) =>
  //     (properties.length &&
  //       (value || values.length || properties.includes('exists'))) ||
  //     comparison === 'exists'
  // )

  const filterEmptyAccounts = () => {
    showEmptyAddresses = !showEmptyAddresses;
  }

  const connectAccounts = () => {
    console.log('connectAccount')
    // dismiss with an empty array to indicate that the user did not select an account
    const dismiss = () => accounts$.next([])

    // user selects an account, so emit an array of the selected account
    const connect = (account: Account) => accounts$.next([account])
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      // Submit it!
    }
  }

  const handleScanAccounts = async () => {
    console.log(scanAccountOptions)
    const allAccounts = await scanAccounts(scanAccountOptions)
    // const allAccounts = accountMock;
    accountsList = {all: allAccounts, filtered: allAccounts.filter(account => Number(account?.balance.value) > 0)};
  }

  const close = () => {
    console.log('close')
  }
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
    line-height: var(--account-select-font-size-5, var(--font-size-5));
    border: none;
  }

  .scan-accounts-btn {
    background-color: var(--account-select-gray-500, var(--gray-500));
    color: var(--account-select-blue-100, var(--blue-100));
    width: 11rem;
  }

  .connect-btn {
    background-color: var(--account-select-blue-300, var(--blue-300));
  }

  .dismiss-action {
    color: var(--account-select-blue-500, var(--blue-500));
  }

  input:hover,
  select:hover {
    border-color: var(--blue-300);
  }

  input:focus,
  select:focus {
    border-color: var(--blue-500);
    box-shadow: 0 0 1px 1px var(--blue-500);
    box-shadow: 0 0 0 1px -moz-mac-focusring;
    outline: none;
  }

  input:disabled,
  select:disabled {
    background-color: var(--grey-100);
  }

  input.invalid,
  select.invalid {
    border-color: var(--danger-500);
    background: var(--danger-100);
  }

  input[type='checkbox'] {
    -webkit-appearance: none;
    width: auto;
    background-color: var(--account-select-white, var(--white));
    border: 1px solid var(--account-select-gray-300, var(--gray-300));
    padding: 0.5em;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    height: 1.5rem;
    width: 1.5rem;
  }

  input[type='checkbox']:hover {
    border-color: var(--account-select-blue-500, var(--blue-500));
  }

  input[type='checkbox']:checked {
    background-color: var(--account-select-blue-500, var(--blue-500));
    border-color: var(--account-select-blue-500, var(--blue-500));
    color: var(--account-select-white, var(--white));
  }

  input[type='checkbox']:checked:after {
    content: url("data:image/svg+xml,%3Csvg width='0.885em' height='0.6em' viewBox='0 0 14 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 6L5 11L14 2L12.59 0.58L5 8.17L1.41 4.59L0 6Z' fill='white'/%3E%3C/svg%3E");
    font-size: 12px;
    position: absolute;
    color: var(--account-select-white, var(--white));
  }

  .checkbox-container {
    display: flex;
    align-items: center;
  }

  .checkbox-input {
    margin-right: .75rem;
  }

  option {
    font-weight: 300;
  }

  th, td {
    text-align: left;
    padding: .5rem 1rem;
  }
  td {
    font-family: Sofia Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
  }

  tbody tr {
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
  }
  table thead{
  position: sticky;
  inset-block-start: 0; /* "top" */
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
  background-color: var(--account-select-white, var(--white));
}

  .close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
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

  .wallet-icon > svg {
    height: 100%;
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
  .table-section {
    height: 31.25rem;
    padding: 1rem;
  }

  .table-container {
    background: var(--account-select-white, var(--white));
    border: 2px solid var(--account-select-gray-200, var(--gray-200));
    box-sizing: border-box;
    border-radius: .5rem;
  }

  .table-controls {
    height: 3.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: .5rem;
    border-radius: .4rem .4rem 0 0;

    background: var(--account-select-gray-100, var(--gray-100));

    border-bottom: 1px solid var(--account-select-gray-200, var(--gray-200));
  }

  .address-table {
    height: 28rem;
    overflow: scroll;
  }

  .asset-td {
    font-weight: bold;
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
    <div class="close" on:click={close}><CloseButton /></div>
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

  <section class='table-section'>
    <div class='w-100 table-container'>
      <div class='table-controls'>
        <div class="checkbox-container">
          <input
            id="show-empty-addresses"
            type="checkbox"
            on:change="{filterEmptyAccounts}"
            class="checkbox-input"
          />
          <label for="legacy" class="ml2 cursor-pointer font-5"
            >Show Empty Addresses</label
          >
        </div>

        <button
          class="scan-accounts-btn"
          id="scan-accounts"
          disabled={!scanAccountOptions?.asset || !scanAccountOptions?.chainId || !scanAccountOptions?.derivationPath}
          on:click={handleScanAccounts}
        >
          Scan Accounts
        </button>
      </div>
      <div class='address-table'>
        <table class="w-100">
          <colgroup>
            <col span="1" style="width: 50%;">
            <col span="1" style="width: 28%;">
            <col span="1" style="width: 22%;">
          </colgroup>
          <thead class="">
            <tr>
              <th>Address</th>
              <th>DPATH</th>
              <th>Asset</th>
            </tr>
          </thead>
          <tbody>
            {#if accountsList?.all?.length && showEmptyAddresses}
              {#each accountsList.all as account, i }
                <tr>
                  <td>{account?.address}</td>
                  <td>{account?.derivationPath}</td>
                  <td class='asset-td'>{account?.balance?.value} {account?.balance?.asset}</td>
                </tr>
              {/each}
            {/if}
            {#if accountsList?.filtered?.length && !showEmptyAddresses}
              {#each accountsList.filtered as account, i }
                <tr>
                  <td>{account?.address}</td>
                  <td>{account?.derivationPath}</td>
                  <td class='asset-td'>{account?.balance?.value} {account?.balance?.asset}</td>
                </tr>
              {/each}
            {/if}
          </tbody>
        </table>
      </div>
    </div>
  </section>
  <section>
    <div class='address-found-count'>
        {accountsList?.all?.length || 0} total address{accountsList?.all?.length !== 1 ? 'es' : ''} found
    </div>
    <div class='modal-controls'>
      <div
        class="dismiss-action"
        id="dismiss-account-select"
        on:click={close}
      >
        Dismiss
    </div>
      <button
        class="connect-btn"
        id="connect-accounts"
        disabled={!selectionsMade}
        on:click={connectAccounts}
      >
        Connect
      </button>
    </div>
</section>
</div>
