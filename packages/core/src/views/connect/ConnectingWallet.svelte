<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { createEventDispatcher } from 'svelte'
  import { ErrorCodes } from '@bn-onboard/common'

  import { requestAccounts } from '../../provider'
  import { updateWallet } from '../../store/actions'
  import { internalState$ } from '../../streams'
  import type { WalletState } from '../../types'
  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import PendingStatusIcon from '../shared/PendingStatusIcon.svelte'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'
  import defaultAppIcon from '../../icons/default-app-icon'
  import en from '../../i18n/en.json'

  export let primaryWallet: WalletState
  export let next: () => void
  export let back: () => void
  export let deselectWallet: (label: string) => void

  let connectionRejected: boolean = false

  const { appMetadata } = internalState$.getValue()

  const dispatch = createEventDispatcher<{ connectionRejected: boolean }>()

  async function connect() {
    dispatch('connectionRejected', false)
    connectionRejected = false

    const { provider, label } = primaryWallet

    try {
      const blankAccountDetails = {
        ens: null,
        balance: null
      }

      const [address] = await requestAccounts(provider)

      // canceled previous request
      if (!address) {
        return
      }

      const update = {
        accounts: [{ address, ...blankAccountDetails }]
      }

      updateWallet(label, update)
      next()
    } catch (error) {
      console.log({ error })
      const { code } = error as { code: number; message: string }

      // user rejected account access
      if (code === ErrorCodes.ACCOUNT_ACCESS_REJECTED) {
        connectionRejected = true
        dispatch('connectionRejected', true)
        return
      }

      // account access has already been requested and is awaiting approval
      if (code === ErrorCodes.ACCOUNT_ACCESS_ALREADY_REQUESTED) {
        return
      }
    }
  }

  connect()
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--onboard-spacing-4, var(--spacing-4));
  }

  .connecting-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: var(--onboard-spacing-4, var(--spacing-4));
    transition: background-color 100ms ease-in-out,
      border-color 100ms ease-in-out;
    border-radius: 24px;
    background-color: var(--onboard-success-100, var(--success-100));
    border: 1px solid;
    border-color: var(--onboard-success-600, var(--success-600));
    box-sizing: border-box;
  }

  .connecting-container.warning {
    background-color: var(--onboard-warning-100, var(--warning-100));
    border-color: var(--onboard-warning-400, var(--warning-400));
  }

  .rejected-cta {
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    color: var(--onboard-blue-500, var(--blue-500));
    cursor: pointer;
  }

  .onboard-button-primary {
    position: absolute;
    bottom: var(--onboard-spacing-3, var(--spacing-3));
    cursor: pointer;
  }

  .centered-flex-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .ml {
    margin-left: var(--onboard-spacing-4, var(--spacing-4));
  }
</style>

<div class="container">
  <div class="connecting-container" class:warning={connectionRejected}>
    {#if connectionRejected}
      <div style="display: flex;">
        <WalletAppBadge
          size={48}
          border="yellow"
          icon={appMetadata?.icon || defaultAppIcon}
        />
        <div class="centered-flex-column ml">
          <div class="text">
            {$_('connect.connectingWallet.rejectedText', {
              default: en.connect.connectingWallet.rejectedText
            })}
          </div>
          <div class="rejected-cta text" on:click={connect}>
            {$_('connect.connectingWallet.rejectedCTA', {
              default: en.connect.connectingWallet.rejectedCTA
            })}
          </div>
        </div>
      </div>
    {:else}
      <WalletAppBadge
        size={48}
        border="gray"
        background={appMetadata?.icon ? 'white' : 'lightGray'}
        icon={appMetadata?.icon || defaultAppIcon}
      >
        <SuccessStatusIcon slot="status" size={17} />
      </WalletAppBadge>

      <div class="text">
        {$_('connect.connectingWallet.mainText', {
          default: en.connect.connectingWallet.mainText
        })}
      </div>

      <WalletAppBadge
        size={48}
        border="yellow"
        background="lightGray"
        icon={primaryWallet.icon}
      >
        <PendingStatusIcon slot="status" size={17} />
      </WalletAppBadge>
    {/if}
  </div>

  <button
    on:click={() => {
      deselectWallet(primaryWallet.label)
      back()
    }}
    class="onboard-button-primary"
    >{$_('connect.connectingWallet.primaryButton', {
      default: en.connect.connectingWallet.primaryButton
    })}</button
  >
</div>
