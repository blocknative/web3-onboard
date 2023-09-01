<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { Modal } from '../shared'
  import en from '../../i18n/en.json'
  import shieldIcon from '../../icons/shield-icon.js'

  export let onEnable: () => void
  export let onDismiss: () => void
  export let infoLink: string
</script>

<style>
  .content {
    --background-color: var(--w3o-background-color);
    --text-color: var(--w3o-text-color);
    --action-color: var(--w3o-action-color, var(--primary-500));

    font-size: 1rem;
    line-height: 1.5rem;

    display: flex;
    flex-flow: column;
    gap: 1.5rem;
    padding: 1rem;
    max-width: 320px;

    background: var(--background-color);
    color: var(--text-color);
  }

  .icon-container {
    position: relative;
    overflow: hidden;
    width: 3rem;
    height: 3rem;
    border-radius: 24px;
    padding: 0.75rem;
    background: none;
  }
  .icon-container::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0.2;
    background: var(--action-color);
  }

  .text-container {
    display: flex;
    flex-flow: column;
    gap: 0.5rem;
    padding: 0 0.5rem;
  }

  .actions-container {
    display: flex;
    flex-flow: row nowrap;
    gap: 1rem;
  }

  .heading {
    font-weight: 600;
  }

  button {
    font-weight: 600;
  }

  button.primary {
    background: var(--action-color);
  }
</style>

<Modal close={onDismiss}>
  <div class="content">
    <div class="icon-container flex justify-center items-center">
      {@html shieldIcon}
    </div>

    <div class="text-container">
      <div class="heading">
        {$_('modals.confirmTransactionProtection.heading', {
          default: en.modals.confirmTransactionProtection.heading
        })}
      </div>
      <div>
        {$_('modals.confirmTransactionProtection.description')}
        <a
          href={infoLink}
          target="_blank"
          rel="noreferrer noopener"
          class="no-link"
          >{$_('modals.confirmTransactionProtection.link', {
            default: en.modals.confirmTransactionProtection.link
          })}
        </a>
      </div>
    </div>

    <div class="actions-container">
      <button class="button-neutral-solid-b" on:click={onDismiss}>
        {$_('modals.confirmTransactionProtection.dismiss', {
          default: en.modals.confirmTransactionProtection.dismiss
        })}
      </button>
      <button class="button-neutral-solid rounded primary" on:click={onEnable}>
        {$_('modals.confirmTransactionProtection.enable', {
          default: en.modals.confirmTransactionProtection.enable
        })}
      </button>
    </div>
  </div>
</Modal>
