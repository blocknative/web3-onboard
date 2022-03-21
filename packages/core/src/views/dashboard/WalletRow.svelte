<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { fade } from 'svelte/transition'
  import { ProviderRpcErrorCode } from '@web3-onboard/common'
  import type { Account, WalletState } from '../../types'
  import { shortenAddress, shortenEns } from '../../utils'
  import en from '../../i18n/en.json'
  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'
  import elipsisIcon from '../../icons/elipsis'
  import { addWallet } from '../../store/actions'
  import disconnect from '../../disconnect'
  import { selectAccounts } from '../../provider'
  import { connectWallet$ } from '../../streams'

  export let wallet: WalletState
  export let primary: boolean

  let showMenu = ''

  function formatBalance(
    balance: WalletState['accounts']['0']['balance']
  ): string {
    const [asset] = Object.keys(balance)
    return `${
      balance[asset].length > 8 ? balance[asset].slice(0, 8) : balance[asset]
    } ${asset}`
  }

  function setPrimaryWallet(wallet: WalletState, account: Account): void {
    wallet.accounts = [
      account,
      ...wallet.accounts.filter(({ address }) => address !== account.address)
    ]
    addWallet(wallet)
  }

  async function selectAnotherAccount(wallet: WalletState) {
    try {
      await selectAccounts(wallet.provider)
    } catch (error) {
      const { code } = error as { code: number }

      if (
        code === ProviderRpcErrorCode.UNSUPPORTED_METHOD ||
        code === ProviderRpcErrorCode.DOES_NOT_EXIST
      ) {
        connectWallet$.next({
          inProgress: false,
          actionRequired: wallet.label
        })
      }
    }
  }
</script>

<style>
  .container {
    padding: 0.25rem;
    margin-bottom: 0.25rem;
    width: 100%;
    font-size: var(--onboard-font-size-5, var(--font-size-5));
    line-height: var(--onboard-font-line-height-2, var(--font-line-height-2));
    border-radius: 12px;
    transition: background-color 150ms ease-in-out;
  }

  .container:hover {
    background-color: var(--onboard-gray-500, var(--gray-500));
  }

  .container.primary:hover {
    background-color: var(--onboard-gray-700, var(--gray-700));
  }

  .address-ens {
    margin-left: 0.5rem;
    font-weight: 700;
    color: var(--onboard-primary-100, var(--primary-100));
  }

  .balance {
    color: var(--onboard-gray-300, var(--gray-300));
  }

  .elipsis {
    height: 24px;
    width: 24px;
    padding: 4px;
    margin: 0 4px 0 8px;
    border-radius: 24px;
    color: var(--onboard-gray-400, var(--gray-400));
    transition: color 150ms ease-in-out, background-color 150ms ease-in-out;
  }

  .elipsis:hover {
    color: var(--onboard-gray-100, var(--gray-100));
  }

  .elipsis.active {
    background-color: var(--onboard-gray-400, var(--gray-400));
    color: var(--onboard-gray-100, var(--gray-100));
  }

  .menu {
    background: var(--onboard-white, var(--white));
    border: 1px solid var(--onboard-gray-100, var(--gray-100));
    border-radius: 8px;
    list-style-type: none;
    right: 0.25rem;
    top: 1.75rem;
    margin: 0;
    padding: 0;
    width: max-content;
    z-index: 1;
  }

  .menu li {
    color: var(--onboard-primary-500, var(--primary-500));
    font-size: var(--onboard-font-size-5, var(--font-size-5));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    margin: 12px 16px;
  }
</style>

{#each wallet.accounts as { address, ens, balance }, i}
  <div
    on:click={() => setPrimaryWallet(wallet, { address, ens, balance })}
    class:primary={primary && i === 0}
    class="container flex items-center justify-between pointer"
  >
    <div class="flex items-center">
      <div class="flex items-center relative">
        <!-- WALLET ICON -->
        <WalletAppBadge
          size={32}
          padding={4}
          background="custom"
          color="#EFF1FC"
          customBackgroundColor={primary && i === 0
            ? 'rgba(24, 206, 102, 0.2)'
            : 'rgba(235, 235, 237, 0.1)'}
          border={primary && i === 0 ? 'green' : 'gray'}
          radius={8}
          icon={wallet.icon}
        />
        {#if primary && i === 0}
          <div style="right: -4px; bottom: -4px;" class="drop-shadow absolute">
            <SuccessStatusIcon size={12} />
          </div>
        {/if}
      </div>

      <!-- ADDRESS / ENS -->
      <span class="address-ens"
        >{ens ? shortenEns(ens.name) : shortenAddress(address)}</span
      >
    </div>

    <div class="flex items-center">
      <!-- BALANCE -->
      {#if balance}
        <span in:fade class="balance">{formatBalance(balance)}</span>
      {/if}

      <!-- ELIPSIS -->
      <div
        on:click|stopPropagation={() =>
          (showMenu = showMenu === address ? '' : address)}
        class:active={showMenu === address}
        class="elipsis pointer flex items-center justify-center relative"
      >
        {@html elipsisIcon}

        {#if showMenu === address}
          <ul transition:fade class="menu absolute">
            <li on:click={() => selectAnotherAccount(wallet)}>
              {$_('dashboard.addAccount', { default: en.dashboard.addAccount })}
            </li>
            {#if !(primary && i === 0)}
              <li
                on:click={() =>
                  setPrimaryWallet(wallet, { address, ens, balance })}
              >
                {$_('dashboard.setPrimaryAccount', {
                  default: en.dashboard.setPrimaryAccount
                })}
              </li>
            {/if}
            <li on:click={() => disconnect({ label: wallet.label })}>
              {$_('dashboard.disconnectWallet', {
                default: en.dashboard.disconnectWallet
              })}
            </li>
          </ul>
        {/if}
      </div>
    </div>
  </div>
{/each}
