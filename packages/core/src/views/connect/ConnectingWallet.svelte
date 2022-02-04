<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { createEventDispatcher } from 'svelte'
  import { ProviderRpcErrorCode } from '@bn-onboard/common'

  import { getChainId, requestAccounts, trackWallet } from '../../provider'
  import { internalState$ } from '../../streams'
  import type { WalletState, i18n } from '../../types'

  import WalletAppBadge from '../shared/WalletAppBadge.svelte'
  import defaultAppIcon from '../../icons/default-app-icon'
  import en from '../../i18n/en.json'
  import { addWallet } from '../../store/actions'

  export let selectedWallet: WalletState
  export let deselectWallet: (label: string) => void
  export let updateSelectedWallet: (update: Partial<WalletState>) => void
  export let setStep: (update: keyof i18n['connect']) => void

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
      setStep('connectedWallet')
    } catch (error) {
      const { code } = error as { code: number; message: string }

      // user rejected account access
      if (code === ProviderRpcErrorCode.ACCOUNT_ACCESS_REJECTED) {
        connectionRejected = true
        dispatch('connectionRejected', true)
        return
      }

      // account access has already been requested and is awaiting approval
      if (code === ProviderRpcErrorCode.ACCOUNT_ACCESS_ALREADY_REQUESTED) {
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
    background-color: var(--onboard-primary-100, var(--primary-100));
    border: 1px solid;
    border-color: var(--onboard-primary-300, var(--primary-300));
    box-sizing: border-box;
  }

  .connecting-container.warning {
    background-color: var(--onboard-warning-100, var(--warning-100));
    border-color: var(--onboard-warning-400, var(--warning-400));
  }

  .icons {
    display: flex;
    justify-content: center;
    position: relative;
  }

  .subtext {
    font-size: var(--onboard-font-size-7, var(--font-size-7));
    line-height: var(--onboard-font-line-height-3, var(--font-line-height-3));
  }

  .rejected-cta {
    color: var(--onboard-primary-500, var(--primary-500));
    cursor: pointer;
  }

  .onboard-button-primary {
    position: absolute;
    bottom: var(--onboard-spacing-3, var(--spacing-3));
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
    <div style="display: flex;">
      <div class="icons">
        <WalletAppBadge
          size={48}
          icon={(appMetadata && appMetadata.icon) || defaultAppIcon}
          border={connectionRejected ? 'yellow' : 'blue'}
          background="lightGray"
        />

        <div style="position: relative; right: 0.5rem;">
          <WalletAppBadge
            size={48}
            border={connectionRejected ? 'yellow' : 'blue'}
            background="white"
            icon={selectedWallet.icon}
          />
        </div>
      </div>

      <div class="centered-flex-column ml">
        <div class="text">
          {$_(
            connectionRejected
              ? 'connect.connectingWallet.rejectedText'
              : 'connect.connectingWallet.mainText',
            {
              default: connectionRejected
                ? en.connect.connectingWallet.rejectedText
                : en.connect.connectingWallet.mainText
            }
          )}
        </div>
        {#if connectionRejected}
          <div class="rejected-cta subtext" on:click={connect}>
            {$_('connect.connectingWallet.rejectedCTA', {
              default: en.connect.connectingWallet.rejectedCTA
            })}
          </div>
        {:else}
          <div class="subtext">
            {$_('connect.connectingWallet.paragraph', {
              default: en.connect.connectingWallet.paragraph
            })}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <button
    on:click={() => {
      deselectWallet(selectedWallet.label)
      dispatch('connectionRejected', false)
      setStep('selectingWallet')
    }}
    class="onboard-button-primary"
    >{$_('connect.connectingWallet.primaryButton', {
      default: en.connect.connectingWallet.primaryButton
    })}</button
  >
</div>
