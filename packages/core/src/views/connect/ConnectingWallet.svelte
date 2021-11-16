<script lang="ts">
  import { _ } from 'svelte-i18n'
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

  let connectingError = ''
  const { appMetadata } = internalState$.getValue()

  async function connect() {
    connectingError = ''

    const { provider, label } = selectedWallet

    try {
      const blankAccountDetails = {
        ens: null,
        balance: null
      }

      const [address] = await requestAccounts(provider)

      const update = {
        accounts: [{ address, ...blankAccountDetails }]
      }

      updateSelectedWallet(update)

      const exists = !!state
        .get()
        .wallets.find(wallet => wallet.label === label)

      if (!exists) {
        trackWallet(provider, label)
        addWallet({ ...selectedWallet, ...update })
      }
    } catch (error) {
      const { code, message } = error as { code: number; message: string }

      if (code === 4001) {
        connectingError = 'Connection Rejected'
      } else {
        connectingError = message
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
    border-radius: 24px;
    background: var(--onboard-success-100, var(--success-100));
    border: 1px solid var(--onboard-success-600, var(--success-600));
    width: 441px;
    box-sizing: border-box;
  }

  .left-side {
    display: flex;
    align-items: center;
  }

  .text {
    margin-left: 1rem;
  }

  .button-1 {
    position: absolute;
    bottom: 1.5rem;
  }
</style>

<div class="container">
  <div class="connecting-container">
    <div class="left-side">
      <WalletAppBadge
        size={48}
        border="darkGreen"
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
  </div>

  <button class="button-1"
    >{$_('connect.connectingWallet.primaryButton', {
      default: en.connect.connectingWallet.primaryButton
    })}</button
  >
</div>

<!-- {#if connectingError}
  <div>{connectingError}</div>
  <button on:click={connect}>Try again</button>
{/if} -->
