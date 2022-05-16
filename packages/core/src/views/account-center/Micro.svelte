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
  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'
  import { state } from '../../store'

  const { appMetadata } = internalState$.getValue()
  const appIcon = (appMetadata && appMetadata.icon) || questionIcon
  const chains = state.get().chains

  $: [primaryWallet] = $wallets$
  $: [firstAccount] = primaryWallet ? primaryWallet.accounts : []

  $: [firstAddressAsset] =
    firstAccount && firstAccount.balance
      ? Object.keys(firstAccount.balance)
      : []

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
    padding: 10px 2px 10px 8px;
  }

  .drop-shadow {
    filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.2));
  }
</style>

<div
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

        <div style="right: 5px; bottom: -5px;" class="drop-shadow absolute">
          <SuccessStatusIcon size={14} />
        </div>
      </div>
    </div>
  </div>
</div>
