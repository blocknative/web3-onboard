<script lang="ts">
  import { fade } from 'svelte/transition'
  import type { Subject } from 'rxjs'

  import CloseButton from '../elements/CloseButton.svelte'
  import type { LoginOptions } from '../types'

  let credentials: string = ''
  export let loginOptions: LoginOptions
  export let loggedIn$: Subject<boolean>
  const {
    walletName,
    brandingHTMLString,
    emailLoginFunction
  } = loginOptions

  const login = async () => {
    const loginResponse = await emailLoginFunction(credentials)
    loggedIn$.next(loginResponse)
  }

  const dismiss = () => {
    loggedIn$.next(false)
  }

</script>

<style>
  .login-modal {
    position: relative;
  }

  input[type='text'] {
    display: block;
    margin: 0;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    scrollbar-width: none;
    width: 32rem;
    padding: 0.5rem 2.6rem 0.5rem 1rem;
    border-radius: 8px;
    font-size: var(--account-select-font-size-5, var(--font-size-5));
    line-height: var(
      --account-select-font-line-height-1,
      var(--font-line-height-1)
    );
    color: var(--account-select-gray-600, var(--gray-600));
    transition: all 200ms ease-in-out;
    border: 2px solid var(--account-select-gray-200, var(--gray-200));
    box-sizing: border-box;
    height: 3rem;
    -ms-overflow-style: none;
  }

  .close-action-container {
    position: absolute;
    right: 0;
    padding: 0.25rem 0.75rem;
  }

  button {
    align-items: center;
    padding: 0.75rem 1.5rem;
    color: var(--account-select-white, var(--white));
    border-radius: 1.5rem;
    font-family: var(
      --account-select-font-family-normal,
      var(--font-family-normal)
    );
    font-style: normal;
    font-weight: bold;
    font-size: var(--account-select-font-size-5, var(--font-size-5));
    line-height: var(--account-select-font-line-height-1, var(--line-height-1));
    border: none;
  }

  .login-btn:disabled {
    background-color: var(--account-select-primary-300, var(--primary-300));
    cursor: default;
  }

  .login-btn {
    background-color: var(--account-select-primary-500, var(--primary-500));
    cursor: pointer;
  }

  .close {
    cursor: pointer;
  }

  .form-element {
    margin: 1rem 0;
  }

  .container {
    font-family: var(
      --account-select-font-family-normal,
      var(--font-family-normal)
    );
    color: var(--account-select-black, var(--black));
    position: absolute;
    top: 0;
    right: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, 0.2);
  }

  .login-modal {
    min-width: 36rem;
    max-height: 51.75rem;
    display: table;
    background: var(--account-select-white, var(--white));
    box-shadow: var(--account-select-shadow-1, var(--shadow-1));
    border-radius: 1.5rem;
    text-align: center;
  }

  .modal-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    padding-top: 0;
    flex-direction: column;
  }

  .branding {
    margin: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<div class="container">
  <div class="login-modal" transition:fade>
    <div class="close-action-container close" on:click={dismiss}>
    </div>
    <h2>{walletName} Login</h2>
    <section class="modal-controls">
      <input
        type="text"
        class="login-credentials form-element"
        placeholder="Email address"
        bind:value={credentials}
      />
      <button
        class="login-btn form-element"
        id="connect-accounts"
        disabled={!credentials}
        on:click={login}
      >
        Login
      </button>
    </section>
    <div class='branding'> {@html brandingHTMLString}</div>
  </div>
</div>
