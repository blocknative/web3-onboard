<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { createEventDispatcher } from 'svelte'
  import { ErrorCodes } from '@bn-onboard/common'

  import { getChainId, requestAccounts, trackWallet } from '../../provider'
  import { internalState$ } from '../../streams'
  import type { WalletState } from '../../types'

  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import PendingStatusIcon from '../shared/PendingStatusIcon.svelte'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'
  import defaultAppIcon from '../../icons/default-app-icon'
  import en from '../../i18n/en.json'
  import { addWallet } from '../../store/actions'

  export let selectedWallet: WalletState
  export let deselectWallet: (label: string) => void
  export let updateSelectedWallet: (update: Partial<WalletState>) => void

  let connectionRejected = false

  const { appMetadata } = internalState$.getValue()

  const dispatch = createEventDispatcher<{ connectionRejected: boolean }>()

  async function connect() {
    dispatch('connectionRejected', false)
    connectionRejected = false

    const { provider, label } = selectedWallet

    try {
      const [address] = await requestAccounts(provider)

      // canceled previous request
      if (!address) {
        return
      }

      const chain = await getChainId(provider)

      const update: Pick<WalletState, 'accounts' | 'chain'> = {
        accounts: [{ address, ens: null, balance: null }],
        chain
      }

      addWallet({ ...selectedWallet, ...update })
      trackWallet(provider, label)
      updateSelectedWallet(update)
    } catch (error) {
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
          icon={(appMetadata && appMetadata.icon) || defaultAppIcon}
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
        background={appMetadata && appMetadata.icon ? 'white' : 'lightGray'}
        icon={(appMetadata && appMetadata.icon) || defaultAppIcon}
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
        icon={selectedWallet.icon}
      >
        <PendingStatusIcon slot="status" size={17} />
      </WalletAppBadge>
    {/if}
  </div>

  <button
    on:click={() => {
      deselectWallet(selectedWallet.label)
    }}
    class="onboard-button-primary"
    >{$_('connect.connectingWallet.primaryButton', {
      default: en.connect.connectingWallet.primaryButton
    })}</button
  >
</div>
