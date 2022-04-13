<script lang="ts">
  import { fade } from 'svelte/transition'
  import CloseButton from '../elements/CloseButton.svelte'
  import AddressTable from '../elements/AddressTable.svelte'
  import TableHeader from '../elements/TableHeader.svelte'
  import { utils } from 'ethers'

  import type { Subject } from 'rxjs'
  import type {
    ScanAccountsOptions,
    SelectAccountOptions,
    Account,
    AccountsList
  } from '../types'

  export let selectAccountOptions: SelectAccountOptions
  export let accounts$: Subject<Account[]>

  const {
    basePaths,
    assets,
    chains,
    scanAccounts,
    supportsCustomPath = true
  } = selectAccountOptions

  let accountsListObject: AccountsList | undefined
  let accountSelected: Account | undefined
  let customDerivationPath = false
  let showEmptyAddresses = false
  let loadingAccounts = false
  let errorFromScan = ''

  let scanAccountOptions: ScanAccountsOptions = {
    derivationPath: (basePaths[0] && basePaths[0].value) || '',
    chainId: chains[0].id || '',
    asset: assets[0] || null
  }

  const handleDerivationPathSelect = (e: Event) => {
    let selectVal = (e.target as HTMLInputElement).value
    if (selectVal === 'customPath') return (customDerivationPath = true)
    scanAccountOptions.derivationPath = selectVal
  }

  const toggleDerivationPathToDropdown = () => {
    customDerivationPath = false
    scanAccountOptions.derivationPath = basePaths[0].value
  }

  const handleCustomPath = (e: Event) => {
    let inputVal = (e.target as HTMLInputElement).value
    scanAccountOptions.derivationPath = inputVal
  }

  const scanAccountsWrap = async (): Promise<void> => {
    try {
      errorFromScan = ''
      loadingAccounts = true
      const allAccounts = await scanAccounts(scanAccountOptions)
      accountsListObject = {
        all: allAccounts,
        filtered: allAccounts.filter(account => {
          return parseFloat(utils.formatEther(account.balance.value)) > 0
        })
      }
      loadingAccounts = false
    } catch (err) {
      const { message } = err as { message: string }
      errorFromScan = message || 'There was an error scanning for accounts'
      loadingAccounts = false
    }
  }

  const connectAccounts = () => {
    if (!accountSelected) return
    accounts$.next([accountSelected])
    resetModal()
  }

  const dismiss = () => {
    accounts$.next([])
    resetModal()
  }

  const resetModal = () => {
    accountSelected = undefined
    accountsListObject = undefined
    showEmptyAddresses = false
    scanAccountOptions.derivationPath =
      (basePaths[0] && basePaths[0].value) || ''
  }
</script>

<style>
  select {
    display: block;
    margin: 0;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    font-family: inherit;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23242835%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, transparent 0%, transparent 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 1rem top 1rem, 0 0;
    background-size: 0.65em auto, 100%;
    scrollbar-width: none;
    width: 100%;
    padding: 0.5rem 1.8rem 0.5rem 1rem;
    border-radius: 8px;
    font-size: var(
      --account-select-font-size-5,
      var(--onboard-font-size-5, var(--font-size-5))
    );
    line-height: var(
      --account-select-font-line-height-1,
      var(--font-line-height-1)
    );
    color: var(
      --account-select-gray-600,
      var(--onboard-gray-600, var(--gray-600))
    );
    transition: all 200ms ease-in-out;
    border: 2px solid
      var(--account-select-gray-200, var(--onboard-gray-200, var(--gray-200)));
    box-sizing: border-box;
    height: 3rem;
    -ms-overflow-style: none;
  }

  select::-webkit-scrollbar,
  input::-webkit-scrollbar {
    display: none;
  }

  select::-ms-expand,
  input::-ms-expand {
    display: none;
  }

  input[type='text'] {
    display: block;
    margin: 0;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    scrollbar-width: none;
    width: 100%;
    padding: 0.5rem 2.6rem 0.5rem 1rem;
    border-radius: 8px;
    font-size: var(
      --account-select-font-size-5,
      var(--onboard-font-size-5, var(--font-size-5))
    );
    line-height: var(
      --account-select-font-line-height-1,
      var(--font-line-height-1)
    );
    color: var(
      --account-select-gray-600,
      var(--onboard-gray-600, var(--gray-600))
    );
    transition: all 200ms ease-in-out;
    border: 2px solid
      var(--account-select-gray-200, var(--onboard-gray-200, var(--gray-200)));
    box-sizing: border-box;
    height: 3rem;
    -ms-overflow-style: none;
  }

  button {
    align-items: center;
    padding: 0.75rem 1.5rem;
    color: var(--account-select-white, var(--onboard-white, var(--white)));
    border-radius: 1.5rem;
    font-family: var(
      --account-select-font-family-normal,
      var(--font-family-normal)
    );
    font-style: normal;
    font-weight: bold;
    font-size: var(
      --account-select-font-size-5,
      var(--onboard-font-size-5, var(--font-size-5))
    );
    line-height: var(
      --account-select-font-line-height-1,
      var(--onboard-line-height-1, var(--line-height-1))
    );
    border: none;
  }

  .connect-btn:disabled {
    background-color: var(
      --account-select-primary-300,
      var(--onboard-primary-300, var(--primary-300))
    );
    cursor: default;
  }

  .connect-btn {
    background-color: var(
      --account-select-primary-500,
      var(--onboard-primary-500, var(--primary-500))
    );
    cursor: pointer;
  }

  .dismiss-action {
    color: var(
      --account-select-primary-500,
      var(--onboard-primary-500, var(--primary-500))
    );
    cursor: pointer;
    margin-left: var(
      --account-select-margin-4,
      var(--onboard-margin-4, var(--margin-4))
    );
  }

  select:hover,
  input:hover {
    border-color: var(
      --account-select-primary-300,
      var(--onboard-primary-300, var(--primary-300))
    );
  }

  select:focus,
  input:focus {
    border-color: var(
      --account-select-primary-500,
      var(--onboard-primary-500, var(--primary-500))
    );
    box-shadow: 0 0 1px 1px
      var(
        --account-select-primary-500,
        var(--onboard-primary-500, var(--primary-500))
      );
    box-shadow: 0 0 0 1px -moz-mac-focusring;
    outline: none;
  }

  select:disabled {
    background-color: var(
      --account-select-gray-100,
      var(--onboard-gray-100, var(--gray-100))
    );
  }

  option {
    font-weight: 300;
  }

  .close {
    cursor: pointer;
    padding: 0.5rem;
  }

  .container {
    font-family: var(
      --account-select-font-family-normal,
      var(--font-family-normal)
    );
    color: var(--account-select-black, var(--onboard-black, var(--black)));
    position: absolute;
    top: 0;
    right: 0;
    z-index: var(
      --onboard-account-select-modal-z-index,
      var(--account-select-modal-z-index)
    );
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, 0.2);
  }

  .hardware-connect-modal {
    width: 50rem;
    max-height: 51.75rem;
    display: table;
    background: var(--account-select-white, var(--onboard-white, var(--white)));
    box-shadow: var(
      --account-select-shadow-1,
      var(--onboard-shadow-1, var(--shadow-1))
    );
    border-radius: 1.5rem;
  }

  .account-select-modal-position {
    position: absolute;
    top: var(
      --onboard-account-select-modal-top,
      var(--account-select-modal-top)
    );
    bottom: var(
      --onboard-account-select-modal-bottom,
      var(--account-select-modal-bottom)
    );
    left: var(
      --onboard-account-select-modal-left,
      var(--account-select-modal-left)
    );
    right: var(
      --onboard-account-select-modal-right,
      var(--account-select-modal-right)
    );
  }

  .connect-wallet-header {
    position: relative;
    background-color: var(
      --account-select-gray-100,
      var(--onboard-gray-100, var(--gray-100))
    );
    border-radius: 1.5rem 1.5rem 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .modal-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    padding-top: 0;
  }

  .control-label {
    font-family: var(
      --account-select-font-family-normal,
      var(--font-family-normal)
    );
    font-style: normal;
    font-weight: bold;
    font-size: var(
      --account-select-font-size-5,
      var(--onboard-font-size-5, var(--font-size-5))
    );
    line-height: var(
      --account-select-font-line-height-1,
      var(--font-line-height-1)
    );
    margin-top: var(
      --account-select-margin-5,
      var(--onboard-margin-5, var(--margin-5))
    );
    margin-bottom: var(
      --account-select-margin-5,
      var(--onboard-margin-5, var(--margin-5))
    );
    color: var(
      --account-select-gray-700,
      var(--onboard-gray-700, var(--gray-700))
    );
  }

  .base-path-select {
    min-width: 20rem;
  }

  .asset-select {
    width: 6rem;
  }

  .network-select {
    min-width: 12rem;
  }

  .w-100 {
    width: 100%;
  }

  .base-path-container {
    position: relative;
    margin-right: var(
      --account-select-margin-5,
      var(--onboard-margin-5, var(--margin-5))
    );
  }

  .input-select {
    background-image: url(data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23242835%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E),
      linear-gradient(to bottom, transparent 0%, transparent 100%);
    background-repeat: no-repeat, repeat;
    background-position: center;
    background-size: 0.65em auto, 100%;
    position: absolute;
    top: 2.7rem;
    right: 0.2rem;
    width: 2.5rem;
    height: 2.5rem;
    background-color: var(
      --account-select-white,
      var(--onboard-white, var(--white))
    );
    border-radius: 1rem;
  }

  .asset-container {
    margin-right: var(
      --account-select-margin-5,
      var(--onboard-margin-5, var(--margin-5))
    );
  }

  .table-section {
    max-height: 31.8rem;
    padding: 1rem;
  }

  .table-container {
    background: var(--account-select-white, var(--onboard-white, var(--white)));
    border: 2px solid
      var(--account-select-gray-200, var(--onboard-gray-200, var(--gray-200)));
    box-sizing: border-box;
    border-radius: 0.5rem;
  }

  .address-found-count {
    padding: 1rem;
    color: var(
      --account-select-gray-500,
      var(--onboard-gray-500, var(--gray-500))
    );
  }
</style>

<div class="container">
  <div
    class="hardware-connect-modal account-select-modal-position"
    transition:fade
  >
    <header class="connect-wallet-header">
      <div />
      <div class="close" on:click={dismiss}>
        <CloseButton />
      </div>
    </header>
    <section class="modal-controls">
      <div class="w-100 base-path-container">
        <h4 class="control-label">Select Base Path</h4>
        {#if customDerivationPath}
          <input
            type="text"
            class="base-path-select"
            placeholder="type/your/custom/path..."
            on:change={handleCustomPath}
          />
          <span
            class="input-select"
            on:click={toggleDerivationPathToDropdown}
          />
        {:else if !customDerivationPath}
          <select
            class="base-path-select"
            on:change={handleDerivationPathSelect}
          >
            {#each basePaths as path}
              <option value={path.value}>
                {path.label} - {path.value}
              </option>
            {/each}
            {#if supportsCustomPath}
              <option value="customPath"> Custom Derivation Path </option>
            {/if}
          </select>
        {/if}
      </div>

      <div class="asset-container">
        <h4 class="control-label">Asset</h4>
        <select class="asset-select" bind:value={scanAccountOptions['asset']}>
          {#each assets as asset}
            <option value={asset}>
              {asset.label}
            </option>
          {/each}
        </select>
      </div>

      <div class="network-container">
        <h4 class="control-label">Network</h4>
        <select
          bind:value={scanAccountOptions['chainId']}
          class="network-select"
        >
          {#each chains as chain}
            <option value={chain.id}>
              {chain.label}
            </option>
          {/each}
        </select>
      </div>
    </section>
    <section class="table-section">
      <div class="w-100 table-container">
        <TableHeader
          scanAccounts={scanAccountsWrap}
          {loadingAccounts}
          {errorFromScan}
          bind:showEmptyAddresses
        />
        <AddressTable
          {accountsListObject}
          {showEmptyAddresses}
          bind:accountSelected
        />
      </div>
    </section>

    <section>
      <div class="address-found-count">
        {#if showEmptyAddresses}
          {(accountsListObject && accountsListObject.all.length) || 0} total address{accountsListObject &&
          accountsListObject.all.length !== 1
            ? 'es'
            : ''} found
        {/if}
        {#if !showEmptyAddresses}
          {(accountsListObject && accountsListObject.filtered.length) || 0} total
          address{accountsListObject && accountsListObject.filtered.length !== 1
            ? 'es'
            : ''} found
        {/if}
      </div>
      <div class="modal-controls">
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
</div>
