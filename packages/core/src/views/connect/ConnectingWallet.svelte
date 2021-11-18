<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { createEventDispatcher } from 'svelte'

  import { requestAccounts, trackWallet } from '../../provider'
  import { state } from '../../store'
  import { addWallet } from '../../store/actions'
  import { internalState$ } from '../../streams'
  import type { WalletState } from '../../types'
  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import PendingStatusIcon from '../shared/PendingStatusIcon.svelte'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'
  import defaultAppIcon from '../../icons/default-app-icon'
  import en from '../../i18n/en.json'

  export let selectedWallet: WalletState

  export let updateSelectedWallet: (
    update: WalletState | Partial<WalletState>
  ) => void

  export let unSelectWallet: () => void

  let connectionRejected: boolean = false
  let connectionWarning: boolean = false

  const { appMetadata } = internalState$.getValue()

  const dispatch = createEventDispatcher<{ connectionRejected: boolean }>()

  function walletAdded(label: WalletState['label']) {
    return !!state.get().wallets.find(wallet => wallet.label === label)
  }

  async function connect() {
    dispatch('connectionRejected', false)
    connectionRejected = false
    connectionWarning = false

    const { provider, label } = selectedWallet

    try {
      const blankAccountDetails = {
        ens: null,
        balance: null
      }

      const [address] = await requestAccounts(provider)

      // canceled previous request
      if (!address) return

      const update = {
        accounts: [{ address, ...blankAccountDetails }]
      }

      updateSelectedWallet(update)

      if (!walletAdded(label)) {
        addWallet({ ...selectedWallet, ...update })
        trackWallet(provider, label)
      }

      connectionWarning = false
    } catch (error) {
      const { code } = error as { code: number; message: string }

      if (code === 4001) {
        connectionRejected = true
        dispatch('connectionRejected', true)
        return
      }

      if (code === -32002) {
        // show warning message that the user needs to connect to wallet
        connectionWarning = true

        // track wallet and wait for accounts to be connected
        if (!walletAdded(label)) {
          addWallet(selectedWallet)
          trackWallet(provider, label)
        }
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
    padding: 1rem;
  }

  .connecting-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    transition: background-color 100ms ease-in-out,
      border-color 100ms ease-in-out;
    border-radius: 24px;
    background-color: var(--onboard-success-100, var(--success-100));
    border: 1px solid;
    border-color: var(--onboard-success-600, var(--success-600));
    width: 441px;
    box-sizing: border-box;
  }

  .connecting-container.warning {
    background-color: var(--onboard-warning-100, var(--warning-100));
    border-color: var(--onboard-warning-400, var(--warning-400));
  }

  .left-side {
    display: flex;
    align-items: center;
  }

  .text {
    margin-left: 1rem;
  }

  .rejected-cta {
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
    color: var(--onboard-blue-500, var(--blue-500));
    cursor: pointer;
  }

  .button-1 {
    position: absolute;
    bottom: 1.5rem;
    cursor: pointer;
  }

  .centered-flex-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
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
        <div class="centered-flex-column">
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
      <div class="left-side">
        <WalletAppBadge
          size={48}
          border="gray"
          icon={appMetadata?.icon || defaultAppIcon}
        >
          <SuccessStatusIcon slot="status" size={17} />
        </WalletAppBadge>

        <div class="text">
          {$_('connect.connectingWallet.mainText', {
            default: en.connect.connectingWallet.mainText
          })}
        </div>
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

  <button on:click={unSelectWallet} class="button-1"
    >{$_('connect.connectingWallet.primaryButton', {
      default: en.connect.connectingWallet.primaryButton
    })}</button
  >
</div>

<!-- {#if connectionWarning}
  <div>{connectingError}</div>
  <button on:click={connect}>Try again</button>
{/if} -->
