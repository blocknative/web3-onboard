<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { fade } from 'svelte/transition'
  import { ProviderRpcErrorCode } from '@web3-onboard/common'
  import type { WalletState } from '../../types.js'
  import {
    shortenAddress,
    shortenDomain,
    copyWalletAddress
  } from '../../utils.js'
  import en from '../../i18n/en.json'
  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'
  import elipsisIcon from '../../icons/elipsis.js'
  import { setPrimaryWallet } from '../../store/actions.js'
  import disconnect from '../../disconnect.js'
  import { selectAccounts } from '../../provider.js'
  import { connectWallet$ } from '../../streams.js'

  export let wallet: WalletState
  export let primary: boolean

  export function hideMenu() {
    showMenu = ''
  }

  let showMenu = ''

  function formatBalance(
    balance: WalletState['accounts']['0']['balance']
  ): string {
    const [asset] = Object.keys(balance)
    return `${
      balance[asset].length > 8 ? balance[asset].slice(0, 8) : balance[asset]
    } ${asset}`
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

  function changeText() {
    en.accountCenter.copyAddress = 'Copied Successfully'
    setTimeout(hideMenu, 500)
    setTimeout(() => {
      en.accountCenter.copyAddress = 'Copy Wallet address'
    }, 700)
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
    background: var(--onboard-gray-500, var(--gray-500));
  }

  .container:hover > div > span.balance {
    color: var(
      --account-center-maximized-balance-color,
      var(--onboard-gray-100, var(--gray-100))
    );
  }

  .container.primary:hover {
    background: var(
      --account-center-maximized-account-section-background-hover,
      var(--onboard-gray-700, var(--gray-700))
    );
  }

  .address-domain {
    margin-left: 0.5rem;
    font-weight: 700;
    color: var(
      --account-center-maximized-address-color,
      var(--onboard-primary-100, var(--primary-100))
    );
  }

  .balance {
    margin-left: 0.5rem;
    color: var(--onboard-gray-300, var(--gray-300));
    transition: color 150ms ease-in-out, background-color 150ms ease-in-out;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 7.25rem;
    text-align: end;
  }

  .elipsis-container {
    padding: 0.25rem;
    margin-left: 0.25rem;
    border-radius: 24px;
    transition: color 150ms ease-in-out, background-color 150ms ease-in-out;
    background-color: transparent;
    color: var(--onboard-gray-400, var(--gray-400));
  }

  .elipsis {
    width: 24px;
  }

  .elipsis-container:hover {
    color: var(--onboard-gray-100, var(--gray-100));
  }

  .elipsis-container.active {
    background: var(--onboard-gray-700, var(--gray-700));
  }

  .menu {
    background: var(--onboard-white, var(--white));
    border: 1px solid var(--onboard-gray-100, var(--gray-100));
    border-radius: 8px;
    list-style-type: none;
    right: 0.25rem;
    top: 2.25rem;
    margin: 0;
    padding: 0;
    border: none;
    overflow: hidden;
    z-index: 1;
  }

  .menu li {
    color: var(--onboard-primary-500, var(--primary-500));
    font-size: var(--onboard-font-size-5, var(--font-size-5));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    padding: 12px 16px;
    background: var(--onboard-white, var(--white));
    transition: background-color 150ms ease-in-out;
    cursor: pointer;
  }
  .menu li:hover {
    background: var(--onboard-primary-200, var(--primary-200));
  }
</style>

{#each wallet.accounts as { address, ens, uns, balance }, i}
  <div class="relative">
    <div
      on:click={() => setPrimaryWallet(wallet, address)}
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
            <div
              style="right: -5px; bottom: -5px;"
              class="drop-shadow absolute"
            >
              <SuccessStatusIcon size={14} />
            </div>
          {/if}
        </div>

        <!-- ADDRESS / DOMAIN -->
        <span class="address-domain"
          >{ens
            ? shortenDomain(ens.name)
            : uns
            ? shortenDomain(uns.name)
            : shortenAddress(address)}</span
        >
      </div>

      <div class="flex items-center">
        <!-- BALANCE -->
        {#if balance}
          <span in:fade class="balance">{formatBalance(balance)}</span>
        {/if}

        <!-- ELIPSIS -->
        <div class="elipsis-container" class:active={showMenu === address}>
          <div
            on:click|stopPropagation={() =>
              (showMenu = showMenu === address ? '' : address)}
            class="elipsis pointer flex items-center justify-center relative"
          >
            {@html elipsisIcon}
          </div>
        </div>
      </div>
    </div>

    {#if showMenu === address}
      <ul in:fade class="menu absolute">
        <li
          on:click|stopPropagation={() => {
            showMenu = ''
            selectAnotherAccount(wallet)
          }}
        >
          {$_('accountCenter.addAccount', {
            default: en.accountCenter.addAccount
          })}
        </li>
        {#if !(primary && i === 0)}
          <li
            on:click|stopPropagation={() => {
              showMenu = ''
              setPrimaryWallet(wallet, address)
            }}
          >
            {$_('accountCenter.setPrimaryAccount', {
              default: en.accountCenter.setPrimaryAccount
            })}
          </li>
        {/if}
        <li
          on:click|stopPropagation={() => {
            showMenu = ''
            disconnect({ label: wallet.label })
          }}
        >
          {$_('accountCenter.disconnectWallet', {
            default: en.accountCenter.disconnectWallet
          })}
        </li>
        <li
          on:click|stopPropagation={() => {
            copyWalletAddress(ens ? ens.name : uns ? uns.name : address).then(
              () => {
                changeText()
              }
            )
          }}
        >
          {en.accountCenter.copyAddress}
        </li>
      </ul>
    {/if}
  </div>
{/each}
