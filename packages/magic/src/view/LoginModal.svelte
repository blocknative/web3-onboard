<script lang="ts">
  import { fade } from 'svelte/transition'
  import type { Subject } from 'rxjs'

  import CloseButton from '../elements/CloseButton.svelte'
  import Spinner from '../elements/Spinner.svelte'
  import type { LoginOptions } from '../types'

  let credentials: string = ''
  export let loginOptions: LoginOptions
  export let loggedIn$: Subject<boolean>
  const { walletName, brandingHTMLString, emailLoginFunction } = loginOptions

  let errorInEmail = false
  let loading = false

  const setErrorInEmail = () => {
    if (!errorInEmail) return
    errorInEmail = false
  }

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const validateEmail = (value: string) => {
    return emailRegex.test(value)
  }

  const login = async () => {
    loading = true
    if (!validateEmail(credentials)) {
      errorInEmail = true
      loading = false
      return
    }
    const loginResponse = await emailLoginFunction(credentials)
    loading = false
    loggedIn$.next(loginResponse)
  }

  const dismiss = () => {
    loggedIn$.next(false)
    loading = false
  }

  const submitOnEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      login();
    }
  }
</script>

<style>
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
    font-size: var(--magic-wallet-login-modal-font-size-5, var(--onboard-font-size-5, var(--font-size-5)));
    line-height: var(
      --magic-wallet-login-modal-font-line-height-1,
      var(--font-line-height-1)
    );
    color: var(--magic-wallet-login-modal-gray-500, var(--onboard-gray-500, var(--gray-500)));
    transition: all 200ms ease-in-out;
    border: 2px solid var(--magic-wallet-login-modal-gray-200, var(--onboard-gray-200, var(--gray-200)));
    box-sizing: border-box;
    height: 3rem;
    -ms-overflow-style: none;
  }

  .close-action-container {
    position: absolute;
    right: 0;
    padding: 0.5rem 0.75rem;
  }

  button {
    align-items: center;
    padding: 0.75rem 1.5rem;
    color: var(--magic-wallet-login-modal-white, var(--onboard-white, var(--white)));
    border-radius: 1.5rem;
    font-family: var(
      --magic-wallet-login-modal-font-family-normal,
      var(--font-family-normal)
    );
    font-style: normal;
    font-weight: bold;
    font-size: var(--magic-wallet-login-modal-font-size-5, var(--onboard-font-size-5, var(--font-size-5)));
    line-height: var(--magic-wallet-login-modal-font-line-height-1, var(--onboard-line-height-1, var(--line-height-1)));
    border: none;
  }

  .login-btn:disabled {
    background-color: var(--magic-wallet-login-modal-primary-300, var(--onboard-primary-300, var(--primary-300)));
    cursor: default;
  }

  .login-btn {
    background-color: var(--magic-wallet-login-modal-primary-500, var(--onboard-primary-500, var(--primary-500)));
    cursor: pointer;
    display: inline-flex;
    justify-content: space-around;
    width: 6rem;
  }

  .close {
    cursor: pointer;
  }

  .form-element {
    margin: 1rem 0;
  }

  .container {
    font-family: var(
      --magic-wallet-login-modal-font-family-normal,
      var(--font-family-normal)
    );
    color: var(--magic-wallet-login-modal-black, var(--onboard-black, var(--black)));
    top: 0;
    right: 0;
    z-index: var(--magic-login-modal-z-index, var(--login-modal-z-index));
    position: absolute;
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
    background: var(--magic-wallet-login-modal-white, var(--onboard-white, var(--white)));
    box-shadow: var(--magic-wallet-login-modal-shadow-1, var(--onboard-shadow-1, var(--shadow-1)));
    border-radius: 1.5rem;
    text-align: center;
    background-color: var(--magic-wallet-login-modal-white, var(--onboard-white, var(--white)));
    color: var(--magic-wallet-login-modal-black, var(--onboard-black, var(--black)));
  }

  .login-modal-position {
    position: absolute;
    top: var(--magic-wallet-login-modal-top, var(--login-modal-top));
    bottom: var(--magic-wallet-login-modal-bottom, var(--login-modal-bottom));
    left: var(--magic-wallet-login-modal-left, var(--login-modal-left));
    right: var(--magic-wallet-login-modal-right, var(--login-modal-right));
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
    margin: var(--magic-wallet-login-modal-margin-5, var(--onboard-margin-5, var(--margin-5)));
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .error-msg {
    color: var(--magic-wallet-login-modal-danger-500, var(--onboard-danger-500, var(--danger-500)));
    font-family: var(--magic-wallet-login-modal-font-family-light, var(--onboard-font-family-light, var(--font-family-light)));
  }
</style>

<div class="container">
  <div class="login-modal login-modal-position" transition:fade>
    <div class="close-action-container close" on:click={dismiss}>
      <CloseButton />
    </div>
    <h2>{walletName} Login</h2>
    <section class="modal-controls">
      <input
        type="text"
        class="login-credentials form-element"
        placeholder="Email address"
        bind:value={credentials}
        on:input={() => setErrorInEmail()}
        on:keydown={submitOnEnter}
      />
      {#if errorInEmail}
        <span class="error-msg">Please enter a valid email address</span>
      {/if}

      <button
        class="login-btn form-element"
        id="connect-accounts"
        disabled={!credentials}
        on:click={() => login()}
      >
        {#if loading}
          <Spinner size="1.5rem"/>
        {:else}
          Login
        {/if}
      </button>
    </section>
    <div class="branding">{@html brandingHTMLString}</div>
  </div>
</div>
