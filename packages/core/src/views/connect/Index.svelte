<script lang="ts">
  import type { WalletModule } from '@bn-onboard/types'
  import { _ } from 'svelte-i18n'

  import type {
    ConnectOptions,
    WalletState,
    WalletWithLoadingIcon,
    WalletWithLoadedIcon,
    i18n
  } from '../../types'

  import Modal from '../shared/Modal.svelte'
  import SelectingWallet from './SelectingWallet.svelte'
  import InstallWallet from './InstallWallet.svelte'
  import ConnectingWallet from './ConnectingWallet.svelte'
  import ConnectedWallet from './ConnectedWallet.svelte'

  import { connectWallet$, internalState$ } from '../../streams'
  import { getChainId } from '../../provider'
  import Sidebar from './Sidebar.svelte'
  import { state } from '../../store'
  import en from '../../i18n/en.json'
  import CloseButton from '../shared/CloseButton.svelte'

  export let options: ConnectOptions

  const { walletModules } = internalState$.getValue()
  const { autoSelect } = options

  let loading = true
  let connectionRejected: string = 'false'
  let wallets: WalletWithLoadingIcon[] = []
  let selectedWallet: WalletState | null

  const walletToAutoSelect =
    autoSelect &&
    walletModules.find(
      ({ label }) => label.toLowerCase() === autoSelect.toLowerCase()
    )

  if (walletToAutoSelect) {
    autoSelectWallet(walletToAutoSelect)
  } else {
    loadWalletsForSelection()
  }

  async function autoSelectWallet(wallet: WalletModule): Promise<void> {
    const { getIcon, getInterface, label } = wallet
    const icon = await getIcon()
    selectWallet({ label, icon, getInterface })

    loading = false
  }

  async function loadWalletsForSelection() {
    wallets = walletModules.map(({ getIcon, getInterface, label }) => {
      return {
        label,
        icon: getIcon(),
        getInterface
      }
    })

    loading = false
  }

  function close() {
    connectWallet$.next({ inProgress: false })
  }

  function updateSelectedWallet(update: Partial<WalletState>) {
    selectedWallet = { ...(selectedWallet as WalletState), ...update }
  }

  async function selectWallet({
    label,
    icon,
    getInterface
  }: WalletWithLoadedIcon): Promise<void> {
    const existingWallet = state
      .get()
      .wallets.find(wallet => wallet.label === label)

    if (existingWallet) {
      selectedWallet = existingWallet
      return
    }

    const { provider } = await getInterface()
    const chain = await getChainId(provider)

    selectedWallet = {
      label,
      icon,
      provider,
      accounts: [],
      chain
    }
  }

  function unSelectWallet() {
    selectedWallet = null
  }

  $: status = (
    !selectedWallet
      ? 'selectingWallet'
      : !selectedWallet.accounts.length
      ? 'connectingWallet'
      : 'connectedWallet'
  ) as keyof i18n['connect']
</script>

<style>
  .container {
    position: relative;
    display: flex;
    font-family: var(--onboard-font-family-normal, var(--font-family-normal));
    line-height: var(--onboard-font-line-height-1, var(--font-line-height-1));
    font-size: var(--onboard-font-size-5, var(--font-size-5));
    height: 440px;
    overflow: hidden;
  }

  .content {
    overflow-y: auto;
    width: 485px;
  }

  .header {
    position: relative;
    display: flex;
    align-items: center;
    padding: 1rem;
    box-shadow: var(--onboard-shadow-2, var(--shadow-2));
  }

  .header-heading {
    font-family: var(
      --onboard-font-family-semibold,
      var(--font-family-semibold)
    );
    margin: 0;
  }

  .button-container {
    position: absolute;
    right: 0.5rem;
  }
</style>

{#if !loading}
  <Modal {close}>
    <div class="container">
      <Sidebar {status} />

      <div class="content">
        <div class="header">
          <h4 class="header-heading">
            {$_(`connect.${status}.header`, {
              default: en.connect[status].header,
              values: {
                connectionRejected,
                wallet: selectedWallet?.label
              }
            })}
          </h4>
          <div class="button-container">
            <CloseButton />
          </div>
        </div>
        {#if status === 'selectingWallet'}
          {#if wallets.length}
            <SelectingWallet {selectWallet} {wallets} />
          {:else}
            <InstallWallet />
          {/if}
        {/if}

        {#if status === 'connectingWallet' && selectedWallet}
          <ConnectingWallet
            on:connectionRejected={({ detail }) => {
              connectionRejected = String(detail)
            }}
            {selectedWallet}
            {updateSelectedWallet}
            {unSelectWallet}
          />
        {/if}

        {#if status === 'connectedWallet' && selectedWallet}
          <ConnectedWallet {selectedWallet} />
        {/if}
      </div>
    </div>
  </Modal>
{/if}
