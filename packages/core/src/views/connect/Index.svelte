<script lang="ts">
  import { ProviderRpcErrorCode, WalletModule } from '@web3-onboard/common'
  import EventEmitter from 'eventemitter3'
  import { _ } from 'svelte-i18n'
  import { BigNumber } from 'ethers'
  import {
    BehaviorSubject,
    distinctUntilChanged,
    filter,
    firstValueFrom,
    mapTo,
    Subject,
    take,
    takeUntil
  } from 'rxjs'

  import en from '../../i18n/en.json'
  import { listenAccountsChanged, selectAccounts } from '../../provider.js'
  import { state } from '../../store/index.js'
  import { connectWallet$, onDestroy$ } from '../../streams.js'
  import { addWallet, updateAccount } from '../../store/actions.js'
  import { validEnsChain, isSVG } from '../../utils.js'
  import { Modal, CloseButton } from '../shared'
  import Agreement from './Agreement.svelte'
  import ConnectedWallet from './ConnectedWallet.svelte'
  import ConnectingWallet from './ConnectingWallet.svelte'
  import InstallWallet from './InstallWallet.svelte'
  import SelectingWallet from './SelectingWallet.svelte'
  import Sidebar from './Sidebar.svelte'
  import { getBlocknativeSdk } from '../../services.js'
  import { configuration } from '../../configuration.js'
  import { blocknative } from '../../icons'

  import {
    getChainId,
    requestAccounts,
    trackWallet,
    getBalance,
    getEns
  } from '../../provider.js'

  import type {
    ConnectOptions,
    i18n,
    WalletState,
    WalletWithLoadingIcon
  } from '../../types.js'

  export let autoSelect: ConnectOptions['autoSelect']

  const { appMetadata } = configuration
  const { icon } = appMetadata || {}

  const { walletModules, connect } = state.get()
  const cancelPreviousConnect$ = new Subject<void>()

  let connectionRejected = false
  let previousConnectionRequest = false
  let wallets: WalletWithLoadingIcon[] = []
  let selectedWallet: WalletState | null
  let agreed: boolean
  let connectingWalletLabel: string
  let connectingErrorMessage: string

  let windowWidth: number
  let scrollContainer: HTMLElement

  const modalStep$ = new BehaviorSubject<keyof i18n['connect']>(
    'selectingWallet'
  )

  // handle the edge case where disableModals was set to true on first call
  // and then set to false on second call and there is still a pending call
  connectWallet$
    .pipe(
      distinctUntilChanged(
        (prev, curr) =>
          prev.autoSelect &&
          curr.autoSelect &&
          prev.autoSelect.disableModals === curr.autoSelect.disableModals
      ),
      filter(
        ({ autoSelect }) => autoSelect && autoSelect.disableModals === false
      ),
      takeUntil(onDestroy$)
    )
    .subscribe(() => {
      selectedWallet && connectWallet()
    })

  // ==== SELECT WALLET ==== //
  async function selectWallet({
    label,
    icon,
    getInterface
  }: WalletWithLoadingIcon): Promise<void> {
    connectingWalletLabel = label

    try {
      const existingWallet = state
        .get()
        .wallets.find(wallet => wallet.label === label)

      if (existingWallet) {
        // set as first wallet
        addWallet(existingWallet)

        try {
          await selectAccounts(existingWallet.provider)
          // change step on next event loop
          setTimeout(() => setStep('connectedWallet'), 1)
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

      const { provider, instance } = await getInterface({
        chains,
        BigNumber,
        EventEmitter,
        appMetadata
      })

      const loadedIcon = await icon

      selectedWallet = {
        label,
        icon: loadedIcon,
        provider,
        instance,
        accounts: [],
        chains: [{ namespace: 'evm', id: '0x1' }]
      }

      connectingErrorMessage = ''
      scrollToTop()
      // change step on next event loop
      setTimeout(() => setStep('connectingWallet'), 1)
    } catch (error) {
      const { message } = error as { message: string }
      connectingErrorMessage = message
      scrollToTop()
    }
  }

  function deselectWallet() {
    selectedWallet = null
  }

  function updateSelectedWallet(update: Partial<WalletState> | WalletState) {
    selectedWallet = { ...selectedWallet, ...update }
  }

  async function autoSelectWallet(wallet: WalletModule): Promise<void> {
    const { getIcon, getInterface, label } = wallet
    const icon = getIcon()
    selectWallet({ label, icon, getInterface })
  }

  async function loadWalletsForSelection() {
    wallets = walletModules.map(({ getIcon, getInterface, label }) => {
      return {
        label,
        icon: getIcon(),
        getInterface
      }
    })
  }

  function close() {
    connectWallet$.next({ inProgress: false })
  }

  // ==== CONNECT WALLET ==== //
  async function connectWallet() {
    connectionRejected = false

    const { provider, label } = selectedWallet

    cancelPreviousConnect$.next()

    try {
      const [address] = await Promise.race([
        // resolved account
        requestAccounts(provider),
        // or connect wallet is called again whilst waiting for response
        firstValueFrom(cancelPreviousConnect$.pipe(mapTo([])))
      ])

      // canceled previous request
      if (!address) {
        return
      }

      const chain = await getChainId(provider)

      if (state.get().notify.enabled) {
        const sdk = await getBlocknativeSdk()

        if (sdk) {
          try {
            sdk.subscribe({
              id: address,
              chainId: chain,
              type: 'account'
            })
          } catch (error) {
            // unsupported network for transaction events
          }
        }
      }

      const update: Pick<WalletState, 'accounts' | 'chains'> = {
        accounts: [{ address, ens: null, balance: null }],
        chains: [{ namespace: 'evm', id: chain }]
      }

      addWallet({ ...selectedWallet, ...update })
      trackWallet(provider, label)
      updateSelectedWallet(update)
      setStep('connectedWallet')
      scrollToTop()
    } catch (error) {
      const { code } = error as { code: number; message: string }
      scrollToTop()

      // user rejected account access
      if (code === ProviderRpcErrorCode.ACCOUNT_ACCESS_REJECTED) {
        connectionRejected = true

        if (autoSelect.disableModals) {
          connectWallet$.next({ inProgress: false })
        } else if (autoSelect.label) {
          autoSelect.label = ''
        }

        return
      }

      // account access has already been requested and is awaiting approval
      if (code === ProviderRpcErrorCode.ACCOUNT_ACCESS_ALREADY_REQUESTED) {
        previousConnectionRequest = true

        if (autoSelect.disableModals) {
          connectWallet$.next({ inProgress: false })
          return
        }

        listenAccountsChanged({
          provider: selectedWallet.provider,
          disconnected$: connectWallet$.pipe(
            filter(({ inProgress }) => !inProgress),
            mapTo('')
          )
        })
          .pipe(take(1))
          .subscribe(([account]) => {
            account && connectWallet()
          })

        return
      }
    }
  }

  // ==== CONNECTED WALLET ==== //
  async function updateAccountDetails() {
    const { accounts, chains: selectedWalletChains } = selectedWallet
    const appChains = state.get().chains
    const [connectedWalletChain] = selectedWalletChains

    const appChain = appChains.find(
      ({ namespace, id }) =>
        namespace === connectedWalletChain.namespace &&
        id === connectedWalletChain.id
    )

    const { address } = accounts[0]
    let { balance, ens } = accounts[0]

    if (balance === null) {
      getBalance(address, appChain).then(balance => {
        updateAccount(selectedWallet.label, address, {
          balance
        })
      })
    }

    if (ens === null && validEnsChain(connectedWalletChain.id)) {
      getEns(address, appChain).then(ens => {
        updateAccount(selectedWallet.label, address, {
          ens
        })
      })
    }

    setTimeout(() => connectWallet$.next({ inProgress: false }), 1500)
  }

  modalStep$.pipe(takeUntil(onDestroy$)).subscribe(step => {
    switch (step) {
      case 'selectingWallet': {
        if (autoSelect.label) {
          const walletToAutoSelect = walletModules.find(
            ({ label }) =>
              label.toLowerCase() === autoSelect.label.toLowerCase()
          )

          if (walletToAutoSelect) {
            autoSelectWallet(walletToAutoSelect)
          } else if (autoSelect.disableModals) {
            connectWallet$.next({ inProgress: false })
          }
        } else {
          connectingWalletLabel = ''
          loadWalletsForSelection()
        }
        break
      }
      case 'connectingWallet': {
        connectWallet()
        break
      }
      case 'connectedWallet': {
        connectingWalletLabel = ''
        updateAccountDetails()
        break
      }
    }
  })

  function setStep(update: keyof i18n['connect']) {
    cancelPreviousConnect$.next()
    modalStep$.next(update)
  }

  function scrollToTop() {
    scrollContainer && scrollContainer.scrollTo(0, 0)
  }
</script>

<style>
  .container {
    font-family: var(--onboard-font-family-normal, var(--font-family-normal));
    line-height: 24px;
    color: var(--onboard-gray-700, var(--gray-700));
    font-size: var(--onboard-font-size-5, var(--font-size-5));
    height: var(--onboard-connect-content-height, 440px);
    overflow: hidden;
    background: var(
      --onboard-main-scroll-container-background,
      var(--onboard-white, var(--white))
    );
  }

  .content {
    width: var(--onboard-connect-content-width, 488px);
  }

  .scroll-container {
    overflow-y: auto;
    transition: opacity 250ms ease-in-out;
    scrollbar-width: none; /* Firefox */
  }

  .scroll-container::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }

  .header {
    box-shadow: var(--onboard-shadow-2, var(--shadow-2));
    background: var(
      --onboard-connect-header-background,
      var(--onboard-white, var(--white))
    );
    color: var(
      --onboard-connect-header-color,
      var(--onboard-black, var(--black))
    );
  }

  .header-heading {
    margin: var(--onboard-spacing-4, var(--spacing-4));
    line-height: 16px;
  }

  .button-container {
    right: var(--onboard-spacing-5, var(--spacing-5));
    top: var(--onboard-spacing-5, var(--spacing-5));
  }

  .disabled {
    opacity: 0.2;
    pointer-events: none;
  }

  .mobile-subheader {
    display: none;
  }

  @media all and (max-width: 520px) {
    .content {
      width: 100%;
    }

    .container {
      height: 100%;
      flex-flow: column-reverse;
    }

    .mobile-subheader {
      color: var(--onboard-gray-400, var(--gray-400));
      display: block;
      font-size: var(--onboard-font-size-6, var(--font-size-6));
      line-height: 100%;
      margin: 4px 0 0 0;
      font-weight: 400;
    }

    .mobile-header {
      display: flex;
      padding: 16px;

      border-bottom: 1px solid
        var(
          --onboard-wallet-button-border-color,
          var(--onboard-primary-200, var(--primary-200))
        );
    }

    .header-heading {
      margin-bottom: 4px;
    }

    .w-full {
      width: 100%;
    }

    .icon-container {
      width: 40px;
      margin-right: 8px;
    }

    .header-heading {
      margin: 0;
    }
  }
</style>

<svelte:window bind:innerWidth={windowWidth} />

{#if !autoSelect.disableModals}
  <Modal {close}>
    <div class="container relative flex">
      {#if connect.showSidebar}
        <Sidebar step={$modalStep$} />
      {/if}

      <div class="content flex flex-column">
        {#if windowWidth <= 809}
          <div class="mobile-header">
            <div class="icon-container flex">
              {#if icon}
                {#if isSVG(icon)}
                  {@html icon}
                {:else}
                  <img src={icon} alt="logo" />
                {/if}
              {:else}
                {@html blocknative}
              {/if}
            </div>
            <div class="flex flex-column justify-center w-full">
              <h4 class="header-heading">
                {$_(
                  $modalStep$ === 'connectingWallet' && selectedWallet
                    ? `connect.${$modalStep$}.header`
                    : `connect.${$modalStep$}.sidebar.subheading`,
                  {
                    default:
                      $modalStep$ === 'connectingWallet' && selectedWallet
                        ? en.connect[$modalStep$].header
                        : en.connect[$modalStep$].sidebar.subheading,
                    values: {
                      connectionRejected,
                      wallet: selectedWallet && selectedWallet.label
                    }
                  }
                )}
              </h4>
              <h5 class="mobile-subheader">
                {$modalStep$ === 'selectingWallet'
                  ? `${wallets.length} available wallets`
                  : '1 account selected'}
              </h5>
            </div>
          </div>
        {:else}
          <div class="header relative flex items-center">
            <h4 class="header-heading">
              {$_(`connect.${$modalStep$}.header`, {
                default: en.connect[$modalStep$].header,
                values: {
                  connectionRejected,
                  wallet: selectedWallet && selectedWallet.label
                }
              })}
              {$modalStep$ === 'selectingWallet' ? `(${wallets.length})` : ''}
            </h4>
          </div>
        {/if}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click={close} class="button-container absolute">
          <CloseButton />
        </div>

        <div class="scroll-container" bind:this={scrollContainer}>
          {#if $modalStep$ === 'selectingWallet' || windowWidth <= 809}
            {#if wallets.length}
              <Agreement bind:agreed />

              <div class:disabled={!agreed}>
                <SelectingWallet
                  {selectWallet}
                  {wallets}
                  {connectingWalletLabel}
                  {connectingErrorMessage}
                />
              </div>
            {:else}
              <InstallWallet />
            {/if}
          {/if}

          {#if ($modalStep$ === 'connectingWallet' && selectedWallet && windowWidth >= 809) || (windowWidth <= 809 && connectionRejected && $modalStep$ === 'connectingWallet' && selectedWallet)}
            <ConnectingWallet
              {connectWallet}
              {connectionRejected}
              {previousConnectionRequest}
              {setStep}
              {deselectWallet}
              {selectedWallet}
            />
          {/if}

          {#if $modalStep$ === 'connectedWallet' && selectedWallet && windowWidth >= 809}
            <ConnectedWallet {selectedWallet} />
          {/if}
        </div>
      </div>
    </div>
  </Modal>
{/if}
