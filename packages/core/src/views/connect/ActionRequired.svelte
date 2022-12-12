<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { connectWallet$ } from '../../streams.js'
  import Modal from '../shared/Modal.svelte'
  import InfoIcon from '../shared/InfoIcon.svelte'

  export let wallet: string

  function close() {
    connectWallet$.next({ inProgress: false, actionRequired: '' })
  }
</script>

<style>
  .content {
    padding: 1rem;
    width: 300px;
    font-family: var(--onboard-font-family-normal, var(--font-family-normal));
    font-size: var(--onboard-font-size-5, var(--font-size-5));
    line-height: 24px;
    background: var(
      --onboard-action-required-modal-background,
      var(--onboard-white, var(--white))
    );
  }

  .icon-container {
    width: 3rem;
    height: 3rem;
    background: var(--onboard-primary-100, var(--primary-100));
    border-radius: 24px;
  }

  h4 {
    margin: 1.5rem 0 0.5rem 0;
    font-weight: 700;
  }

  .action-required-heading,
  .action-required-info {
    color: var(
      --onboard-action-required-text-color,
      var(--onboard-black, inherit)
    );
  }

  .action-required-btn {
    color: var(
      --onboard-action-required-btn-text-color,
      var(--onboard-black, inherit)
    );
  }

  p {
    margin: 0;
    font-weight: 400;
  }

  a {
    font-weight: 700;
  }

  button {
    margin-top: 1.5rem;
    font-weight: 700;
  }
</style>

<Modal {close}>
  <div class="content">
    <div class="icon-container flex justify-center items-center">
      <InfoIcon />
    </div>

    <h4 class="action-required-heading">
      {$_('modals.actionRequired.heading', { values: { wallet } })}
    </h4>

    <p class="action-required-info">
      {$_('modals.actionRequired.paragraph')}

      {#if wallet === 'MetaMask'}
        <a
          href="https://metamask.zendesk.com/hc/en-us/articles/360061346311-Switching-accounts-in-MetaMask"
          target="_blank"
          rel="noreferrer noopener">{$_('modals.actionRequired.linkText')}</a
        >
      {/if}
    </p>

    <button
      class="button-neutral-solid rounded action-required-btn"
      on:click={close}>{$_('modals.actionRequired.buttonText')}</button
    >
  </div>
</Modal>
