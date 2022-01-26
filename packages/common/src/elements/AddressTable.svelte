<script lang="ts">
  import type { Account, AccountsList } from '../types'
  import { utils } from 'ethers'

  export let accountsListObject: AccountsList | undefined
  export let accountSelected: Account | undefined
  export let showEmptyAddresses: boolean

  $: accounts = showEmptyAddresses
    ? accountsListObject && accountsListObject.all
    : accountsListObject && accountsListObject.filtered

  const handleSelectedRow = (accountClicked: Account) => {
    accountSelected = accountClicked
  }
</script>

<style>
  table {
    border-spacing: 0px;
  }

  table thead {
    position: sticky;
    inset-block-start: 0; /* "top" */
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
    background-color: var(--account-select-white, var(--white));
  }

  th,
  td {
    text-align: left;
    padding: 0.5rem 0.5rem;
  }

  td {
    font-family: var(
      --account-select-font-family-normal,
      var(--font-family-normal)
    );
    font-style: normal;
    font-weight: normal;
    font-size: var(--account-select-font-size-5, var(--font-size-5));
    line-height: var(
      --account-select-font-line-height-1,
      var(--font-line-height-1)
    );
  }

  tbody tr {
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
  }

  tbody tr:hover {
    background-color: var(--account-select-blue-100, var(--blue-100));
    color: var(--account-select-black, var(--black));
  }

  .address-table {
    min-height: 4.5rem;
    max-height: 27rem;
    overflow: auto;
  }

  .selected-row,
  .selected-row:hover {
    background-color: var(--account-select-blue-500, var(--blue-500));
    color: var(--account-select-blue-100, var(--blue-100));
  }

  .asset-td {
    font-weight: bold;
  }
  .w-100 {
    width: 100%;
  }

  .pointer {
    cursor: pointer;
  }
</style>

<div class="address-table">
  <table class="w-100">
    <colgroup>
      <col style="width: 50%;" />
      <col style="width: 28%;" />
      <col style="width: 22%;" />
    </colgroup>
    <thead class="">
      <tr>
        <th>Address</th>
        <th>DPATH</th>
        <th>Asset</th>
      </tr>
    </thead>
    <tbody>
      {#if accounts && accounts.length}
        {#each accounts as account}
          <tr
            class="pointer"
            class:selected-row={accountSelected &&
              accountSelected.address === account.address}
            on:click={() => handleSelectedRow(account)}
          >
            <td style="font-family:'Courier New', Courier, monospace;"
              >{account.address}</td
            >
            <td>{account.derivationPath}</td>
            <td class="asset-td"
              >{utils.formatEther(account.balance.value)}
              {account.balance.asset}</td
            >
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>
