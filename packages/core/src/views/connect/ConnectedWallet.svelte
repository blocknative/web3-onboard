<script lang="ts">
  import { providers } from 'ethers'
  import { _ } from 'svelte-i18n'

  import { getBalance, getEns } from '../../provider'
  import { updateAccount } from '../../store/actions'
  import { connectWallet$, internalState$ } from '../../streams'
  import { getRpcUrl, validEnsChain } from '../../utils'
  import success from '../../icons/success'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'

  import type { WalletState } from '../../types'
  import defaultAppIcon from '../../icons/default-app-icon'
  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import { state } from '../../store'
  import en from '../../i18n/en.json'

  export let selectedWallet: WalletState

  const { label } = selectedWallet
  const { appMetadata } = internalState$.getValue()

  async function updateAccountDetails() {
    const { accounts, chain } = selectedWallet
    const chains = state.get().chains
    const rpcUrl = getRpcUrl(chain, chains)

    if (rpcUrl) {
      const { address } = accounts[0]
      let { balance, ens } = accounts[0]
      const ethersProvider = new providers.JsonRpcProvider(rpcUrl)

      if (balance === null) {
        getBalance(
          ethersProvider,
          address,
          chains.find(({ id }) => id === chain)
        ).then(balance => {
          updateAccount(label, address, {
            balance
          })
        })
      }

      if (ens === null && validEnsChain(chain)) {
        getEns(ethersProvider, address).then(ens => {
          updateAccount(label, address, {
            ens
          })
        })
      }
    }

    // setTimeout(() => connectWallet$.next({ inProgress: false }), 1500)
  }

  updateAccountDetails()
</script>

<style>
  .container {
    padding: var(--onboard-spacing-4, var(--spacing-4));
  }

  .connecting-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--onboard-spacing-4, var(--spacing-4));
    border-radius: 24px;
    background: var(--onboard-success-100, var(--success-100));
    outline: 1px solid var(--onboard-success-600, var(--success-600));
    width: 100%;
    box-sizing: border-box;
  }

  .icons {
    display: flex;
    justify-content: center;
    position: relative;
  }

  .text {
    position: relative;
    right: var(--onboard-spacing-5, var(--spacing-5));
  }

  .tick {
    display: flex;
    color: var(--onboard-success-700, var(--success-700));
  }

  @media all and (max-width: 520px) {
  }
</style>

<div class="container">
  <div class="connecting-container">
    <div class="icons">
      <WalletAppBadge
        size={40}
        padding={8}
        background={appMetadata && appMetadata.icon ? 'lightBlue' : 'lightGray'}
        border="darkGreen"
        icon={(appMetadata && appMetadata.icon) || defaultAppIcon}
      />

      <div style="position: relative; right: 0.85rem; top: 2px;">
        <SuccessStatusIcon size={17} right={null} />
      </div>

      <div style="position: relative; right: 0.5rem;">
        <WalletAppBadge
          size={40}
          padding={8}
          border="darkGreen"
          icon={selectedWallet.icon}
        />
      </div>
    </div>

    <div class="text">
      {$_('connect.connectedWallet.mainText', {
        default: en.connect.connectedWallet.mainText
      })}
    </div>

    <div class="tick" style="width: 20px;">
      {@html success}
    </div>
  </div>
</div>
