<script>
  export let options
  const { basePaths, assets, chains, scanAccounts, walletIcon } = options

  // Validates current filters to ensure invalid filters are
  // not saved.
  // $: filtersAreValid = $filters.every(
  //   ({ properties, values, comparison, value }) =>
  //     (properties.length &&
  //       (value || values.length || properties.includes('exists'))) ||
  //     comparison === 'exists'
  // )

  function handleSelect(filterIndex, option, optionIndex) {
    // return event => {

    //   setTimeout(() => modalAutoScroll(scrollTo), 20)
    // }
  }

  function handleSelectValue(filterIndex) {
    return event => {

    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      submitButton.click()
    }
  }
</script>

<style>

  select {
    min-width: 230px;
  }

  option {
    font-weight: 300;
  }


</style>


<!-- type API = (options: SelectAccountOptions) => Promise<Account>

type SelectAccountOptions = {
  basePaths: BasePath[] // the paths to display in the base path selector
  assets: Asset[] // the selectable assets to scan for a balance
  chains: Chain[] // the selectable chains/networks to scan for balance
  scanAccounts: ScanAccounts
  walletIcon: string
}

type BasePath = {
  label: string // eg - Ethereum Ledger Live 
  value: DerivationPath
}

type DerivationPath = string // eg - m/44'/60'

type Asset = {
  label: string // eg - ETH
  address?: string // if is a token, address to query contract
}

type Chain = {
  label: string // eg - Ethereum, Rinkeby, Matic
  id: string // 0x prefixed hex string | eg - 0x1 (mainnet ethereum), 0x4 (rinkeby), 0x89 (polygon matic)
}

type ScanAccounts = (options: ScanAccountsOptions) => Promise<Account[]>

type ScanAccountsOptions = {
  derivationPath: DerivationPath
  chainId: Chain['id']
  asset: Asset
}

type Account = {
  address: string
  derivationPath: DerivationPath
  balance: {
    asset: Asset['label']
    value: string
  }
} -->

<div>
  <div class='modal-controls'>
    <div class="flex flex-column pa2 w-100" on:keydown={handleKeyDown}>
      <div class="pa2">
        <h4 class="mv2">
          Select Base Path
        </h4>
        {#each basePaths as path, pathIndex}
          <div
            transition:fade
            class="flex items-start w-100"
            style={`padding-left: ${pathIndex * 2}rem;`}
          >
            <!-- svelte-ignore a11y-no-onchange -->
            <select
              on:change={() =>
                setTimeout(() => modalAutoScroll(scrollTo), 20)}
              bind:value={path.value}
            >
            <option
              value={path.value}
            >
              {path.label} - {path.value}
            </option>
            </select>
          </div>
        {/each}

      </div>
    </div>


    <div class="flex flex-column pa2 w-100" on:keydown={handleKeyDown}>
      <div class="pa2">
        <h4 class="mv2">
          Asset
        </h4>
        {#each assets as asset, assetIndex}
          <div
            transition:fade
            class="flex items-start w-100"
            style={`padding-left: ${assetIndex * 2}rem;`}
          >
            <!-- svelte-ignore a11y-no-onchange -->
            <select
              on:change={() =>
                setTimeout(() => modalAutoScroll(scrollTo), 20)}
              bind:value={asset.label}
            >
            <option
              value={asset.label}
            >
              {asset.label}
            </option>
            </select>
          </div>
        {/each}

      </div>
    </div>


    <div class="flex flex-column pa2 w-100" on:keydown={handleKeyDown}>
      <div class="pa2">
        <h4 class="mv2">
          Network
        </h4>
        {#each chains as chain, chainIndex}
          <div
            transition:fade
            class="flex items-start w-100"
            style={`padding-left: ${chainIndex * 2}rem;`}
          >
            <!-- svelte-ignore a11y-no-onchange -->
            <select
              on:change={() =>
                setTimeout(() => modalAutoScroll(scrollTo), 20)}
              bind:value={chain.id}
            >
            <option
              value={chain.id}
            >
              {chain.label}
            </option>
            </select>
          </div>
        {/each}

      </div>
    </div>
  </div>
  <!-- <div class='table-container'>
    <div class='table-controls'>
      <div class="flex items-center ph2 pt2">
        <input
          id="show-empty-addresses"
          type="checkbox"
          bind:checked={showEmptyAddresses}
          class="ml2 h-100"
        />
        <label for="legacy" class="ml2 cursor-pointer font-5"
          >Show Empty Addresses</label
        >
      </div>

      <button
        class="button-default-solid rounded medium"
        id="scan-accounts"
        disabled={!selectionsMade}
        on:click={scanAccounts}
      >
        Scan Accounts
      </button>
    </div>
    <div class='address-table'>

    </div>
    <div class='address-found-count'>

    </div>
    <div class='modal-controls'>
      <button
        class="button-default rounded medium"
        id="dismiss-account-select"
        bind:this={submitButton}
        on:click={scanAccounts}
      >
        Dismiss
      </button>
      <button
        class="button-default-solid rounded medium"
        id="connect-accounts"
        disabled={!selectionsMade}
        bind:this={submitButton}
        on:click={connectAccounts}
      >
        Connect
      </button>
    </div> -->

  <!-- </div> -->
</div>
