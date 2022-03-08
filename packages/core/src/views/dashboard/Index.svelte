<script lang="ts">
  import { fade } from 'svelte/transition'
  import { internalState$, wallets$ } from '../../streams'
  import defaultAppIcon from '../../icons/default-app-icon'
  import SuccessStatusIcon from '../shared/SuccessStatusIcon.svelte'
  import WalletAppBadge from '../shared/WalletAppBadge.svelte'
  import type { DashboardState } from '../../types'

  export let dashboard: DashboardState

  const { appMetadata } = internalState$.getValue()

  const dashboardPositions = {
    topLeft: 'top: 12px; left: 24px;',
    topRight: 'top: 12px; right: 24px;',
    bottomRight: 'bottom: 12px; right: 24px;',
    bottomLeft: 'bottom: 12px; left: 24px;'
  }
</script>

<style>
  .absolute {
    position: absolute;
  }

  .shadow {
    box-shadow: var(--onboard-shadow-1, var(--shadow-1));
  }

  .radius {
    border-radius: 16px;
  }

  .padding-5 {
    padding: var(--onboard-spacing-5, var(--spacing-5));
  }

  .padding-6 {
    padding: var(--onboard-spacing-6, var(--spacing-6));
  }

  .flex {
    display: flex;
  }

  .flex-centered {
    justify-content: center;
    align-items: center;
  }

  .z-index {
    z-index: var(--onboard-z-index, var(--z-index));
  }
</style>

{#if $wallets$.length}
  <div transition:fade>
    {#if !dashboard.expanded}
      <!-- minimized -->
      <div
        class="minimized absolute shadow radius padding-5 z-index"
        style={dashboardPositions[dashboard.position]}
      >
        <div class="padding-6 flex flex-centered">
          <!-- app and wallet icon badge -->
          <div class="flex flex-centered">
            <WalletAppBadge
              size={32}
              padding={4}
              background={'white'}
              border="darkGreen"
              radius={8}
              icon={(appMetadata && appMetadata.icon) || defaultAppIcon}
            />

            <div style="position: relative; right: 0.5rem;">
              <WalletAppBadge
                size={32}
                padding={4}
                background="green"
                border="darkGreen"
                radius={8}
                icon={$wallets$[0].icon}
              />
            </div>

            <div style="position: relative; right: 1rem; bottom: -8px;">
              <SuccessStatusIcon size={12} bottom={null} right={null} />
            </div>
          </div>

          <!-- address and balance -->
          <div>
            <!--  -->
          </div>

          <!-- network badge -->
          <div>
            <!--  -->
          </div>
        </div>
      </div>
    {:else}
      <!-- maximized -->
      <div
        class="absolute radius z-index"
        style={dashboardPositions[dashboard.position]}
      >
        <!--  -->
      </div>
    {/if}
  </div>
{/if}
