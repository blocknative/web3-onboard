<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { Modal } from '../shared'
  import en from '../../i18n/en.json'
  import shieldIcon from '../../icons/shield-icon.js'

  export let onEnable: () => void
  export let onDismiss: () => void
</script>

<style>
  .content {
    padding: 1rem;
    width: 300px;
    font-family: var(--onboard-font-family-normal, var(--font-family-normal));
    font-size: var(--onboard-font-size-5, var(--font-size-5));
    line-height: 24px;
    background: var(
      --enable-protect-rpc-background,
      var(--w3o-background-color)
    );
    color: var(--w3o-text-color);
  }

  .icon-container {
    width: 3rem;
    height: 3rem;
    background: var(--onboard-primary-100, var(--primary-100));
    border-radius: 24px;
    padding: 12px;
    color: var(--w3o-text-color);
  }

  h4 {
    margin: 1.5rem 0 0.5rem 0;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-weight: 400;
  }

  button {
    margin-top: 1.5rem;
    width: 50%;
    font-weight: 600;
  }

  .right {
    margin-left: 0.5rem;
    width: 60%;
  }

  .enable {
    background: var(
      --enable-protect-rpc-action-color,
      var(--w3o-action-color, var(--primary-500))
    );
  }
</style>

<Modal close={onDismiss}>
  <div class="content">
    <div class="icon-container flex justify-center items-center">
      {@html shieldIcon}
    </div>

    <h4>
      {$_('modals.confirmTransactionProtection.heading', {
        default: en.modals.confirmTransactionProtection.heading
      })}
    </h4>

    <p>
      {$_('modals.confirmTransactionProtection.description')}
    </p>

    <div class="flex justify-between items-center w-100">
      <button class="button-neutral-solid-b rounded" on:click={onDismiss}
        >{$_('modals.confirmTransactionProtection.dismiss', {
          default: en.modals.confirmTransactionProtection.dismiss
        })}</button
      >
      <button
        class="right button-neutral-solid rounded enable"
        on:click={onEnable}
        >{$_('modals.confirmTransactionProtection.enable', {
          default: en.modals.confirmTransactionProtection.enable
        })}</button
      >
    </div>
  </div>
</Modal>
