<script lang="ts">

  import Spinner from './Spinner.svelte'
  import type { Account, AccountsList, ScanAccounts, ScanAccountsOptions } from '../types';

  export let scanAccounts: () => Promise<void>;
    
  export let loadingAccounts: boolean;
  export let accountsListObject: AccountsList | undefined;
  export let accountSelected: Account | undefined;
  export let showEmptyAddresses: boolean;

  $: accounts = showEmptyAddresses ? accountsListObject?.all : accountsListObject?.filtered;

  let selectedRowIndex: number;

  const filterEmptyAccounts = () => {
    showEmptyAddresses = !showEmptyAddresses;
  }

  const handleSelectedRow = (accountClicked: Account, index: number) => {
    selectedRowIndex = index;
    accountSelected = accountClicked;
  }
</script>

<style>
  .table-section {
    max-height: 31.8rem;
    padding: 1rem;
  }

  table {
    border-spacing: 0px;
  }
  
  table thead{
    position: sticky;
    inset-block-start: 0; /* "top" */
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
    background-color: var(--account-select-white, var(--white));
  }

  th, td {
    text-align: left;
    padding: .5rem 1rem;
  }

  td {
    font-family: var(--account-select-font-family-normal, var(--font-family-normal));
    font-style: normal;
    font-weight: normal;
    font-size: var(--account-select-font-size-5, var(--font-size-5));
    line-height: var(--account-select-font-line-height-1, var(--font-line-height-1));
  }

  tbody tr {
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
  }

  tbody tr:hover {
		background-color: var(--account-select-blue-100, var(--blue-100));
		color: var(--account-select-black, var(--black));
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

  .scan-accounts-btn {
    line-height: var(--account-select-font-line-height-1, var(--line-height-1));
    background-color: var(--account-select-gray-500, var(--gray-500));
    color: var(--account-select-blue-100, var(--blue-100));
    width: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  input:hover {
    border-color: var(--blue-300);
  }

  input:focus {
    border-color: var(--blue-500);
    box-shadow: 0 0 1px 1px var(--blue-500);
    box-shadow: 0 0 0 1px -moz-mac-focusring;
    outline: none;
  }

  input:disabled {
    background-color: var(--grey-100);
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

  .selected-row, .selected-row:hover {
		background-color: var(--account-select-blue-500, var(--blue-500));
		color: var(--account-select-blue-100, var(--blue-100));
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
    min-height: 9.5rem;
    max-height: 27rem;
    overflow: scroll;
  }

  .asset-td {
    font-weight: bold;
  }
  .w-100 {
    width: 100%
  }

</style>

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
        on:click={async () => await scanAccounts()}
      >
        {#if loadingAccounts}
          Scanning...
          <Spinner size='1.5rem'/>
        {/if}
        {#if !loadingAccounts}
          Scan Accounts
        {/if}
      </button>
    </div>
    <div class='address-table'>
      <table class="w-100">
        <colgroup>
          <col style="width: 50%;">
          <col style="width: 28%;">
          <col style="width: 22%;">
        </colgroup>
        <thead class="">
          <tr>
            <th>Address</th>
            <th>DPATH</th>
            <th>Asset</th>
          </tr>
        </thead>
        <tbody>
          {#if accounts?.length}
            {#each accounts as account, i }
              <tr class:selected-row="{selectedRowIndex === i}"
                  on:click="{() => handleSelectedRow(account, i)}">
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