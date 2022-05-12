<script lang="ts">
  import { fade } from 'svelte/transition'
  import { internalState$, wallets$ } from '../../streams'
  import {
    getDefaultChainStyles,
    shortenAddress,
    shortenEns,
    unrecognizedChainStyle
  } from '../../utils'
  import { updateAccountCenter } from '../../store/actions'
  import questionIcon from '../../icons/question'
  import caretIcon from '../../icons/caret'
  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import warningIcon from '../../icons/warning'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'
  import NetworkSelector from '../shared/NetworkSelector.svelte'
  import { state } from '../../store'

  const { appMetadata } = internalState$.getValue()
  const appIcon = (appMetadata && appMetadata.icon) || questionIcon
  const chains = state.get().chains

  $: [primaryWallet] = $wallets$
  $: [firstAccount] = primaryWallet ? primaryWallet.accounts : []

  $: ensName =
    firstAccount && firstAccount.ens && shortenEns(firstAccount.ens.name)

  $: shortenedFirstAddress = firstAccount
    ? shortenAddress(firstAccount.address)
    : ''

  $: [firstAddressAsset] =
    firstAccount && firstAccount.balance
      ? Object.keys(firstAccount.balance)
      : []

  $: firstAddressBalance =
    firstAccount && firstAccount.balance
      ? firstAccount.balance[firstAddressAsset]
      : null

  $: primaryChain = primaryWallet && primaryWallet.chains[0]

  $: validAppChain = chains.find(({ id, namespace }) =>
    primaryChain
      ? id === primaryChain.id && namespace === primaryChain.namespace
      : false
  )

  $: defaultChainStyles = getDefaultChainStyles(primaryChain && primaryChain.id)

  function maximize() {
    updateAccountCenter({ expanded: true })
  }
</script>

<style>
  .minimized {
    background-color: var(--onboard-white, var(--white));
    border: 1px solid var(--onboard-gray-100, var(--gray-100));
    width: 100%;
    box-shadow: var(--onboard-shadow-3, var(--shadow-3));
  }

  .radius {
    border-radius: 16px;
  }

  .padding-5 {
    padding: var(--onboard-spacing-5, var(--spacing-5));
  }

  .drop-shadow {
    filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.2));
  }

  .address {
    font-weight: 700;
    line-height: var(--onboard-font-line-height-2, var(--font-line-height-2));
  }

  .balance {
    font-weight: 400;
    line-height: var(--onboard-font-line-height-2, var(--font-line-height-2));
    color: var(--onboard-gray-400, var(--gray-400));
  }

  .network {
    margin-left: 0.5rem;
  }

  .chain-icon {
    width: 22px;
    height: 22px;
    padding: 4px;
    border-radius: 25px;
    margin-right: 4px;
  }

  .caret {
    width: 24px;
  }

  .container {
    border: 1px solid transparent;
    border-radius: 16px;
    padding: 1px;
    transition: border-color 250ms ease-in-out, backround 250ms ease-in-out;
    max-width: 128px;
    cursor: default;
  }

  .color-yellow {
    color: var(--onboard-warning-500, var(--warning-500));
  }

  .color-white {
    color: var(--onboard-primary-100, var(--primary-100));
  }
</style>

<div
  in:fade={{ duration: 250 }}
  out:fade={{ duration: 100 }}
  class="minimized pointer radius padding-5"
  on:click|stopPropagation={maximize}
>
  <div class="flex items-center justify-between" style="padding: 0 4px;">
    <div class="flex items-center w-100">
      <!-- app and wallet icon badge -->
      <div class="flex items-centered relative">
        <div class="drop-shadow">
          <WalletAppBadge
            size={32}
            padding={4}
            background={'white'}
            border="darkGreen"
            radius={8}
            icon={appIcon}
          />
        </div>

        <div style="right: 0.5rem;" class="drop-shadow relative">
          <WalletAppBadge
            size={32}
            padding={4}
            background="green"
            border="darkGreen"
            radius={8}
            icon={primaryWallet ? primaryWallet.icon : ''}
          />
        </div>
      </div>

    </div>
  </div>
</div>
