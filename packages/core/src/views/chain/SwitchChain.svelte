<script>
  import { _ } from 'svelte-i18n'
  import { internalState$, switchChainModal$ } from '../../streams'
  import en from '../../i18n/en.json'
  import CloseButton from '../shared/CloseButton.svelte'
  import Modal from '../shared/Modal.svelte'

  const { appMetadata } = internalState$.getValue()
  const nextNetworkName = $switchChainModal$.chain.label

  function close() {
    switchChainModal$.next(null)
  }
</script>

<style>
  .container {
    position: relative;
    padding: var(--onboard-spacing-4, var(--spacing-4));
    font-family: var(--onboard-font-family-normal, var(--font-family-normal));
    line-height: var(--onboard-font-line-height-1, var(--font-line-height-1));
    font-size: var(--onboard-font-size-5, var(--font-size-5));
  }

  .close {
    position: absolute;
    top: var(--onboard-spacing-5, var(--spacing-5));
    right: var(--onboard-spacing-5, var(--spacing-5));
  }

  h4 {
    font-size: var(--onboard-font-size-3, var(--font-size-3));
    font-family: var(
      --onboard-font-family-semibold,
      var(--font-family-semibold)
    );
    margin: var(--onboard-spacing-4, var(--spacing-4)) 0;
  }

  p {
    margin: 0 0 var(--onboard-spacing-4, var(--spacing-4)) 0;
    max-width: 485px;
  }
</style>

<Modal {close}>
  <div class="container">
    <h4>
      {$_('chain.switch.heading', {
        default: en.chain.switch.heading
      })}
    </h4>

    <p>
      {$_('chain.switch.paragraph1', {
        default: en.chain.switch.paragraph1,
        values: {
          app: appMetadata?.name || 'This app',
          nextNetworkName
        }
      })}
    </p>

    <p>
      {$_('chain.switch.paragraph2', {
        default: en.chain.switch.paragraph2
      })}
    </p>

    <div class="close" on:click={close}><CloseButton /></div>
  </div>
</Modal>
