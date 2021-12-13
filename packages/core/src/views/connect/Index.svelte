<script lang="ts">
  import type { WalletModule } from '@bn-onboard/types'
  import { pluck, shareReplay } from 'rxjs'
  import { _ } from 'svelte-i18n'
  import { BigNumber } from 'ethers'
  import EventEmitter from 'eventemitter3'

  import type {
    ConnectOptions,
    WalletWithLoadingIcon,
    WalletWithLoadedIcon,
    i18n
  } from '../../types'

  import Modal from '../shared/Modal.svelte'
  import SelectingWallet from './SelectingWallet.svelte'
  import InstallWallet from './InstallWallet.svelte'
  import ConnectingWallet from './ConnectingWallet.svelte'
  import ConnectedWallet from './ConnectedWallet.svelte'
  import CloseButton from '../shared/CloseButton.svelte'
  import Sidebar from './Sidebar.svelte'

  import { connectWallet$, internalState$, wallets$ } from '../../streams'
  import { getChainId, trackWallet } from '../../provider'
  import { state } from '../../store'
  import { addWallet, removeWallet } from '../../store/actions'
  import en from '../../i18n/en.json'

  export let options: ConnectOptions

  const { walletModules, appMetadata } = internalState$.getValue()
  const { autoSelect } = options

  const primaryWallet$ = wallets$.pipe(pluck(0), shareReplay(1))

  let loading = true
  let connectionRejected: string = 'false'
  let wallets: WalletWithLoadingIcon[] = []
  let selectedWallet: string

  let windowWidth: number

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

  async function selectWallet({
    label,
    icon,
    getInterface
  }: WalletWithLoadedIcon): Promise<void> {
    const existingWallet = state
      .get()
      .wallets.find(wallet => wallet.label === label)

    if (existingWallet) {
      addWallet(existingWallet)
      close()
      return
    }

    const { chains } = state.get()

    const { provider } = await getInterface({
      chains,
      BigNumber,
      EventEmitter,
      appMetadata
    })

    const chain = await getChainId(provider)

    addWallet({
      label,
      icon,
      provider,
      accounts: [],
      chain
    })

    trackWallet(provider, label)

    selectedWallet = label

    setStep('connectingWallet')
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

  type Step = keyof i18n['connect']
  let step: Step = 'selectingWallet'

  function setStep(nextStep: Step) {
    step = nextStep
  }

  function deselectWallet(label: string) {
    removeWallet(label)
    selectedWallet = ''
  }
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
    padding: var(--onboard-spacing-4, var(--spacing-4));
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
    right: var(--onboard-spacing-5, var(--spacing-5));
  }

  @media all and (max-width: 520px) {
    .content {
      width: 100%;
    }

    .container {
      height: auto;
      min-height: 228px;
    }
  }
</style>

<svelte:window bind:innerWidth={windowWidth} />

{#if !loading}
  <Modal {close}>
    <div class="container">
      {#if windowWidth >= 809}
        <Sidebar {step} />
      {/if}

      <div class="content">
        <div class="header">
          <h4 class="header-heading">
            {$_(`connect.${step}.header`, {
              default: en.connect[step].header,
              values: {
                connectionRejected,
                wallet: selectedWallet
              }
            })}
          </h4>
          <div on:click={close} class="button-container">
            <CloseButton />
          </div>
        </div>
        {#if step === 'selectingWallet'}
          {#if wallets.length}
            <SelectingWallet {selectWallet} {wallets} />
          {:else}
            <InstallWallet />
          {/if}
        {/if}

        {#if step === 'connectingWallet' && selectedWallet}
          <ConnectingWallet
            on:connectionRejected={({ detail }) => {
              connectionRejected = String(detail)
            }}
            {deselectWallet}
            primaryWallet={$primaryWallet$}
            next={() => setStep('connectedWallet')}
            back={() => setStep('selectingWallet')}
          />
        {/if}

        {#if step === 'connectedWallet' && selectedWallet}
          <ConnectedWallet primaryWallet={$primaryWallet$} />
        {/if}
      </div>
    </div>
  </Modal>
{/if}
