<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { connectWallet$ } from '../../streams'
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
  }

  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    background-color: var(--onboard-primary-100, var(--primary-100));
    border-radius: 24px;
  }

  h4 {
    margin: 1.5rem 0 0.5rem 0;
    font-weight: 700;
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
    width: 100%;
    background-color: var(--onboard-gray-500, var(--gray-500));
    font-weight: 700;
    line-height: 16px;
    color: var(--onboard-white, var(--white));
    justify-content: center;
  }
</style>

<Modal {close}>
  <div class="content">
    <div class="icon-container">
      <InfoIcon />
    </div>

    <h4>{$_('modals.actionRequired.heading', { values: { wallet } })}</h4>

    <p>
      {$_('modals.actionRequired.paragraph')}
      <a
        href="https://blocknative.com/blog"
        target="_blank"
        rel="noreferrer noopener">{$_('modals.actionRequired.linkText')}</a
      >
    </p>

    <button on:click={close}>{$_('modals.actionRequired.buttonText')}</button>
  </div>
</Modal>
