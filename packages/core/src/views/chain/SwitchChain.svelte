<script>
  import { _ } from 'svelte-i18n'
  import { switchChainModal$ } from '../../streams'
  import en from '../../i18n/en.json'
  import CloseButton from '../shared/CloseButton.svelte'
  import Modal from '../shared/Modal.svelte'
  import { internalState } from '../../internals'

  const { appMetadata } = internalState
  const nextNetworkName = $switchChainModal$.chain.label

  function close() {
    switchChainModal$.next(null)
  }
</script>

<style>
  .container {
    padding: var(--onboard-spacing-4, var(--spacing-4));
    font-family: var(--onboard-font-family-normal, var(--font-family-normal));
    line-height: 16px;
    font-size: var(--onboard-font-size-5, var(--font-size-5));
  }

  .close {
    top: var(--onboard-spacing-5, var(--spacing-5));
    right: var(--onboard-spacing-5, var(--spacing-5));
    padding: 0.5rem;
  }

  h4 {
    font-size: var(--onboard-font-size-3, var(--font-size-3));
    margin: var(--onboard-spacing-4, var(--spacing-4)) 0;
  }

  p {
    margin: 0 0 var(--onboard-spacing-4, var(--spacing-4)) 0;
    max-width: 488px;
  }
</style>

<Modal {close}>
  <div class="container relative">
    <h4>
      {$_('modals.switchChain.heading', {
        default: en.modals.switchChain.heading
      })}
    </h4>

    <p>
      {$_('modals.switchChain.paragraph1', {
        default: en.modals.switchChain.paragraph1,
        values: {
          app: (appMetadata && appMetadata.name) || 'This app',
          nextNetworkName
        }
      })}
    </p>

    <p>
      {$_('modals.switchChain.paragraph2', {
        default: en.modals.switchChain.paragraph2
      })}
    </p>

    <div class="close absolute" on:click={close}><CloseButton /></div>
  </div>
</Modal>
