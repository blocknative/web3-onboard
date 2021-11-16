<script lang="ts">
  import type { WalletModule } from '@bn-onboard/types'
  import { connectWallet$, internalState$ } from '../../streams'

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
  import { getChainId } from '../../provider'
  import Sidebar from './Sidebar.svelte'
  import { state } from '../../store'

  export let options: ConnectOptions

  const { walletModules } = internalState$.getValue()
  const { autoSelect } = options

  let loading = true
  let wallets: WalletWithLoadingIcon[] = []
  let selectedWallet: WalletState

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
    selectedWallet = { ...selectedWallet, ...update }
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

  $: status = !selectedWallet
    ? 'selectingWallet'
    : !selectedWallet.accounts.length
    ? 'connectingWallet'
    : ('connectedWallet' as keyof i18n['connect'])
</script>

<style>
  .container {
    position: relative;
    display: flex;
    font-family: var(--onboard-font-family-normal, var(--font-family-normal));
    line-height: var(--onboard-font-line-height-1, var(--font-line-height-1));
    font-size: var(--onboard-font-size-5, var(--font-size-5));
    height: 382px;
    overflow: hidden;
  }

  .content {
    overflow-y: auto;
  }
</style>

{#if !loading}
  <Modal {close}>
    <div class="container">
      <Sidebar {status} />

      <div class="content">
        {#if status === 'selectingWallet'}
          {#if wallets.length}
            <SelectingWallet {selectWallet} {wallets} />
          {:else}
            <InstallWallet />
          {/if}
        {/if}

        {#if status === 'connectingWallet'}
          <ConnectingWallet {selectedWallet} {updateSelectedWallet} />
        {/if}

        {#if status === 'connectedWallet'}
          <ConnectedWallet {selectedWallet} />
        {/if}
      </div>
    </div>
  </Modal>
{/if}
