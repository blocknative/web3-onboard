<script lang="ts">
  import { _ } from 'svelte-i18n'
  import Modal from '../shared/Modal.svelte'
  import InfoIcon from '../shared/InfoIcon.svelte'
  import en from '../../i18n/en.json'

  export let onConfirm: () => void
  export let onClose: () => void
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

  button {
    margin-top: 1.5rem;
    background-color: var(--onboard-gray-500, var(--gray-500));
    font-weight: 700;
    line-height: 16px;
    color: var(--onboard-white, var(--white));
    padding: 1rem 2rem;
  }

  .button-light {
    background-color: var(--onboard-gray-100, var(--gray-100));
    color: var(--onboard-gray-500, var(--gray-500));
  }
</style>

<Modal close={onClose}>
  <div class="content">
    <div class="icon-container flex justify-center items-center">
      <InfoIcon />
    </div>

    <h4>
      {$_('modals.confirmDisconnectAll.heading', {
        default: en.modals.confirmDisconnectAll.heading
      })}
    </h4>

    <p>
      {$_('modals.confirmDisconnectAll.description')}
    </p>

    <div class="flex justify-between items-center w-100">
      <button class="button-light flex justify-center" on:click={onClose}
        >{$_('modals.confirmDisconnectAll.cancel', {
          default: en.modals.confirmDisconnectAll.cancel
        })}</button
      >
      <button class="flex justify-center" on:click={onConfirm}
        >{$_('modals.confirmDisconnectAll.confirm', {
          default: en.modals.confirmDisconnectAll.confirm
        })}</button
      >
    </div>
  </div>
</Modal>
