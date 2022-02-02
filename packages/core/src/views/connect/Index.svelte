<script lang="ts">
  import { ProviderRpcErrorCode, WalletModule } from '@bn-onboard/common'
  import { _ } from 'svelte-i18n'
  import { BigNumber } from 'ethers'
  import EventEmitter from 'eventemitter3'

  import type {
    ConnectOptions,
    WalletWithLoadingIcon,
    WalletWithLoadedIcon,
    i18n,
    WalletState
  } from '../../types'

  import Modal from '../shared/Modal.svelte'
  import SelectingWallet from './SelectingWallet.svelte'
  import InstallWallet from './InstallWallet.svelte'
  import ConnectingWallet from './ConnectingWallet.svelte'
  import ConnectedWallet from './ConnectedWallet.svelte'
  import CloseButton from '../shared/CloseButton.svelte'
  import Sidebar from './Sidebar.svelte'
  import Agreement from './Agreement.svelte'

  import { connectWallet$, internalState$ } from '../../streams'

  import { state } from '../../store'
  import { addWallet } from '../../store/actions'
  import en from '../../i18n/en.json'
  import { selectAccounts } from '../../provider'

  export let autoSelect: string

  const { walletModules, appMetadata } = internalState$.getValue()

  let loading = true
  let connectionRejected = false
  let wallets: WalletWithLoadingIcon[] = []
  let selectedWallet: WalletState | null
  let agreed: boolean
  // let selectWalletError: string

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
      // set as first wallet
      addWallet(existingWallet)

      try {
        await selectAccounts(existingWallet.provider)
        setStep('connectedWallet')
      } catch (error) {
        const { code } = error as { code: number }

        if (
          code === ProviderRpcErrorCode.UNSUPPORTED_METHOD ||
          code === ProviderRpcErrorCode.DOES_NOT_EXIST
        ) {
          connectWallet$.next({
            inProgress: false,
            actionRequired: existingWallet.label
          })
        }
      }

      selectedWallet = existingWallet

      return
    }

    const { chains } = state.get()

    try {
      const { provider } = await getInterface({
        chains,
        BigNumber,
        EventEmitter,
        appMetadata
      })

      selectedWallet = {
        label,
        icon,
        provider,
        accounts: [],
        chain: '0x1'
      }
    } catch (error) {
      // selectWalletError = (error as Error).message
      console.error(error)
    }

    setStep('connectingWallet')
  }

  function deselectWallet() {
    selectedWallet = null
  }

  function updateSelectedWallet(update: Partial<WalletState> | WalletState) {
    selectedWallet = { ...selectedWallet, ...update }
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

  let step: keyof i18n['connect'] = 'selectingWallet'

  function setStep(update: keyof i18n['connect']) {
    step = update
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
    width: 485px;
    display: flex;
    flex-direction: column;
  }

  .scroll-container {
    overflow-y: auto;
    transition: opacity 250ms ease-in-out;
  }

  .header {
    position: relative;
    display: flex;
    align-items: center;
    box-shadow: var(--onboard-shadow-2, var(--shadow-2));
  }

  .header-heading {
    font-family: var(
      --onboard-font-family-semibold,
      var(--font-family-semibold)
    );
    margin: var(--onboard-spacing-4, var(--spacing-4));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
  }

  .button-container {
    position: absolute;
    right: 0;
    top: 0;
  }

  .disabled {
    opacity: 0.2;
    pointer-events: none;
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
                wallet: selectedWallet?.label
              }
            })}
          </h4>
          <div on:click={close} class="button-container">
            <CloseButton />
          </div>
        </div>

        <div class="scroll-container">
          {#if step === 'selectingWallet'}
            {#if wallets.length}
              <Agreement bind:agreed />

              <div class:disabled={!agreed}>
                <SelectingWallet {selectWallet} {wallets} />
              </div>
            {:else}
              <InstallWallet />
            {/if}
          {/if}

          {#if step === 'connectingWallet' && selectedWallet}
            <ConnectingWallet
              on:connectionRejected={({ detail }) => {
                connectionRejected = detail
              }}
              {setStep}
              {deselectWallet}
              {selectedWallet}
              {updateSelectedWallet}
            />
          {/if}

          {#if step === 'connectedWallet' && selectedWallet}
            <ConnectedWallet {selectedWallet} />
          {/if}
        </div>
      </div>
    </div>
  </Modal>
{/if}
