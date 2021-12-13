<script lang="ts">
  import { providers } from 'ethers'
  import { _ } from 'svelte-i18n'

  import { getBalance, getEns } from '../../provider'
  import { updateWallet } from '../../store/actions'
  import { connectWallet$, internalState$ } from '../../streams'
  import { getRpcUrl, validEnsChain } from '../../utils'
  import success from '../../icons/success'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'

  import type { WalletState } from '../../types'
  import defaultAppIcon from '../../icons/default-app-icon'
  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import { state } from '../../store'
  import en from '../../i18n/en.json'

  export let primaryWallet: WalletState

  const { label } = primaryWallet
  const { appMetadata } = internalState$.getValue()

  async function updateAccountDetails() {
    const { chain, accounts } = primaryWallet
    const rpcUrl = getRpcUrl(chain, state.get().chains)

    if (rpcUrl) {
      const { address } = accounts[0]
      let { balance, ens } = accounts[0]
      const ethersProvider = new providers.JsonRpcProvider(rpcUrl)

      if (balance === null) {
        getBalance(ethersProvider, address).then(balanceUpdate => {
          balance = balanceUpdate

          updateWallet(label, {
            accounts: [
              {
                address,
                ens,
                balance
              }
            ]
          })
        })
      }

      if (ens === null && validEnsChain(chain)) {
        getEns(ethersProvider, address).then(ensUpdate => {
          ens = ensUpdate

          updateWallet(label, {
            accounts: [
              {
                address,
                ens,
                balance
              }
            ]
          })
        })
      }
    }

    setTimeout(() => connectWallet$.next({ inProgress: false }), 2000)
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
    border: 1px solid var(--onboard-success-600, var(--success-600));
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
    color: var(--onboard-black, var(--black));
  }

  @media all and (max-width: 520px) {
  }
</style>

<div class="container">
  <div class="connecting-container">
    <div class="icons">
      <WalletAppBadge
        size={40}
        background={appMetadata?.icon ? 'lightBlue' : 'lightGray'}
        border="darkGreen"
        icon={appMetadata?.icon || defaultAppIcon}
      />

      <div style="position: relative; right: 0.85rem;">
        <SuccessStatusIcon size={17} right={null} />
      </div>

      <div style="position: relative; right: 0.5rem;">
        <WalletAppBadge
          size={40}
          border="darkGreen"
          icon={primaryWallet.icon}
        />
      </div>
    </div>

    <div class="text">
      {$_('connect.connectedWallet.mainText', {
        default: en.connect.connectedWallet.mainText
      })}
    </div>

    <div class="tick" style="width: 17.6px; height: 13.4px;">
      {@html success}
    </div>
  </div>
</div>
